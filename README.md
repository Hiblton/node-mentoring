# nodejs-module3

## PREREQUISITES:

The task is a continuation of Homework2 and should be done in the same repo(???).

## TASK 3.1

-   Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgresor https://www.elephantsql.com/plans.html).
-   Write SQL script which will create Users table in the DB and fillit in with predefined users’ collection.
-   Configure your REST service to work with PostgreSQL.
    -   Use the sequelize package(http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.
    As an alternative to sequelizeyou can use more low-level query-builder library(http://knexjs.org/).

## TASK 3.2

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:
```javascript
| routers / controllers
| services
| data-access
| models
```

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
