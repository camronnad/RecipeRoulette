INSERT INTO users (name, email, password, created_at) 
VALUES ('Camron Naderi', 'cam@gmail.com', '123', NOW()),
       ('Jesse Sandhu', 'jesse@gmail.com', '456', NOW()),
       ('Tagel lajore', 'tagel@gmail.com', '789', NOW()),
       ('Sourav badhan', 'sourav@gmail.com', '8910', NOW()),
       ('John Jacob', 'john@gmail.com', '789', NOW());

       INSERT INTO likedRecipes (title, description, recipe_link, summary, recipe_id, photo_url, instructions, readyInMinutes, user_id) 
VALUES ('pizza', 'delicious pizza', 't.com', 'these are the summary for pizza', 1, 'x.com', 'these are instructions', 15, 3),
       ('Pasta', 'delicious pasta', 't.com', 'these are the summary for pasta', 2, 'google.com','these are instructions', 15, 1),
       ('sushi', 'delicious sushi', 't.com', 'these are the summary for sushi', 3, 'spotify.com','these are instructions', 15, 2),
       ('steak', 'delicious steak', 't.com', 'these are the summary for steak', 4, 'meatlover.com','these are instructions', 15, 4),
       ('burger', 'delicious burger', 't.com', 'these are the summary for steak', 5, 'meatlover.com','these are instructions', 15, 5);