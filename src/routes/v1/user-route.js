const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers/');
// const {CityMiddlewares} = require('../../middlewares/')

// api/v1/user/signup/  --POST
router.post('/signup',
    UserController.signup);

router.post('/signin',
    UserController.signin);





module.exports = router ;

