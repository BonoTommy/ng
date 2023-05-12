import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { EnteteComponent } from './entete/entete.component';
import { ListeProduitComponent } from './liste-produit/liste-produit/liste-produit.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitComponent } from './liste-produit/produit/produit.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ListeComponent } from './pages/liste/liste.component';
import { MatSortModule } from '@angular/material/sort';
import { DialogueSupprimerBiereComponent } from './pages/liste/components/dialogue-supprimer-biere/dialogue-supprimer-biere.component';
import { BiereComponent } from './pages/biere/biere.component';
import { DialogDetailComponent } from './pages/liste/components/dialog-detail/dialog-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    ListeProduitComponent,
    NonTrouveComponent,
    ProduitComponent,
    ConnexionComponent,
    ListeComponent,
    DialogueSupprimerBiereComponent,
    BiereComponent,
    DialogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
