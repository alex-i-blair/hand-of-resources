const { Router } = require('express');
const Tree = require('../models/Tree');

module.exports = Router().post('/', async (req, res) => {
  const tree = await Tree.insert(req.body);
  res.json(tree);
});
