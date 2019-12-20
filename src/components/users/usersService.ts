import uuidv4 from 'uuid/v4';

import { users, User } from './';

export class UsersService {
    public static getAutoSuggestUsers(login: string, limit: string): User[] {
        if (!login || !limit) {
            return [];
        }

        return users.filter(user => user.login.includes(login) && !user.isDeleted).slice(0, +limit);
    }

    public static getUserById(id: string): User {
        if (!id) {
            return null;
        }

        return users.find(user => user.id === id && !user.isDeleted);
    }

    public static createUser(user: User): User {
        if (!user) {
            return null;
        }

        const createdUser = {
            ...user,
            id: uuidv4(),
        };

        users.push(createdUser);

        return createdUser;
    }

    public static updateUser(user: User): User {
        if (!user) {
            return null;
        }

        let updatedUser: User;

        for (const index in users) {
            if (users[index].id === user.id) {
                updatedUser = users[index] = {
                    ...users[index],
                    ...user,
                };
                break;
            }
        }

        return updatedUser;
    }

    public static deleteUser(id: string): User {
        if (!id) {
            return null;
        }

        let deletedUser: User;

        for (const index in users) {
            if (users[index].id === id) {
                users[index].isDeleted = true;
                deletedUser = users[index];
                break;
            }
        }

        return deletedUser;
    }
}
