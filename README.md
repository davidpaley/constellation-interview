# Frontend exercise: Condition Builder solution

This tool allows you to load an array of data and layer in and/or conditions to filter the data.

You can see how to test this project [here](https://www.loom.com/share/968251317ae74b8aade942c53f247e26?sid=4a7b5a9c-b0b0-48b3-bb76-cccaa69d91f9)

## Component Library

This project leverages [Chakra UI](https://chakra-ui.com/) as it's component library, utilizing the [default theme](https://chakra-ui.com/docs/styled-system/theme) as the foundation for our design system.

## Potential Enhancements

While the current version of the project is functional, here are some areas where improvements and enhancements could be made:

- Implement additional automated tests, particularly for components responsible for setting filters.
- Introduce end-to-end (E2E) testing with Cypress to automate complete browser-based workflows.
- Enhance input validation for filters, such as verifying the correctness of regular expressions, possibly by integrating React Hook Form.
- Perform data validation to ensure that the data returned by the URL is in the expected array format, display an error message if it isn't.

## Execute the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
