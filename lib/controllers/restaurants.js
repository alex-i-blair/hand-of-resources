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
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedRestaurant = await Restaurant.updateById(id, req.body);
      if (!updatedRestaurant) {
        const error = new Error(`Restaurant ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedRestaurant);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const restaurant = await Restaurant.deleteById(req.params.id);
    res.json(restaurant);
  });
