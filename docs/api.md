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

## `POST /login`
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


---
## Task management endpoints

The following endpoints need to be authenticated with the token received from the register or login endpoint.



### `GET /tasks`
**Description** return all tasks on server.

Return example 
```js
[
    {
        id: 1,
        title: "test",
        description: "test",
        done: "false"
    },
    {
        id: 2,
        title: "example",
        description: "this is an example", 
        done: "true"
    }
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

## `DELETE /tasks/{task_id}`
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