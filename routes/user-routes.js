const express         = require('express');
const usersController = require('../controllers/users-controller');
const authHelpers     = require('../services/auth/auth-helpers');

const userRoutes = express.Router();

userRoutes.get('/', authHelpers.loginRequired, usersController.index);

module.exports = userRoutes;
