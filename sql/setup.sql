-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS pizzas;

CREATE TABLE pizzas (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  style TEXT NOT NULL,
  toppings TEXT NOT NULL
);
