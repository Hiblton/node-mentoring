import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/module3', {
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

export class User extends Model {
    public id: string;
    public login: string;
    public password: string;
    public age: number;
    public isDeleted: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        login: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'is_deleted',
        },
    },
    {
        sequelize: sequelize,
        tableName: 'users',
        timestamps: false,
    },
);
