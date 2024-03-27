const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User.Controller');


router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.get('/:id/cart', UserController.getUserCart);

router.post('/', UserController.addUser);
router.post('/:id/cart', UserController.addToUserCart);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);
router.delete('/:id/cart', UserController.deleteFromUserCart);

module.exports = router;