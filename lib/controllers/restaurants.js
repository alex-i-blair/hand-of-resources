const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.json(restaurant);
  })
  .get('/', async (req, res) => {
    const restaurant = await Restaurant.getAll(req.body);
    res.json(restaurant);
  });
