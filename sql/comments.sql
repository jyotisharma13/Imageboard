DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    image_id UNIQUE images(id)  NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
