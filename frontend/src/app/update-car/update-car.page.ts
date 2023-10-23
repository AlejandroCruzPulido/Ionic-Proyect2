import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.page.html',
  styleUrls: ['./update-car.page.scss'],
})
export class UpdateCarPage implements OnInit {
  carId: number;
  carData: any;
  carForm: FormGroup;
  capturedPhoto: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarService,
    private photoService: PhotoService, 
    private router: Router
  ) {
    this.carForm = this.formBuilder.group({
      marca: [null, Validators.required],
      modelo: [null, Validators.required],
      precio: [null],
      descripcion: [null],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
      this.getCarData();
    });
  }

  getCarData() {
    this.carService.getCarById(this.carId).subscribe((car: any) => {
      this.carData = car;
      this.carForm.patchValue({
        marca: car.marca,
        modelo: car.modelo,
        precio: car.precio,
        descripcion: car.descripcion,
      });

      if (car.filename) {
        this.capturedPhoto = `http://localhost:8080/images/${car.filename}`;
      }
    });
  }

  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  updateCar() {
    if (this.carData) {
      const updatedCarData = this.carForm.value;
      updatedCarData.id = this.carId;

      this.carService.updateCar(updatedCarData, this.capturedPhoto).subscribe(
        (car: any) => {
          console.log('Coche actualizado exitosamente', car);

          if (car.filename) {
            this.capturedPhoto = `http://localhost:8080/images/${car.filename}`;
          }

          this.router.navigate(['/list-car']);
        },
        (error) => {
          console.error('Error al actualizar el coche', error);
        }
      );
    }
  }
}
