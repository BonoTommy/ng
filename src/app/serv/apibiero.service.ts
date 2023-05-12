import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable, pluck } from 'rxjs';
import { IListeProduit } from '../iliste-produit';

@Injectable({
  providedIn: 'root'
})
export class ApibieroService {
  private url :string = "http://127.0.0.1:8000/webservice/php/biere/";
  constructor(private http:HttpClient) { }

  getBieres():Observable<IListeProduit>{
    console.log("ici");
    return this.http.get<IListeProduit>(this.url);
  }

  getBiere(id:number):Observable<{data:IProduit}>{
    return this.http.get<{data:IProduit}>(`${this.url}${id}`);
  }

  ajouterBiere(biere: IProduit): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Basic ' + btoa('biero:biero')
      })
    };
    return this.http.put<any>(this.url+biere.id_biere, biere, httpOption);
   }

  modifierBiere(biere:IProduit):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'Basic ' +btoa('biero:biero')
      })
    };
    
    //delete biere.date_ajout; // Pour retirer des propriétés

    return this.http.post<any>(this.url+biere.id_biere, biere, httpOption);

  }

  supprimerBiere(id_biere:number): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Basic ' + btoa('biero:biero')
      })
    };

    //delete biere.date_ajout; // Pour retirer des propriétés

    return this.http.delete<any>(this.url + id_biere, httpOption);

  }
  
  //effacerBiere(id:number):Observable<any>{}
}
