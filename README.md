## Challenge

### Azure Function

coding-challenge-api is designed as a Node Azure Function.  It queries the Giphy API so that the api key is secretly hidden at the server layer.  It also calls only the random API and does not expose the entirety of the Giphy API.  It is currently deployed to https://withjamgiphychallenge.azurewebsites.net/api.  If you want to test it locally, create an .env.local file in the root of the React project and assign REACT_APP_API a value to your localhost location instead.

### React

coding-challenge-react is a standard create-react-app application with custom design and components to display 1-5 random Giphy images.  The highlight functionality will cycle through the displayed Giphy images in alphabetical order of their internal ID (displayed beneath the image)