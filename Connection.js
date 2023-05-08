import { Sequelize } from 'sequelize';
import { development } from '../buscacep/config/config.json';

const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso!');
  })
  .catch((error) => {
    console.log('Erro ao estabelecer conexão:', error);
  });

export default sequelize;