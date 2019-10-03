import pyrebase
from dotenv import load_dotenv
load_dotenv()
import os

config = {
  "apiKey": os.getenv("API_KEY"),
  "authDomain": "imaginationstation-3c7a7.firebaseapp.com",
  "databaseURL": "https://imaginationstation-3c7a7.firebaseio.com",
  "storageBucket": "imaginationstation-3c7a7.appspot.com",
  "serviceAccount": os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
}

firebase = pyrebase.initialize_app(config)


auth = firebase.auth()

test_email = os.getenv("TEST_EMAIL")
test_pass = os.getenv("TEST_PASS")
user = auth.sign_in_with_email_and_password(test_email, test_pass)

print(user['idToken'])