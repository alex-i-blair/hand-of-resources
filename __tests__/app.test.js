const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pizza = require('../lib/models/Pizza');
const Tree = require('../lib/models/Tree');
const Dog = require('../lib/models/Dog');
const Restaurant = require('../lib/models/Restaurant');
const Album = require('../lib/models/Album');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  //=================================================================
  //Pizza data tests
  //=================================================================
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

  it('should be able to get all pizzas', async () => {
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
    const res = await request(app)
      .patch(`/api/v1/pizzas/${pizza.id}`)
      .send({ style: 'Detroit', toppings: 'Pepperoni' });

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
  //=================================================================
  //Tree data tests
  //=================================================================
  it('should be able to create a tree', async () => {
    const res = await request(app)
      .post('/api/v1/trees')
      .send({ name: 'Black Maple', type: 'Deciduous' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Black Maple',
      type: 'Deciduous',
    });
  });

  it('should be able to get all trees', async () => {
    await Tree.insert({ name: 'Black Maple', type: 'Deciduous' });
    const res = await request(app).get('/api/v1/trees');
    expect(res.body).toEqual([
      { id: expect.any(String), name: 'Black Maple', type: 'Deciduous' },
    ]);
  });

  it('should be able to get a tree by id', async () => {
    const tree = await Tree.insert({ name: 'Black Maple', type: 'Deciduous' });
    const res = await request(app).get(`/api/v1/trees/${tree.id}`);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Black Maple',
      type: 'Deciduous',
    });
  });

  it('should be able to update a tree by id', async () => {
    const tree = await Tree.insert({ name: 'Black Maple', type: 'Deciduous' });
    const res = await request(app)
      .patch(`/api/v1/trees/${tree.id}`)
      .send({ name: 'Douglas Fir', type: 'Coniferous' });
    const expected = {
      id: expect.any(String),
      name: 'Douglas Fir',
      type: 'Coniferous',
    };
    expect(res.body).toEqual(expected);
    expect(await Tree.getById(tree.id)).toEqual(expected);
  });

  it('should be able to delete a tree by id', async () => {
    const tree = await Tree.insert({ name: 'Black Maple', type: 'Deciduous' });
    const res = await request(app).delete(`/api/v1/trees/${tree.id}`);
    expect(res.body).toEqual(tree);
    expect(await Tree.getById(tree.id)).toBeNull();
  });
  //=================================================================
  //Dog data tests
  //=================================================================
  it('should be able to make a dog', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'Toby', breed: 'Corgidor' });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Toby',
      breed: 'Corgidor',
    });
  });
  it('should be able to get all dogs', async () => {
    await Dog.insert({ name: 'Toby', breed: 'Corgidor' });
    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([
      { id: expect.any(String), name: 'Toby', breed: 'Corgidor' },
    ]);
  });

  it('should be able to get a dog by id', async () => {
    const dog = await Dog.insert({ name: 'Toby', breed: 'Corgidor' });
    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Toby',
      breed: 'Corgidor',
    });
  });
  it('should be able to update a dog by id', async () => {
    const dog = await Dog.insert({ name: 'Toby', breed: 'Corgidor' });
    const res = await request(app)
      .patch(`/api/v1/dogs/${dog.id}`)
      .send({ name: 'Dozer', breed: 'Patterdale Terrier' });
    const expected = {
      id: expect.any(String),
      name: 'Dozer',
      breed: 'Patterdale Terrier',
    };
    expect(res.body).toEqual(expected);
    expect(await Dog.getById(dog.id)).toEqual(expected);
  });
  it('should be able to delete a dog by id', async () => {
    const dog = await Dog.insert({ name: 'Toby', breed: 'Corgidor' });
    const res = await request(app).delete(`/api/v1/dogs/${dog.id}`);
    expect(res.body).toEqual(dog);
    // expect(await Dog.getById(dog.id)).toBeNull();
  });
  //=================================================================
  //Restaurant data tests
  //=================================================================
  it('should be able to create a restaurant', async () => {
    const res = await request(app).post('/api/v1/restaurants').send({
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
  });
  it('should be able to get all restaurants', async () => {
    await Restaurant.insert({ name: 'Dame', cuisine: 'Italian', cost: '$$$' });
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body).toEqual([
      { id: expect.any(String), name: 'Dame', cuisine: 'Italian', cost: '$$$' },
    ]);
  });
  it('should be able to get a restaurant by id', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
    const res = await request(app).get(`/api/v1/restaurants/${restaurant.id}`);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
  });
  it('should be able to update a restaurant by id', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
    const res = await request(app)
      .patch(`/api/v1/restaurants/${restaurant.id}`)
      .send({ name: 'East Glisan', cuisine: 'Pizza', cost: '$$' });
    const expected = {
      id: expect.any(String),
      name: 'East Glisan',
      cuisine: 'Pizza',
      cost: '$$',
    };
    expect(res.body).toEqual(expected);
    expect(await Restaurant.getById(restaurant.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Dame',
      cuisine: 'Italian',
      cost: '$$$',
    });
    const res = await request(app).delete(
      `/api/v1/restaurants/${restaurant.id}`
    );
    expect(res.body).toEqual(restaurant);
    // expect(await Restaurant.getById(restaurant.id)).toBeNull();
  });
  //=================================================================
  //Favorite Albums data tests
  //=================================================================
  it('should be able to create a favorite album', async () => {
    const res = await request(app).post('/api/v1/albums').send({
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
  });
  it('should be able to get all albums', async () => {
    await Album.insert({
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
    const res = await request(app).get('/api/v1/albums');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'In the Airplane Over the Sea',
        artist: 'Neutral Milk Hotel',
      },
    ]);
  });
  it('should be able to get album by id', async () => {
    const album = await Album.insert({
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
    const res = await request(app).get(`/api/v1/albums/${album.id}`);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
  });
  it('should be able to update by id', async () => {
    const album = await Album.insert({
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
    const res = await request(app)
      .patch(`/api/v1/albums/${album.id}`)
      .send({ name: 'Never Learn', artist: 'Lykke Li' });
    const expected = {
      id: expect.any(String),
      name: 'Never Learn',
      artist: 'Lykke Li',
    };
    expect(res.body).toEqual(expected);
    expect(await Album.getById(album.id)).toEqual(expected);
  });
  it('should be able to delete album by id', async () => {
    const album = await Album.insert({
      name: 'In the Airplane Over the Sea',
      artist: 'Neutral Milk Hotel',
    });
    const res = await request(app).delete(`/api/v1/albums/${album.id}`);
    expect(res.body).toEqual(album);
    expect(await Album.getById(album.id)).toBeNull();
  });
});
