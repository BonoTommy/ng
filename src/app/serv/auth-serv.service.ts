import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServService {
  private estConnecte:boolean = true;

  etatConnection:BehaviorSubject<boolean>;
  etatConnection$:Observable<boolean>;

  sTitrePage:BehaviorSubject<string>;
  sTitrePage$:Observable<string>;

  constructor() { 
    this.etatConnection= new BehaviorSubject<boolean>(this.estConnecte);
    this.etatConnection$ = this.etatConnection.asObservable();

    this.sTitrePage= new BehaviorSubject<string>("");
    this.sTitrePage$ = this.sTitrePage.asObservable();

   }

  verifConnection():boolean {
    return this.estConnecte
  }
  
  changeConnection(statut:boolean):void{
    this.estConnecte = statut;
    this.etatConnection.next(statut);

    console.log(this.estConnecte);
  }

  statut():Observable<boolean>{
    return this.etatConnection;
  }

  setTitre(sTitre:string):void{
    this.sTitrePage.next(sTitre);
  }
  getTitre():Observable<string>{
    return this.sTitrePage;
  }

}
