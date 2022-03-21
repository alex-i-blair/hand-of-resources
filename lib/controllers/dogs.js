const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.json(dog);
  })
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll(req.body);
    res.json(dogs);
  })
  .get('/:id', async (req, res) => {
    const dog = await Dog.getById(req.params.id);
    res.json(dog);
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedDog = await Dog.updateById(id, req.body);

      if (!updatedDog) {
        const error = new Error(`Dog ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedDog);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const dog = await Dog.deleteById(req.params.id);
    res.json(dog);
  });
