import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.page.html',
  styleUrls: ['./list-car.page.scss'],
})
export class ListCarPage implements OnInit {

  cars: any = [];
  searchParams: any = {};
  filteredCars: any = [];
  showAllButtonVisible: boolean = false; // Variable para controlar la visibilidad del botón "Ver todas las ofertas"


  constructor(private carService: CarService, private router: Router) { }

  ngOnInit() {
   }

  ionViewDidEnter() {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getCars().subscribe(coach => {
      console.log(coach);
      this.cars = coach;
    });
  }

  addCar() {
    this.router.navigateByUrl("/add-car");
  }

  goToUpdatePage(carId: number) {
    this.router.navigateByUrl(`/update-car/${carId}`);
  }

  eliminarCoche(id: number) {
    this.carService.eliminarCoche(id).subscribe(
      (response) => {
        console.log('Coche eliminado exitosamente', response);
        this.loadCars();  
        this.carService.eliminarImagen(id).subscribe(
          (imageResponse) => {
            console.log('Imagen eliminada exitosamente', imageResponse);
          },
          (error) => {
            console.error('Error al eliminar la imagen', error);
          }
        );
      },
      (error) => {
        console.error('Error al eliminar el coche', error);
      }
    );
  }

  loadCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
      this.filteredCars = data;
      this.router.navigate(['/list-car']); 
    });
  }

  searchCarsByMarca() {
    if (this.searchParams.marca) {
      console.log(this.searchParams.marca);
      this.cars = this.cars.filter(
        (car: any) => car.marca.toLowerCase() === this.searchParams.marca.toLowerCase()
      );
    } else {
      this.loadCars();
    }
    this.showAllButtonVisible = true;
  }
  showAllCars() {
    this.searchParams.marca = ''; 
    this.showAllButtonVisible = false;
    this.loadCars();
  }
}
