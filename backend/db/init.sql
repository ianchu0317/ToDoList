USE todo_list;

CREATE TABLE tasks (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    done BOOLEAN DEFAULT FALSE
);
