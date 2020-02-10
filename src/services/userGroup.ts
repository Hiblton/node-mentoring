import { Transaction } from 'sequelize/types';
import { sequelize } from './../models';
import { UserGroup } from '../models/userGroup';

export class UserGroupService {
    public static async addUsersToGroup(groupId: string, usersId: string[]): Promise<UserGroup[]> {
        if (!groupId || !usersId) {
            return null;
        }

        return sequelize.transaction((t: Transaction) => {
            const promises = [];
            usersId.forEach((userId: string) => {
                promises.push(UserGroup.create({ userId, groupId }, { transaction: t }));
            });

            return Promise.all(promises);
        });
    }
}
