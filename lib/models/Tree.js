const pool = require('../utils/pool');

module.exports = class Tree {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }
  static async insert({ name, type }) {
    const { rows } = await pool.query(
      'INSERT INTO trees(name, type) VALUES ($1, $2) RETURNING *;',
      [name, type]
    );
    return new Tree(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM trees;');
    return rows.map((row) => new Tree(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM trees WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Tree(rows[0]);
  }
  static async updateById(id, { name, type }) {
    const existingTree = await Tree.getById(id);
    if (!existingTree) return null;

    const newName = name ?? existingTree.name;
    const newType = type ?? existingTree.type;
    const { rows } = await pool.query(
      'UPDATE trees SET name=$1, type=$2 WHERE id=$3 RETURNING *;',
      [newName, newType, id]
    );
    return new Tree(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM trees WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Tree(rows[0]);
  }
};
