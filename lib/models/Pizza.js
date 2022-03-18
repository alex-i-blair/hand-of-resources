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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM pizzas WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Pizza(rows[0]);
  }
  static async updateById(id, { style, toppings }) {
    const existingPizza = await Pizza.getById(id);
    if (!existingPizza) return null;

    const newStyle = style ?? existingPizza.style;
    const newToppings = toppings ?? existingPizza.toppings;
    const { rows } = await pool.query(
      'UPDATE pizzas SET style=$1, toppings=$2 WHERE id=$3 RETURNING *;',
      [newStyle, newToppings, id]
    );
    return new Pizza(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM pizzas WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Pizza(rows[0]);
  }
};
