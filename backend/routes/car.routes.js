module.exports = app => {
    const cars = require("../controllers/car.controller.js");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new Car
    router.post("/", upload.single('file'), cars.create);
    //router.post("/", cars.create);
  
    // Retrieve all Cars
    router.get("/", cars.findAll);
  
    // Retrieve a single Car with id
    router.get("/:id", cars.findOne);
  
    // Update a Car with id
    router.put("/:id", upload.single('file'), cars.update);
  
    // Delete a Car with id
    router.delete("/:id", cars.delete);
  
    app.use('/api/cars', router);
  };