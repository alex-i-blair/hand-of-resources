const pool = require('../utils/pool');
module.exports = class Restaurant {
  id;
  name;
  cuisine;
  cost;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
  }
  static async insert({ name, cuisine, cost }) {
    const { rows } = await pool.query(
      'INSERT INTO restaurants(name, cuisine, cost) VALUES($1, $2, $3) RETURNING *;',
      [name, cuisine, cost]
    );
    return new Restaurant(rows[0]);
  }
};
