DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS likedRecipes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
   preferences JSONB,
  created_at TIMESTAMP
);

CREATE TABLE likedRecipes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  recipe_link VARCHAR(3000) NOT NULL,
  summary VARCHAR(5000),
  recipe_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  instructions VARCHAR(5000),
  readyInMinutes integer,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  rating integer DEFAULT 0
);
