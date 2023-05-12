import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServService } from 'src/app/serv/auth-serv.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  estConnecte:boolean;


  constructor(private router: Router, private authServ:AuthServService) {
    this.estConnecte = this.authServ.verifConnection();
    authServ.setTitre('Connexion');
  }

  // onConnexion():void {
  //   this.router.navigateByUrl('/bieres');
  // }

  seConnecter() {
    this.estConnecte = true;
    this.authServ.changeConnection(true);
    console.log(this.estConnecte);
    this.router.navigateByUrl('/bieres');
  }


}
