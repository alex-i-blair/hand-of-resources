const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router()
  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);
    res.json(album);
  })
  .get('/', async (req, res) => {
    const albums = await Album.getAll(req.body);
    res.json(albums);
  })
  .get('/:id', async (req, res) => {
    const album = await Album.getById(req.params.id);
    res.json(album);
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAlbum = await Album.updateById(id, req.body);
      if (!updatedAlbum) {
        const error = new Error(`Album ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedAlbum);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const album = await Album.deleteById(req.params.id);
    res.json(album);
  });
