import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import swal from 'sweetalert2';
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
    swal.fire({  title: "Estas seguro que deseas eliminar el registro?",
    text: "No se va a poder recuperar el registro.",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Si, elimina el registro !",
    
    cancelButtonText: "No, cancelalo !",
    showLoaderOnConfirm: true 
       }).then(  data => {
        if (data.value) {
          this._heroesSerive.borrarHeroe($key)
          .subscribe( data => {
            if (data == null) {
              delete this.heroes[$key];
              swal.fire("Eliminado!", "El registro ha sido eliminado con éxito.", "success");
            }
          } );
         
        }
        // else if (data.dismiss) {
        //   swal.fire("Cancelado!", "La operacion ha sido cancelada", "warning");
        // }
    } )

   
  }

  obtenerHeroes() {
    this._heroesSerive .obtenerHeroes()
                        .subscribe( (data : any) => {
                        
                          this.heroes = data;
                          this.loading = false;
                        } )
  }

}
