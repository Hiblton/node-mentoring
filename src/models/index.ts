import { Sequelize } from 'sequelize';
import { config } from './../config';

const dialectDb = 'postgres';
const databaseURI = `${dialectDb}://${config.db.secretLogin}:${config.db.secretPassword}@${config.db.host}:${config.db.port}/${config.db.name}`;

console.log(databaseURI);
export const sequelize = new Sequelize(databaseURI, {
    dialect: dialectDb,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully!');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });
