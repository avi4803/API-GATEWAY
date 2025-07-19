const { StatusCodes } = require('http-status-codes');
const {UserService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function signup(req, res){
    try {
        const user = await UserService.createUser({
            email : req.body.email,
            password : req.body.password

        })
        SuccessResponse.message = 'successfully added the User';
        SuccessResponse.data = user ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)


        
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
        
    }
}

async function signin(req, res){

    try {
        const user = await UserService.userSignIn({
            email : req.body.email,
            password : req.body.password

        })
        SuccessResponse.message = 'Successfully logged in';
        SuccessResponse.data = user ;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)


        
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
        
    }
}

async function addRoleToUser(req, res){

    try {
        const user = await UserService.addRoleToUser({
            role : req.body.role,
            id : req.body.id,

        })
        SuccessResponse.message = 'Role added successfully';
        SuccessResponse.data = user ;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)


        
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
        
    }
}

module.exports = {
    signup,
    signin,
    addRoleToUser

}