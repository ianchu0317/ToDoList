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
    "id": 3,
    "title": "example",
    "description": "this is an example to testing",
    "done": false
}
```