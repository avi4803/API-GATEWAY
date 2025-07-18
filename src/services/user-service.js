const {UserRepository} = require('../repositories/index');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const userRepo = new UserRepository();
const {Auth} = require('../utils/common/index')

async function createUser(data) {
    try{
        const user = await userRepo.create(data);
        return user;
        
    } catch(error){
        console.log('here is the error',error);
        if(error.name == 'SequelizeUniqueConstraintError'){
            throw new AppError('Email must be unique', StatusCodes.ACCEPTED)
        }
        
        throw new AppError('Error creating the User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function userSignIn(data){
    try {
        const user = await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch =  Auth.checkPassword(data.password ,user.password);   //passwordMatching
        if(!passwordMatch){
            throw new AppError('Invalid Password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({
            id:user.id,
            email: user.email
        })
        return jwt;


    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    createUser,
    userSignIn
}
