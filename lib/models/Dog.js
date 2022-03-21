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
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dogs;');
    return rows.map((row) => new Dog(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id=$1;', [id]);
    return new Dog(rows[0]);
  }
  static async updateById(id, { name, breed }) {
    const existingDog = await Dog.getById(id);
    if (!existingDog) return null;

    const newName = name ?? existingDog.name;
    const newBreed = breed ?? existingDog.breed;
    const { rows } = await pool.query(
      'UPDATE dogs SET name=$1, breed=$2 WHERE id=$3 RETURNING *;',
      [newName, newBreed, id]
    );
    return new Dog(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM dogs WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Dog(rows[0]);
  }
};
