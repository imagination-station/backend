# backend

environment variables are handled through dotenv package. You can add a .env file to the root of the project and add DB_HOST and GOOGLE_APPLICATION_CREDENTIALS variables. DB_HOST will be the URL for the mongoDB cluster which you can find on the mongoDB atlas portal. GOOGLE_APPLICATION_CREDENTIALS is the path to the firebase service account keys you can download from firebase.

## Auth for endpoints
Login will happen client side and firebase will give you an authorization token. (user.tokenID or something similar)

This token should then be passed in the Authorization section of every request. (Example: "Bearer: TOKEN"). This will make sure only authorized persons can access a resource.

## Endpoints so far
Take a look in the code to see what each endpoint expects.

POST /users/social

will add a user to the mongo database

use this if you create a user through facebook or google authentication

POST /users/email

will add a new user to firebase and mongo database

POST /cities

will add a new city to the mongoDB

POST /cities/routes

will add a new route and its respective pins to the mongoDB
