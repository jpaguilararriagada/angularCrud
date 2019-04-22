import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})


export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  mensaje: string = '';
key$: string = '';
  nuevo: boolean = false;
  id: string;
  constructor( private _heroesService: HeroesService,
                private router: Router,
                private activatedRouter: ActivatedRoute) {
                  this.activatedRouter.params.subscribe(
                    parametros => {

                      this.id = parametros['id'];
                      if (this.id !== 'nuevo') {
                        console.log('entro al nuevo');
                        this._heroesService.obtenerHeroe(this.id)
                                            .subscribe( data => {
                                            console.log(data);
                                            this.heroe = data;
                                            console.log(this.id);
                                            } )
                      }
                    }
                  )
                }

  ngOnInit() {
  }

  guardar() {

    if (this.id == 'nuevo') {
      this._heroesService.nuevoHeroe(this.heroe)
      .subscribe( (data: any) => {
        swal.fire('Operación realizada con éxito',`El heroe <strong>${this.heroe.nombre}</strong> ha sido agregado con éxito. `,'success');
          this.router.navigate(['/heroe', data.name]);
      } ,
      error => console.log(error));
    } else {
      this._heroesService.actualizarHeroe(this.heroe, this.id)
      .subscribe( (data: any) => {
        swal.fire('Operación realizada con éxito',`El heroe <strong>${this.heroe.nombre}</strong> ha sido modificado con éxito. `,'info');
      } ,
      error => console.log(error));
    }

  }

  agregarNuevo(forma: NgForm) {
      this.router.navigate(['/heroe','nuevo']);
      forma.reset({
        casa: 'Marvel'
      });
  }

}
