import uuidv4 from 'uuid/v4';

import { users, User } from './';

export class UsersService {
    public static getAutoSuggestUsers(login: string, limit: string): User[] {
        if (!login || !limit) {
            return [];
        }

        return users.filter(user => user.login.includes(login)).slice(0, +limit);
    }

    public static getUserById(id: string): User {
        if (!id) {
            return null;
        }

        return users.find(user => user.id === id);
    }

    public static createUser(newUser: User): boolean {
        if (!newUser) {
            return false;
        }

        users.push({
            ...newUser,
            id: uuidv4(),
        });

        return true;
    }

    public static updateUser(id: string, updatedProps: User): boolean {
        if (!id || !updatedProps) {
            return false;
        }

        for (const index in users) {
            if (users[index].id === id) {
                users[index] = {
                    ...users[index],
                    ...updatedProps,
                };
                break;
            }
        }

        return true;
    }

    public static deleteUser(id: string): boolean {
        if (!id) {
            return false;
        }

        for (const index in users) {
            if (users[index].id === id) {
                users[index].isDeleted = true;
                break;
            }
        }

        return true;
    }
}
