import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GardienRouteGuard } from './gardien-route.guard';
import { ListeProduitComponent } from './liste-produit/liste-produit/liste-produit.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { AuthServService } from './serv/auth-serv.service';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ListeComponent } from './pages/liste/liste.component';
import { BiereComponent } from './pages/biere/biere.component';

const routes: Routes = [
  { path:"", component:ConnexionComponent},
  { path: "bieres", component: ListeComponent, canActivate: [() => inject(AuthServService).statut()] },
  { path: "modification-biere/:id", component: BiereComponent, canActivate: [() => inject(AuthServService).statut()] },
  { path: "ajouter-biere", component: BiereComponent, canActivate: [() => inject(AuthServService).statut()] },
  { path:"**", component:NonTrouveComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
