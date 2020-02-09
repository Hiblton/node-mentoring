import uuidv4 from 'uuid/v4';

import { Group } from '../models/group';

export class GroupsService {
    public static async getAllGroups(): Promise<Group[]> {
        return await Group.findAll();
    }

    public static async getGroupById(id: string): Promise<Group> {
        if (!id) {
            return null;
        }

        return await Group.findOne({
            where: { id },
        });
    }

    public static async createGroup(group: Group): Promise<Group> {
        if (!group) {
            return null;
        }

        const createdGroup = {
            ...group,
            id: uuidv4(),
        };

        return Group.create(createdGroup);
    }

    public static async updateGroup(group: Group): Promise<Group> {
        if (!group) {
            return null;
        }

        return await Group.findOne({
            where: { id: group.id },
        }).then(record => record && record.update(group));
    }

    public static async deleteGroup(id: string): Promise<number> {
        if (!id) {
            return null;
        }

        return await Group.destroy({
            where: { id },
        });
    }
}
