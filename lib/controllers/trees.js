const { Router } = require('express');
const Tree = require('../models/Tree');

module.exports = Router()
  .post('/', async (req, res) => {
    const tree = await Tree.insert(req.body);
    res.json(tree);
  })
  .get('/', async (req, res) => {
    const trees = await Tree.getAll(req.body);
    res.json(trees);
  })
  .get('/:id', async (req, res) => {
    const tree = await Tree.getById(req.params.id);
    res.json(tree);
  });
