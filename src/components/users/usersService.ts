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

    public static createUser(user: User): boolean {
        if (!user) {
            return false;
        }

        users.push({
            ...user,
            id: uuidv4(),
        });

        return true;
    }

    public static updateUser(id: string, updatedUser: User): boolean {
        if (!id || !updatedUser) {
            return false;
        }

        users.map(user => {
            if (user.id === id) {
                return updatedUser;
            }
        });

        return true;
    }

    public static deleteUser(id: string): boolean {
        if (!id) {
            return false;
        }

        users.map(user => {
            if (user.id === id) {
                user.isDeleted = true;
            }
        });

        return true;
    }
}
