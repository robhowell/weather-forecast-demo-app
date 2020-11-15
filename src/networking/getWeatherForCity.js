/* globals fetch */
import isServerJsonValid from './isServerJsonValid';

const apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
const appId = 'c83b50aff9a68abefa34e64895024d99';

const fetchRequestObject = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
  mode: 'cors',
};

/* In a real-world app, specific error responses should be thrown depending on the failure
scenario, e.g. if the city cannot be found */
const getWeatherForCity = (city) =>
  fetch(
    `${apiEndpoint}?q=${city}&APPID=${appId}&units=metric`,
    fetchRequestObject
  )
    .then((serverResponse) => serverResponse.json())
    .then((serverJson) => {
      if (!isServerJsonValid(serverJson)) {
        throw new Error('Sorry, the server did not return valid weather data');
      }

      return serverJson;
    });

export default getWeatherForCity;
