# API Endpoints

## Authentication endpoints

### `POST /register` 
**Description** register user to use the app.
The new user to register need to be unique username (not already in db),
or it will return 401 code with the message "invalid credentials"


Request example
```js
{
    username: admin,
    password: password
}
```

Return example (code 201)
```js
{
    detaiil: "user created"
    access_token: {
        token: "jwt.token.example"
        type: "Bearer"
    }
}
```

Real example success register
```js
{
    "detail": "User created",
    "access_token": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoicGVuZWEiLCJleHAiOjE3NDgxNDI5NDR9.tScXsUvVM4iBVsPBON34DveCVz1maHCxx0ldAA_bp4o",
        "token_type": "bearer"
    }
}
```

### `POST /login`
**Description** login user to use the app.
The user need to provide the correct username and password to login.
If the username or password is incorrect or dont exists, it will return 401 code with the message "invalid credentials"

Request example
```js
{
    username: admin,
    password: password
}
```

Return example (code 200)
```js
{
    detail: "login success"
    access_token: {
        token: "jwt.token.example"
        type: "Bearer"
    }
}
```
Real example success login
```js
{
    "detail": "Login successful",
    "access_token": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidGVzdGluZyIsImV4cCI6MTc0ODE0MzIyNX0.D1E07xD_XL3gaIcJaFFXmop7fAUaDJO_pZuDLJoBbF8",
        "token_type": "bearer"
    }
}
```

### JWT Token
**Description** The token is used to authenticate the user for the task management endpoints.
The token is a JWT token that is returned after successful registration or login.
The token should be included in the `Authorization` header of the request to the task management endpoints.

Authorization header example
```
Authorization: Bearer jwt.token.example
``` 

Decoded token payload example
```js
{
    "sub": 1,             // user id in db
    "username": "admin", // username of the user
    "exp": 1700000000   // expiration time 
}
```

---
## Task management endpoints

The following endpoints need to be authenticated with the token received from the register or login endpoint.



### `GET /tasks`
**Description** return all tasks on server.

Return example 
```js
[
[
    {
        "id": 3,
        "user_id": 1,
        "title": "example",
        "description": "this is an example to testing",
        "done": false
    },
    {
        "id": 4,
        "user_id": 1,
        "title": "example",
        "description": "this is an example to testing",
        "done": false
    },
    {
        "id": 5,
        "user_id": 1,
        "title": "example",
        "description": "this is an example to testing",
        "done": false
    }
]
]
```

### `POST /task`
**Description** add new task on server.

`POST` body example
```js
{
    "title": "example",
    "description": "this is an example to testing",
    "done": "false"
}
```

return example
```js
{   
    "detail": "Task created"
    "task": {
        "id": 3,
        "user_id": 1,
        "title": "example",
        "description": "this is an example to testing",
        "done": false
    }
}
```

### `PUT /tasks/{task_id}`
**Description** update one existing task

Request body example `PUT /tasks/{task_id}`
```js
{
    "title": "example",
    "description": "example to testing update",
    "done": false
}
```

success return 
```js
{
    "detail": "Task updated",
    "task": {
        "id": 3,
        "user_id": 1,
        "title": "example",
        "description": "example to testing update",
        "done": false
    }
}
```

if requested id is not found, return 404
```js
{
    "detail": "Invalid task id"
}
```

### `DELETE /tasks/{task_id}`
**description** delete specific task by id

```
DELETE /task/{task_id}
```
If success will return 204 code (none).

If id not exists then will return 404 code with the following message:
```js
{
    "detail": "Invalid task id"
}
```