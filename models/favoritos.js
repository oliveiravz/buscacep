'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favoritos.init({
    cep: DataTypes.STRING,
    localidade: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favoritos',
  });
  return favoritos;
};