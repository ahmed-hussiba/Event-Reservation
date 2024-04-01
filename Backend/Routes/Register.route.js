const express = require('express');
const router = express.Router();
const userController = require('../Controllers/Register.Controller')

router.post('/', userController.Register);

module.exports = router;