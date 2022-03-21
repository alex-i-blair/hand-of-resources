const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.json(restaurant);
  })
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll(req.body);
    res.json(restaurants);
  })
  .get('/:id', async (req, res) => {
    const restaurant = await Restaurant.getById(req.params.id);
    res.json(restaurant);
  });
