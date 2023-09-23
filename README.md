# Condition Builder solution

This tool allows you to load an array of data and layer in and/or conditions to filter the data.

You can see how to test this project [here](https://www.loom.com/share/cac8eccc8cd3450ba0da3304c3d873b8?sid=9d651961-778c-4bd6-8a9e-47f3f6277a41)

## Improvements

- Add more automated tests, specially for the components that set the filters
- Add automated E2E tests with Cypress, being able to automate a complete flow in the browser
- Add more validations to the filters input (for example, when you select a regex as the operation, check that you set a correct regex).
- Check that the data that the URL returns is an array, and, if not, show an error message.

## Execute the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
