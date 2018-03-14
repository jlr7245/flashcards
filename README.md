# Flashcards App

Code flashcards app!

### Notes about structure

This app uses ES6 classes to model database records and relationships.

### To run locally:

- Download & install dependencies
- Create a database `code_flashcards_dev` and run the migrations, in order
- Create a `.env` file
    - You will need a `SECRET_KEY` value for auth to work
    - You will need an `API_KEY` value, populated with an API key from [Indico](https://indico.io/).
- `yarn dev` starts the express app. `yarn react` starts the react app.


### To seed the test data:

- Create three test users
- Make sure you have the API key set up
- Run `yarn seed` to seed the data.