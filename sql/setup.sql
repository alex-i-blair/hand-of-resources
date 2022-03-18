-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS pizzas, trees, restaurants, dogs, favorite_albums;

CREATE TABLE pizzas (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  style TEXT NOT NULL,
  toppings TEXT NOT NULL
);

CREATE TABLE trees (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  cost TEXT NOT NULL
);

CREATE TABLE dogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL
);

CREATE TABLE favorite_albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  album_name TEXT NOT NULL,
  artist_name TEXT NOT NULL
);

-- INSERT INTO
--   pizzas (style, toppings)
-- VALUES
--   ('Neapolitan', 'Margarita'),
--   ('Detroit', 'Pepperoni');

-- INSERT INTO
--   trees (name, type)
-- VALUES
--   ('Douglas Fir', 'Coniferous'),
--   ('Oregon Ash', 'Deciduous');

-- INSERT INTO
--   restaurants (name, cuisine, cost)
-- VALUES
--   ('East Glisan Pizza Lounge', 'Pizza', '$$'),
--   ('Szechuan Chef', 'Chinese', '$');

-- INSERT INTO
--   dogs (name, breed)
-- VALUES
--   ('Toby', 'Corgidor'),
--   ('Dozer', 'Patterdale Terrier');

-- INSERT INTO
--   favorite_albums (album_name, artist_name)
-- VALUES
--   ('In the Airplain Over the Sea', 'Neutral Milk Hotel'),
--   ('I Never Learn', 'Lykke Li');


