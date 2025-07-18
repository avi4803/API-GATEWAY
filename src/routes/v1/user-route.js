const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers/');
// const {CityMiddlewares} = require('../../middlewares/')

// api/v1/signup/  --POST
router.post('/',
    UserController.signup);





module.exports = router ;

