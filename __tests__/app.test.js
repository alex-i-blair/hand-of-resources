const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
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
});
