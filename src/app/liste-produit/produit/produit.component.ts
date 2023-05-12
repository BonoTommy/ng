import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduit } from 'src/app/iproduit';
import { ApibieroService } from 'src/app/serv/apibiero.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {
  @Input() peutEditer:boolean;
  @Input() unProduit:IProduit;
  @Input() prixMax:number;
  @Output() peutEditerChange:EventEmitter<boolean> = new EventEmitter();
  @Output() eventAjout:EventEmitter<IProduit> = new EventEmitter();

  formModif:FormGroup;

  constructor(private apibiero:ApibieroService){}

  ngOnInit(){
    this.formModif = new FormGroup({
      id_biere: new FormControl(""),
      nom: new FormControl("toto", [Validators.required, Validators.minLength(3)]),
      brasserie: new FormControl("",[Validators.required, Validators.minLength(3)]),
      //prix: new FormControl("",[Validators.required, Validators.min(0)]),
      description: new FormControl("", [Validators.required]),
      image: new FormControl(""),
      date_ajout: new FormControl(""),
      date_modif: new FormControl(""),
      note_moyenne: new FormControl(""),
      note_nombre: new FormControl(""),
    })
    //this.unProduit.description = this.unProduit.description || "";
    this.formModif.setValue(this.unProduit);
  }

  verifPasCher(prix:number):boolean{
    return (prix < this.prixMax );
  }
  changeEditable(evt:Event){
    this.peutEditerChange.emit(this.peutEditer);
    //console.log(evt?.target.value)
  }
  // ajouterProduit(){
  //   this.eventAjout.emit({nom: "toto", brasserie : "Le magicien", description : "Description"});
  // }

  soumettre(){
    //this.formModif.controls['nom'].setValue("Allo le monde");
    //this.formModif.value.nom = "test";
    console.log(this.formModif.value)
    this.unProduit = this.formModif.value;
    this.apibiero.modifierBiere(this.unProduit).subscribe((data)=>{
      console.log(data);
    });
  }

  annuler(){
    this.formModif.setValue(this.unProduit);
  }
}
