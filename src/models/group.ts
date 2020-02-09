import { Model, DataTypes } from 'sequelize';
import { sequelize } from './';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export class Group extends Model {
    public id: string;
    public name: string;
    public permissions: Array<Permission>;
}

Group.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        permissions: {
            type: new DataTypes.ARRAY(DataTypes.STRING(32)),
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: 'groups',
        timestamps: false,
    },
);
