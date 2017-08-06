/* globals fetch */
import isServerJsonValid from './isServerJsonValid';

const apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
const appId = '25353ec85fb1e8026d7cc450b14ae703';

const fetchRequestObject = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  },
  mode: 'cors'
};

/* In a real-world app, specific error responses should be thrown depending on the failure
scenario, e.g. if the city cannot be found */
const getWeatherForCity = city =>
  fetch(`${apiEndpoint}?q=${city}&APPID=${appId}&units=metric`, fetchRequestObject)
    .then(serverResponse => serverResponse.json())
    .then((serverJson) => {
      if (!isServerJsonValid(serverJson)) {
        throw new Error('Sorry, the server did not return valid weather data');
      }

      return serverJson;
    });

export default getWeatherForCity;
