import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  endPoint = "http://localhost:8080/api/cars";

  constructor(private httpClient: HttpClient, private http: HttpClient) { }

  getCars(){
    return this.httpClient.get(this.endPoint);
  }

   createCar(car, blob){
     let formData = new FormData();
     formData.append("marca", car.marca);
     formData.append("modelo", car.modelo);
     formData.append("precio", car.precio);
     formData.append("descripcion", car.descripcion);
     formData.append("file", blob);

     return this.httpClient.post(this.endPoint, formData);
   }

   getCarById(id: number) {
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  updateCar(carDataToUpdate: any, newImage: string) {
    if (newImage) {
      carDataToUpdate.file = newImage;
    }

    return this.httpClient.put(`${this.endPoint}/${carDataToUpdate.id}`, carDataToUpdate).pipe(
      tap(() => {
        this.actualizarImagen(carDataToUpdate.id, carDataToUpdate.filename);
      })
    );
  }

  actualizarImagen(id: number, filename: string) {
    console.log(`Actualización de imagen para el coche con ID ${id} y nombre de archivo ${filename}`);
  }
  
  eliminarCoche(id: number) {
    return this.http.delete(`http://localhost:8080/api/cars/${id}`);
  }

  eliminarImagen(id: number) {
    return this.http.delete(`http://localhost:8080/api/images/${id}`);
  }
}

