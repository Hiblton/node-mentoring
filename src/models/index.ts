import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully!');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });
