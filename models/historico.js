'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Historico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Historico.init({
    cep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'historico',
  });
  return Historico;
};