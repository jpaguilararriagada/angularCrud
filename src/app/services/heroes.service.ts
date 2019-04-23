import { Injectable } from '@angular/core';
import { HttpClient , HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
// tslint:disable-next-line:import-blacklist
import { map } from 'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


    heroesURL: string = 'https://heroesapp-60939.firebaseio.com/heroes.json';
    heroeURL: string = 'https://heroesapp-60939.firebaseio.com/heroes/';
  constructor( private http: HttpClient) { }

nuevoHeroe( heroe:Heroe) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  // https://angular.io/guide/http#making-a-post-request
  return this.http.post<Heroe>( this.heroesURL, heroe , httpOptions )
        .pipe(
        map( res => {
        
          return res;
        }));
  }


  actualizarHeroe( heroe:Heroe, key$: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let url = ` ${ this.heroeURL }/${ key$}.json`;
    return this.http.put<Heroe>( url, heroe , httpOptions )
          .pipe(
          map( res => {
            
            return res;
          }));
    }

    obtenerHeroe(  key$: string) {

      console.log(`${ this.heroeURL }${ key$ }.json`);
      return this.http.get<Heroe>( `${ this.heroeURL }${ key$ }.json` );

      }

    obtenerHeroes() {
      return this.http.get( `${ this.heroesURL }`);

    }

    borrarHeroe($key: string){
      return this.http.delete<Heroe>( `${ this.heroeURL }${ $key }.json` );
    }


}
