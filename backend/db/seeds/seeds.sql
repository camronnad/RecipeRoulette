INSERT INTO users (name, email, password, created_at) 
VALUES ('Camron Naderi', 'cam@gmail.com', '123', NOW()),
       ('Jesse Sandhu', 'jesse@gmail.com', '456', NOW()),
       ('Tagel lajore', 'tagel@gmail.com', '789', NOW()),
       ('Sourav badhan', 'sourav@gmail.com', '8910', NOW());

       INSERT INTO likedRecipes (title, description, api_url, instruction, recipe_id, photo_url, user_id) 
VALUES ('pizza', 'delicious pizza', 't.com', 'these are the instructions for pizza', 1, 'x.com', 3),
       ('Pasta', 'delicious pasta', 't.com', 'these are the instructions for pasta', 2, 'google.com', 1),
       ('sushi', 'delicious sushi', 't.com', 'these are the instructions for sushi', 3, 'spotify.com', 2),
       ('steak', 'delicious steak', 't.com', 'these are the instructions for steak', 4, 'meatlover.com', 4);