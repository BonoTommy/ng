import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IProduit } from '../../iproduit';
import { ApibieroService } from 'src/app/serv/apibiero.service';
import { ActivatedRoute } from '@angular/router';
import { AuthServService } from 'src/app/serv/auth-serv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogueSupprimerBiereComponent } from '../liste/components/dialogue-supprimer-biere/dialogue-supprimer-biere.component';

@Component({
  selector: 'app-biere',
  templateUrl: './biere.component.html',
  styleUrls: ['./biere.component.scss']
})
export class BiereComponent implements OnInit {
  biere: IProduit;
  formModification: FormGroup;
  boutonAction = 'Ajouter';
  situationAjouter = false;
  situationModifier = false;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authServ: AuthServService, private apibiero: ApibieroService, private snackbar: MatSnackBar, private router:Router, private dialog: MatDialog) {}

  
  ngOnInit():void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.apibiero.getBiere(id).subscribe((response) => {
        this.situationAjouter = false;
        this.situationModifier = true;
        this.boutonAction = 'Modifier';
        this.biere = response.data;
        this.authServ.setTitre(`Modification de la bière: ${this.biere.nom}`);
        this.formModification.patchValue({
          nom: this.biere.nom,
          brasserie: this.biere.brasserie,
          description: this.biere.description,
          image: this.biere.image
        })
        this.formModification.setValue(this.biere);
      })
    } else {
      this.situationModifier = false;
      this.situationAjouter = true;
      this.authServ.setTitre(`Ajouter une bière`);
    }
    
    this.formModification = this.fb.group({
      nom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      brasserie: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      image: ['', Validators.minLength(2)]
    })
  }

  onSubmit() {
    if(this.formModification.valid) {
      const biere: IProduit = {
        id_biere: this.biere?.id_biere,
        nom: this.formModification.value.nom,
        brasserie: this.formModification.value.brasserie,
        description: this.formModification.value.description,
        image: this.formModification.value.image
      }
      if(this.situationAjouter) {
        this.apibiero.ajouterBiere(biere).subscribe((data) => {
          this.snackbar.open(`Vous avez bien ajouté la bière ${biere.nom}`, 'Ok', { duration: 5000 })
          this.router.navigateByUrl(`/bieres`);
          this.formModification.reset();
        })
      } else {
        this.apibiero.modifierBiere(biere).subscribe((data)=> {
          this.snackbar.open(`Vous avez bien modifié la bière ${biere.nom}`, 'Ok', { duration:5000})
          this.router.navigateByUrl(`/bieres`);
          this.formModification.reset();
        })
      }
      
    }
  }

  onAnnuler() {
    this.router.navigateByUrl(`/bieres`);
    this.formModification.reset();
  }

  onSupprimer() {
    const dialogRef = this.dialog.open(DialogueSupprimerBiereComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = Number(idParam);
        this.apibiero.supprimerBiere(id).subscribe((response) => {
          this.router.navigateByUrl(`/bieres`);
          this.snackbar.open('La bière a été supprimée', 'Ok', {
            duration: 5000
          });
        });
      }
    })
  }
}
