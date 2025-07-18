const {UserRepository} = require('../repositories/index');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const userRepo = new UserRepository();

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

module.exports = {
    createUser
}
