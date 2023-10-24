INSERT INTO users (name, email, password, created_at) 
VALUES ('Camron Naderi', 'cam@gmail.com', '123', NOW()),
       ('Jesse Sandhu', 'jesse@gmail.com', '456', NOW()),
       ('Tagel lajore', 'tagel@gmail.com', '789', NOW()),
       ('Sourav badhan', 'sourav@gmail.com', '8910', NOW());

       INSERT INTO likedRecipes (title, recipe_id, photo_url, user_id) 
VALUES ('pizza', 1, 'x.com', 3),
       ('Pasta', 2, 'google.com', 1),
       ('sushi', 3, 'spotify.com', 2),
       ('steak', 4, 'meatlover.com', 4);