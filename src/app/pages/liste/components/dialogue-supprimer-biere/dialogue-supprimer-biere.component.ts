import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-supprimer-biere',
  template: `
    <h1 mat-dialog-title>Boite de confirmation</h1>
    <div mat-dialog-content>
      <p>Êtes-vous certain de vouloir supprimer la bière: {{ data.biere_nom }}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="annuler()">Annuler</button>
      <button mat-button color="warn" (click)="confirmer()">Supprimer</button>
    </div>
    `
})
export class DialogueSupprimerBiereComponent {
  
  constructor(
    private dialogRef: MatDialogRef<DialogueSupprimerBiereComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  annuler():void {
    this.dialogRef.close(false);
  }

  confirmer():void {
    this.dialogRef.close(true);
  }

}
