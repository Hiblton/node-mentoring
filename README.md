# nodejs-module-4

## PREREQUISITES:

The task is a continuation of Homework3 and should be done in the same repo.

## TASK 4.1

Add Group entity to already existing RESTservice with CRUDoperations.

-   The Group entity should have the following properties(you can use UUIDas Group id).
-   The service should provide the following CRUD operations for Group:
    -   get group by id;
    -   get all groups;
    -   create and update a group;
    -   remove group (hard delete–group data is fully removed from the DB).
-   Storing of groups data should be done in PostgreSQL in Groups table.
-   The service should follow the principles of 3-layer architecture.

## TASK 4.2

Link User records in one table with Group records in another table.

-   Add a UserGroup table(“many-to-many” relationship) which will store the data describing which users are assigned to which group.
-   If any record gets removed from the DB, then all linked records should be removed from UserGroup as well.

## TASK 4.3

Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group. Use transactionsto save records in DB.

## API

```javascript
interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
```

| Method |   Endpoint   |          Request          |           Response            |              Description               |
| :----: | :----------: | :-----------------------: | :---------------------------: | :------------------------------------: |
|  GET   | `/users/:id` |        `id: UUID`         |         `user: User`          |             Get user by id             |
|  GET   |   `/users`   | `?loginSubstring=&limit=` |        `users: User[]`        | Get auto-suggest list from limit users |
|  POST  |   `/users`   |       `user: User`        | `status: boolean, user: User` |              Create user               |
|  PUT   |   `/users`   |       `user: User`        | `status: boolean, user: User` |              Update user               |
| DELETE | `/users/:id` |        `id: UUID`         | `status: boolean, user: User` |              Remove user               |

```javascript
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface Group {
    id: string;
    name: string;
    permissions: Array<Permission>;
}
```
