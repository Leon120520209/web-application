const express = require('express');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const listing = require('./listing');
const category = require('./category');
const user = require('./user');
const auth = require('./auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/authenticate', auth.authenticate);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// Your routes go here - write them in a new component in it's own .js file

app.get('/v0/category', auth.check, category.getCategories);
app.get('/v0/listing/:category', auth.check, listing.getListingsByCategory);
app.get('/v0/listing', auth.check, listing.getListingsBySearch);
app.post('/v0/listing/', auth.check, listing.postListings);
app.post('/v0/user', auth.check, user.postUser);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
