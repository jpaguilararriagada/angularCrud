import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {


  heroes: any[] = [];
  loading: boolean = true;
  constructor(private _heroesSerive: HeroesService) {

    this.obtenerHeroes();

  }

  ngOnInit() {
  }

  borrarHeroe($key: string) {
    this._heroesSerive.borrarHeroe($key)
                      .subscribe( data => {
                        if (data == null) {
                          delete this.heroes[$key];
                        }
                      } );
  }

  obtenerHeroes() {
    this._heroesSerive .obtenerHeroes()
                        .subscribe( data => {
                          console.log(data);
                          this.heroes = data;
                          this.loading = false;
                        } )
  }

}
