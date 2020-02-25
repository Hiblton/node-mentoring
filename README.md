# nodejs-module-5

## PREREQUISITES:

The task is a continuation of Homework 4 and should be done in the same repo.

## TASK 5.1

-   Add express middlewarewhich will log which service method has been invoked and which arguments have been passed to it.

## TASK 5.2

-   Add express middleware which will log all unhandled errors and return a standard message with HTTP code 500(Internal Server Error).
    Remark: Do not modify the status code and the message for other errors like validation errors from the previous task.
-   Add error handling to process.on(‘uncaughtException’, ...).
-   Add Unhandled promise rejection listener to log errors.

## TASK 5.3

-   Every method in the controllers should log the errors which should include the following information:
    − method name;
    − arguments which have been passed to the method;
    − error message.

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
