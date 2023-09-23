# Condition Builder solution

This tool allows you to load an array of data and layer in and/or conditions to filter the data.

You can see how to test this project [here](https://www.loom.com/share/968251317ae74b8aade942c53f247e26?sid=4a7b5a9c-b0b0-48b3-bb76-cccaa69d91f9) (and you could use [this url](https://data.nasa.gov/resource/y77d-th95.json) or [this one](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false) as source URL).

## Deployment

This project was deployed in Vercel. You can find the deployement [here](https://condition-builder-snowy.vercel.app/)

## Component Library

This project leverages [Chakra UI](https://chakra-ui.com/) as it's component library, utilizing the [default theme](https://chakra-ui.com/docs/styled-system/theme) as the foundation for our design system.

## Potential Enhancements

While the current version of the project is functional, here are some areas where improvements and enhancements could be made:

- Implement additional automated tests, particularly for components responsible for setting filters.
- Introduce end-to-end (E2E) testing with Cypress to automate complete browser-based workflows.
- Enhance input validation for filters, such as verifying the correctness of regular expressions, possibly by integrating React Hook Form.
- Perform data validation to ensure that the data returned by the URL is in the expected array format, display an error message if it isn't.
- Enhance the table functionality by incorporating features such as pagination, sorting options, and a search mechanism to improve data organization and accessibility.
- Integrate accessibility tests to ensure that the application is inclusive and complies with accessibility standards, providing a seamless user experience for all.
- Create a dedicated file to store all custom colors used in the project. Export these colors from the file to promote consistency and maintainability, eliminating the need for hardcoding color values throughout the codebase.
- Establish a separate constant file specifically for storing all hardcoded strings within the project. This approach streamlines string management, making it easier to update and maintain textual content across the application.

## Execute the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
