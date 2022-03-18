const pool = require('../utils/pool');

module.exports = class Pizza {
  id;
  style;
  toppings;

  constructor(row) {
    this.id = row.id;
    this.style = row.style;
    this.toppings = row.toppings;
  }
  static async insert({ style, toppings }) {
    const { rows } = await pool.query(
      'INSERT INTO pizzas(style, toppings) VALUES ($1, $2) RETURNING *;',
      [style, toppings]
    );
    return new Pizza(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM pizzas;');
    return rows.map((row) => new Pizza(row));
  }
};
