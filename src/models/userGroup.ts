import { Model, DataTypes } from 'sequelize';
import { sequelize } from './';
import { User } from './user';
import { Group } from './group';

export class UserGroup extends Model {
    public userId: string;
    public groupId: string;
}

UserGroup.init(
    {
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            field: 'user_id',
        },
        groupId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            field: 'group_id',
        },
    },
    {
        sequelize: sequelize,
        tableName: 'user_group',
        timestamps: false,
    },
);

User.belongsToMany(Group, {
    through: 'UserGroup',
    as: 'users',
    foreignKey: 'groupId',
    onDelete: 'cascade',
    hooks: true,
});

Group.belongsToMany(User, {
    through: 'UserGroup',
    as: 'groups',
    foreignKey: 'userId',
    onDelete: 'cascade',
    hooks: true,
});
