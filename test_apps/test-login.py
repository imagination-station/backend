import pyrebase

config = {
  "apiKey": "NEVER_PUBLISH",
  "authDomain": "imaginationstation-3c7a7.firebaseapp.com",
  "databaseURL": "https://imaginationstation-3c7a7.firebaseio.com",
  "storageBucket": "imaginationstation-3c7a7.appspot.com",
  "serviceAccount": "/Users/luisgzz/Documents/School/Apps&Svcs/_app/backend/keys/serviceAccountKey.json"
}

firebase = pyrebase.initialize_app(config)


auth = firebase.auth()

user = auth.sign_in_with_email_and_password("test@gmail.com", "testPass123")

print(user['idToken'])