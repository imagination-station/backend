## backend

Used this as a basis for the authentication flow: https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f

Creating a new user happens through a POST request to auth/createUser.

Login will happen client side and firebase will give you an authorization token. 

This token should then be passed in the Authorization section of every request. (Example: Bearer: TOKEN). This will make sure onklu authorized persons can access a resource.