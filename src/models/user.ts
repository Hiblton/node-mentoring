import { Model, DataTypes } from 'sequelize';
import { sequelize } from './';

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
