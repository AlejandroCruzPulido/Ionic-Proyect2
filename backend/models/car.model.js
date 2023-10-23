module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
      marca: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
       }
    });
  
    return Car;
  }