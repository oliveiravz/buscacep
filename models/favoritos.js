'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Favoritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favoritos.init({
    cep: DataTypes.STRING,
    localidade: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favoritos',
  });
  return Favoritos;
};