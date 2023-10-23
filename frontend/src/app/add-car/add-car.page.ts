import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  carForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private carService: CarService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.carForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      precio: [''],
      descripcion: ['']
    })
  }

  get errorControl() {
    return this.carForm.controls;
  }

  takePhoto() {
     this.photoService.takePhoto().then(data => {
       this.capturedPhoto = data.webPath;
     });
  }

  pickImage() {
     this.photoService.pickImage().then(data => {
       this.capturedPhoto = data.webPath;
     });
  }

  discardImage() {
     this.capturedPhoto = null;
  }

  async submitForm() {
     this.isSubmitted = true;
     if (!this.carForm.valid) {
       console.log('Please provide all the required values!')
       return false;
     } else {
       let blob = null;
       if (this.capturedPhoto != "") {
         const response = await fetch(this.capturedPhoto);
         blob = await response.blob();
       }

       this.carService.createCar(this.carForm.value, blob).subscribe(data => {
         console.log("Photo sent!");
         this.router.navigateByUrl("/list-car");
       })
     }
  }
}
