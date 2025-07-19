User signup:
- Uses CRUD to register or create user
- Also BCRYPT is used to encrypt the passes using HOOK(triggers in mysql) which execute just before the user is created. It is basicall and function in inside object which take any function as callback.The function takes user(Provided from frontend or data object passed into repo) as object and modify it accordingly.

JWT tokens:

Authentication vs Authorisation:
- Authentication: Who you are
- Authorisation: What can you do


Authentication using JWT token:
- After the sign in and the the encrypted password is verified the createToken function from utils is called with object
const jwt = Auth.createToken({
            id:user.id,
            email: user.email
        })
This function return some JWT token that is stored by the frontend to authenticate without using credentials.


After JWT creation:
- The isAuthenticated function from service is executed with token given as argument.This token is used in the verifyToken function function to get 
associated crdentials.Also this function is used to checck whther the token is valid or not and then authentication occur.
- This function chains are used to create a new middleware that can provide auth function just by adding it to the route ad middleware.



Implementing RATE LIMITER in our API gateway:
- rate limiter is implemented din main index file.
- We use library called express-rate-limiter for easier implementation.
- 


Implementing PROXY in our Project:
- We use package called http-proxy-middleware
   user
    |
    v
localhost:3001(API GATEWAY) --> localhost:4000 (Booking Service)
    |
    v
localhost:3000/api/v1/flights (flight-service)

- process is done without exposing ip to each other maintaining abstraction.
- See http-proxy-middleware doc to use
- it work simply like routing by creating middleware and using it in routing


Implementing Authorisation:
- create many to many association using through table. A new table is created called roles which contains the various roles that exist. Also a through table called User-Roles is created to associate both data.
- a separate api is created for assigning roles to the user
- a authorisation middle ware is created which verify the current role of the user.

Creating create roles api(which can only be modified by admin):
- simple crud api is used to get the user and the user.addRole(CUSTOMER) is called to get it done.
- a middleware is created which verify whether the user is admin authorised and this middleware along with auth middleware is usedd to verify whether the user can modify user Roles or not.


Notification / Reminder Services:
 - PUB SUB is used for notification service (thus non blocking)
 - 



