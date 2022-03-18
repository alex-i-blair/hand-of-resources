const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()
  .post('/', async (req, res) => {
    const pizza = await Pizza.insert(req.body);
    res.json(pizza);
  })
  .get('/', async (req, res) => {
    const pizzas = await Pizza.getAll(req.body);
    res.json(pizzas);
  })
  .get('/:id', async (req, res) => {
    const pizza = await Pizza.getById(req.params.id);
    res.json(pizza);
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedPizza = await Pizza.updateById(id, req.body);

      if (!updatedPizza) {
        const error = new Error(`Pizza ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedPizza);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const pizza = await Pizza.deleteById(req.params.id);
    res.json(pizza);
  });
