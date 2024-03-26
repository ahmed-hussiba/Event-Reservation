const express = require('express');
const router = express.Router();
const userController = require('../Controllers/Login.Controller')

router.post('/',userController.Login)

module.exports = router;