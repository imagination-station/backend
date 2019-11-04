# backend

environment variables are handled through dotenv package. You can add a .env file to the root of the project and add DB_HOST and GOOGLE_APPLICATION_CREDENTIALS variables. DB_HOST will be the URL for the mongoDB cluster which you can find on the mongoDB atlas portal. GOOGLE_APPLICATION_CREDENTIALS is the path to the firebase service account keys you can download from firebase.

## Auth for endpoints
Login will happen client side and firebase will give you an authorization token. (user.tokenID or something similar)

This token should then be passed in the Authorization section of every request. (Example: "Bearer: TOKEN"). This will make sure only authorized persons can access a resource.

## Endpoints (WIP)

#### POST /users/social
Creates a user when authenticated through Google/Facebook

Request JSON:
```
{ 
    name: String,
    email: String,
    location: city id,
} 
```

#### POST /users/email
Creates a user when authenticated through email/password

Request JSON:
```
{ 
    name: String,
    email: String,
    password: String,
    location: city id,
} 
```

#### GET /users/:id
:id - Mongo User ID

Retrieves a user by the id

### GET /users/?firebaseId=:id
:id - Firebase User Id

Retrived a user by id

#### POST /users/:userId/forks
:userId - User ID

Adds route to users forked routes

Request JSON:
```
{ 
    routeId: String,
} 
```

#### GET /users/:userId/forks
:userId - User ID

Returns user's forked routes

#### GET /users/:userId/routes
:userId - User ID

Returns the user's created routes

#### POST /cities
Adds a new city to the db

Request JSON:
```
{
    name: String, 
    state: String,
    country: String
} 
```

#### GET /cities/
Retrieves the cities in the db

#### GET /cities/:id
:id - City ID

Retrieves a city by its id

#### POST /cities/routes
Adds a new route and its respective pins to the db

Request JSON:
```
{
    name: String,
    creator: user id,
    city: city id,
    pins: [{
        name: String,
        coordinates: [Number, Number],
        description: String,
    }]
} 
```

#### GET /cities/routes/:id
:id - Route ID

Retrieves a route by its id

#### GET /cities/routes
Retrieves up to 20 routes

#### GET /cities/:id/routes
:id - City ID

Retrieves up to 20 routes from the city specified

#### GET /cities/:id/routes
Retrieves up to 50 routes in the city by tags

:id - City ID
Body:
```
{
    "tags": ["BLAH", "blah"]
} 
```

