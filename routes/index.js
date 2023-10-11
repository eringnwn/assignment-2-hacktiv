const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/', controller.getAllData);

module.exports = router;