# nodejs-module-next

## PREREQUISITES:

The task is a continuation of Homework 6 and should be done in the same repo.

## TASK 7.1

-   Add unit tests for User entity controller methods using Jest library (https://jestjs.io/).
-   Add unit tests for Group entity controller methods using Jest.

## TASK 7.2

The information on DB connection (connection string) should be stored in.env file and should be passed to the application using environment variables with the help of dotenv package (https://www.npmjs.com/package/dotenv).
As an alternative package you can also use config (https://www.npmjs.com/package/config).

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
