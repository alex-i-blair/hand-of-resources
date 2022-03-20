const pool = require('../utils/pool');
module.exports = class Dog {
  id;
  name;
  breed;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
  }
  static async insert({ name, breed }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs(name, breed) VALUES($1, $2) RETURNING *;',
      [name, breed]
    );
    return new Dog(rows[0]);
  }
};
