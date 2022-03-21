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
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants;');
    return rows.map((row) => new Restaurant(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM restaurants WHERE id=$1;',
      [id]
    );
    return new Restaurant(rows[0]);
  }

  static async updateById(id, { name, cuisine, cost }) {
    const existingRestaurant = await Restaurant.getById(id);
    if (!existingRestaurant) return null;
    const newName = name ?? existingRestaurant.name;
    const newCuisine = cuisine ?? existingRestaurant.cuisine;
    const newCost = cost ?? existingRestaurant.cost;
    const { rows } = await pool.query(
      'UPDATE restaurants SET name=$1, cuisine=$2, cost=$3 WHERE id=$4 RETURNING *;',
      [newName, newCuisine, newCost, id]
    );
    return new Restaurant(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM restaurants WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Restaurant(rows[0]);
  }
};
