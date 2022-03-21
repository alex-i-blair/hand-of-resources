const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/pizzas', require('./controllers/pizzas'));
app.use('/api/v1/trees', require('./controllers/trees'));
app.use('/api/v1/dogs', require('./controllers/dogs'));
app.use('/api/v1/restaurants', require('./controllers/restaurants'));
app.use('/api/v1/albums', require('./controllers/albums'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
