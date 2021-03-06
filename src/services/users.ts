import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
import { User } from '../models/user';
import { UserGroup } from '../models/userGroup';

export class UsersService {
    public static async getAutoSuggestUsers(loginSubstring: string, limit: string): Promise<User[]> {
        if (!loginSubstring || !limit) {
            return [];
        }

        return User.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
                isDeleted: false,
            },
            limit: +limit,
        });
    }

    public static async getUserById(id: string): Promise<User> {
        if (!id) {
            return null;
        }

        return User.findOne({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    public static async getUserByLoginAndPassword(login: string, password: string): Promise<User> {
        if (!login || !password) {
            return null;
        }

        return User.findOne({
            where: {
                login,
                password,
                isDeleted: false,
            },
        });
    }

    public static async createUser(user: User): Promise<User> {
        if (!user) {
            return null;
        }

        const createdUser = {
            ...user,
            id: uuidv4(),
        };

        return User.create(createdUser);
    }

    public static async updateUser(user: User): Promise<User> {
        if (!user) {
            return null;
        }

        return User.findOne({
            where: {
                id: user.id,
                isDeleted: false,
            },
        }).then(record => record && record.update(user));
    }

    public static async deleteUser(id: string): Promise<User> {
        if (!id) {
            return null;
        }

        return User.findOne({
            where: {
                id,
                isDeleted: false,
            },
        })
            .then(record => record && record.update({ isDeleted: true }))
            .then(record => {
                UserGroup.destroy({ where: { userId: id } });
                return record;
            });
    }
}
