User signup:
- Uses CRUD to register or create user
- Also BCRYPT is used to encrypt the passes using HOOK(triggers in mysql) which execute just before the user is created. It is basicall and function in inside object which take any function as callback.The function takes user(Provided from frontend or data object passed into repo) as object and modify it accordingly.

JWT tokens:

Authentication vs Authorisation:
- Authentication: Who you are
- Authorisation: What can you do

