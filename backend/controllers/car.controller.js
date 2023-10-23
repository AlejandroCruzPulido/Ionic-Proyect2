const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

// Importa las bibliotecas necesarias
const fs = require('fs');
const path = require('path');

// Función para eliminar una imagen desde la carpeta de almacenamiento
const eliminarImagenDesdeCarpeta = (imageName) => {
  // Define la ruta completa del archivo de imagen
  const imagePath = path.join(__dirname, '..', 'public', 'images', imageName);
  console.log('Ruta de la imagen:', imagePath);

  // Verifica si el archivo existe antes de intentar eliminarlo
  if (fs.existsSync(imagePath)) {
    // Elimina el archivo de la carpeta de almacenamiento
    fs.unlinkSync(imagePath);
    console.log(`Imagen ${imageName} eliminada con éxito.`);
  } else {
    console.log(`La imagen ${imageName} no existe en la carpeta de almacenamiento.`);
  }
};

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.marca || !req.body.modelo) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Car
  const car = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    filename: req.file ? req.file.filename : ""
  }

  // Save Car in the database
  Car.create(car).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Car"
    })
  });
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  Car.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Cars"
    })
  })
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Car.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  // Obtén el registro existente por ID
  Car.findByPk(id)
    .then(car => {
      if (!car) {
        return res.status(404).send({
          message: `Car with id=${id} not found.`
        });
      }

      // Verificar si se envía una nueva imagen
      if (req.file) {
        // Eliminar la imagen anterior, si existe
        if (car.filename) {
          eliminarImagenDesdeCarpeta(car.filename);
        }
        
        // Guardar la nueva imagen en la base de datos
        car.filename = req.file.filename;
      }

      // Actualizar otros campos del automóvil
      car.marca = req.body.marca;
      car.modelo = req.body.modelo;
      car.precio = req.body.precio;
      car.descripcion = req.body.descripcion;

      // Guardar el registro actualizado
      car.save()
        .then(() => {
          res.send({
            message: "Car was updated successfully."
          });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Car with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id
      });
    });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Car.findByPk(id)
    .then(car => {
      if (!car) {
        return res.status(404).send({
          message: `Car with id=${id} not found.`
        });
      }

      // Obtén el nombre de archivo de la imagen asociada a esta fila
      const imageName = car.filename;

      // Define la ruta de la imagen
      const imagePath = path.resolve(__dirname, '..', 'public', 'images', imageName);
      console.log('Ruta de la imagen:', imagePath);
      
      // Elimina la fila de la base de datos
      Car.destroy({
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          // Si se eliminó la fila, elimina la imagen en la carpeta de almacenamiento
          if (imagePath) {
            eliminarImagenDesdeCarpeta(imageName); // Utiliza la variable imagePath
          }

          res.send({
            message: "Car and associated image were deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Car with id=${id}.`
          });
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id
      });
    });
};
