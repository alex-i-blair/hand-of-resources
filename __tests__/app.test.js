const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pizza = require('../lib/models/Pizza');
// const Pizza = require('../lib/models/Pizza');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a pizza', async () => {
    const res = await request(app)
      .post('/api/v1/pizzas')
      .send({ style: 'Neapolitan', toppings: 'Margarita' });

    expect(res.body).toEqual({
      id: expect.any(String),
      style: 'Neapolitan',
      toppings: 'Margarita',
    });
  });

  it('should be able to get pizzas', async () => {
    await Pizza.insert({ style: 'Neapolitan', toppings: 'Margarita' });
    const res = await request(app).get('/api/v1/pizzas');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        style: 'Neapolitan',
        toppings: 'Margarita',
      },
    ]);
  });

  it('should be able to get a pizza by id', async () => {
    const pizza = await Pizza.insert({
      style: 'Neapolitan',
      toppings: 'Margarita',
    });

    const res = await request(app).get(`/api/v1/pizzas/${pizza.id}`);
    expect(res.body).toEqual(pizza);
    //Ben told me that this was an acceptable test method but it seems like its logic has potential to return false positives
  });

  it('should be able to update a pizza by id', async () => {
    const pizza = await Pizza.insert({
      style: 'Neapolitan',
      toppings: 'Margarita',
    });
    console.log('initial pizza ||', pizza);
    const res = await request(app)
      .patch(`/api/v1/pizzas/${pizza.id}`)
      .send({ style: 'Detroit', toppings: 'Pepperoni' });

    const newPizza = await Pizza.getById(pizza.id);
    console.log('new pizza ||', newPizza);
    const expected = {
      id: pizza.id,
      style: 'Detroit',
      toppings: 'Pepperoni',
    };
    expect(res.body).toEqual(expected);
    expect(await Pizza.getById(pizza.id)).toEqual(expected);
  });

  it('should be able to delete a pizza by id', async () => {
    const pizza = await Pizza.insert({
      style: 'Neapolitan',
      toppings: 'Margarita',
    });
    const res = await request(app).delete(`/api/v1/pizzas/${pizza.id}`);

    expect(res.body).toEqual(pizza);
    expect(await Pizza.getById(pizza.id)).toBeNull();
  });
});
