# nodejs-module-6

## PREREQUISITES:

The task is a continuation of Homework 5 and should be done in the same repo.

## TASK 6.1

Add authorization to the already existing REST service.
-   Add login(username, password) method which should return JWT token.
-   Add a middleware which will proxy all the requests (except login) and check that HTTP Authorization header has the correct value of JWT token.
-   In case of the HTTP Authorization header is absent in the request, the middleware should stop further controller method execution and return HTTP 401 code (Unauthorized Error) and standard error message.
-   In case of HTTP Authorization header has invalid JWT token in the request, the middleware should return HTTP code 403(Forbidden Error) and standard error message.

## TASK 6.2

Add CORS middleware to access service methods from WEB applications hosted on another domains (https://github.com/expressjs/cors).

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
