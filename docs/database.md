## Database documentation

The database configuration is located in `compose.yml` file.

**Credentials**
```yml
MYSQL_ROOT_PASSWORD: root_password
MYSQL_DATABASE: todo_list
MYSQL_USER: todo
MYSQL_PASSWORD: todo_password
```

###  Database `todo_list` Schema 

**Table tasks**
| filed  | datatype | description                  |
|--------|--------------|------------------------------|
| id     | INTEGER      |    Task unique ID  |
| title  | TEXT         |    Task Title      |
| description  | TEXT   |   Task description  |