## API Endpoints

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