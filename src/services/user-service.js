const {UserRepository, RoleRepository} = require('../repositories/index');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const {Auth, Enums} = require('../utils/common/index')

async function createUser(data) {
    try{
        const user = await userRepo.create(data);
        const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
        
    } catch(error){
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

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('missing JWT token',StatusCodes.BAD_REQUEST);
        }
        const response = await Auth.verifyToken(token)
        const user = await userRepo.get(response.id);
        if(!user){
            throw new AppError('User not found',StatusCodes.BAD_REQUEST);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST)
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT Token expired', StatusCodes.BAD_REQUEST)
        }
        console.log('log from user-service isAuthenicated function', error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}

async function addRoleToUser(data){
    try {
        
        const user = await userRepo.get(data.id);
        if(!user){
            throw new AppError('No user found for given email', StatusCodes.NOT_FOUND);
        }
        const role = await roleRepo.getRoleByName(data.role);
        if(!role){
            throw new AppError('No Role found', StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;

        
    } catch (error) {
        console.log(error)
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR)
        
    }

}

async function isAdmin(id){
    try {
        const user = await userRepo.get(id);
        if(!user){
            throw new AppError('No user found for given email', StatusCodes.NOT_FOUND);
        }

        const adminRole = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!adminRole){
            throw new AppError('No Role found', StatusCodes.NOT_FOUND);
        }

        return user.hasRole(adminRole);
        
    } catch (error) {
        console.log(error)
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR)
        
    }

}


module.exports = {
    createUser,
    userSignIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}
