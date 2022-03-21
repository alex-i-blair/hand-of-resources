const pool = require('../utils/pool');

module.exports = class Album {
  id;
  name;
  artist;

  constructor(row) {
    this.id = row.id;
    this.name = row.album_name;
    this.artist = row.artist_name;
  }
  static async insert({ name, artist }) {
    const { rows } = await pool.query(
      'INSERT INTO favorite_albums(album_name, artist_name) VALUES($1, $2) RETURNING *;',
      [name, artist]
    );
    return new Album(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM favorite_albums;');
    return rows.map((row) => new Album(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM favorite_albums WHERE id=$1;',
      [id]
    );
    if (!rows[0]) return null;
    return new Album(rows[0]);
  }
  static async updateById(id, { name, artist }) {
    const existingAlbum = await Album.getById(id);
    if (!existingAlbum) return null;
    const newName = name ?? existingAlbum.name;
    const newArtist = artist ?? existingAlbum.artist;
    const { rows } = await pool.query(
      'UPDATE favorite_albums SET album_name=$1, artist_name=$2 WHERE id=$3 RETURNING *;',
      [newName, newArtist, id]
    );
    return new Album(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM favorite_albums WHERE id=$1 RETURNING *;',
      [id]
    );
    return new Album(rows[0]);
  }
};
