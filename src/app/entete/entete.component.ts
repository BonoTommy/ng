import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServService } from '../serv/auth-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent {
  estConnecte:boolean;
  titre:string = "";
  
  constructor(private authServ:AuthServService, private route:ActivatedRoute, private router:Router){
    this.estConnecte = this.authServ.verifConnection();
    this.authServ.getTitre().subscribe((titre)=>{
      this.titre = titre;
    })
    
  }

  ngOnInit() {
    console.log(this.route)
    
  }

  seDeconnecter():void {
    this.estConnecte = false;
    this.authServ.changeConnection(false);
    console.log(this.estConnecte);
    this.router.navigateByUrl('');
    console.log(this.authServ.verifConnection())
  }

}
