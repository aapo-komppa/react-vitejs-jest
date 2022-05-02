# The app
This app is meant to be FE demo. Basic BE is provided to be able to use the app.

## features:
- login with token from dotenv file
- list posts based on filters provided
- senders listed alphabetically
- filter by sender
- search by content
- sort by date

## developing the app:

- copy .env.sample to .env file to provide env variables
- run npm install in root folder
- run npm install in `/backend` folder
- run npm start dev in `/backend` and root folders

## tests:
formik has a bug which causes warnings ´An update to Formik inside a test was not wrapped in act(...).´. These warnings can be ignored as it's bug in Formik