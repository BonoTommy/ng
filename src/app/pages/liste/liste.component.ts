import { Component, ViewChild, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IListeProduit } from 'src/app/iliste-produit';
import { ApibieroService } from 'src/app/serv/apibiero.service';
import { AuthServService } from 'src/app/serv/auth-serv.service';
import { IProduit } from '../../iproduit';
import { MatDialog } from '@angular/material/dialog';
import { DialogueSupprimerBiereComponent } from './components/dialogue-supprimer-biere/dialogue-supprimer-biere.component';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit, AfterViewInit {
  message: string;
  uneRecherche: string = '';
  bieres: MatTableDataSource<IProduit>;
  displayedColumns: Array<string> = [
    'image',
    'nom',
    'brasserie',
    'date_ajout',
    'date_modif',
    'action'
  ];

  @ViewChild(MatSort) sort:MatSort;

  constructor(private authServ: AuthServService, private apibiero: ApibieroService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router){

    authServ.setTitre("Liste des bières")
  }

  ngOnInit() {
    this.apibiero.getBieres().subscribe((biere: IListeProduit) => {
      this.bieres = new MatTableDataSource(biere.data);
    });
  }

  ngAfterViewInit(): void {
        this.bieres.sort = this.sort;
    }

  nouveauProduit(biere: IProduit) {
    console.log(biere);
    this.bieres.data.push(biere)
  }

  onDelete(id:number) {
    const biere_details = this.bieres.data.filter((biere) => biere.id_biere == id);
    const dialogRef = this.dialog.open(DialogueSupprimerBiereComponent, {data: {
      biere_nom: biere_details[0].nom
    }});

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.apibiero.supprimerBiere(id).subscribe(() => {
          this.bieres.data = this.bieres.data.filter((biere) => biere.id_biere !== id);
          this.snackbar.open('La bière a été supprimée', 'Ok', {
            duration: 5000
          });
        });
      }
    })
  }

  onDetail(id:number) {
    const biere_details = this.bieres.data.filter((biere) => biere.id_biere == id);
    const details = biere_details[0];
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      data: {
        biere_nom: details.nom,
        biere_brasserie: details.brasserie,
        biere_description: details.description,
        biere_image: details.image,
        biere_moyenne: details.note_moyenne,
        biere_nombre: details.note_nombre,
        biere_ajout: details.date_ajout,
        biere_modif: details.date_modif
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boite de dialogue Détails est fermée.', result);
    })
  }

  onEdit(id:number) {
    this.router.navigateByUrl(`/modification-biere/${id}`);
  }

  onAjouter() {
    this.router.navigateByUrl('/ajouter-biere')
  }
  
  recherche(event:Event) {
    const target = event.target as HTMLInputElement;
    this.uneRecherche = target.value.toLowerCase();
    this.bieres.filterPredicate = (data: IProduit, filter: string) => {
      const nom = data.nom.toLowerCase().includes(filter);
      const brasserie = data.brasserie.toLowerCase().includes(filter);
      return nom || brasserie;
    }
    this.bieres.filter = this.uneRecherche.trim();
  }
  
}
