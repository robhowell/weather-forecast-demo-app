import PropTypes from 'prop-types';
import WeatherForDay from '../WeatherForDay/WeatherForDay';
import './WeatherForNext5Days.scss';

/* Get the date part of the date-time string */
const getWeatherDate = weatherItem => weatherItem.dt_txt.substring(0, 10);

/* Reduce the weather list to an object containing items for each day */
const reduceWeatherListToDays = (previous, weatherItem) => {
  const weatherDate = getWeatherDate(weatherItem);
  const weatherItemsForCurrentDay = previous[weatherDate] || [];

  return {
    ...previous,
    [weatherDate]: [...weatherItemsForCurrentDay, weatherItem]
  };
};

/* Convert the weather list into an array of objects containing the items for each day */
const getWeatherDataDayArray = weatherList => {
  const weatherDates = weatherList.map(getWeatherDate);
  const uniqueWeatherDates = Array.from(new Set(weatherDates));
  const weatherDayData = weatherList.reduce(reduceWeatherListToDays, {});

  return uniqueWeatherDates.map(weatherDate => ({
    date: weatherDate,
    weather: weatherDayData[weatherDate]
  }));
};

const WeatherForNext5Days = ({ weatherList }) => {
  const weatherDayData = getWeatherDataDayArray(weatherList);
  /* Slice array to only show 5 days, including today, as per popular 5-day online forecasts such as BBC weather */
  const fiveDaysWeatherData = weatherDayData.slice(0, 5);

  const weatherDayArray = fiveDaysWeatherData.map(({ date, weather }) => (
    <WeatherForDay date={date} weather={weather} key={date} />
  ));

  return <div className="WeatherForNext5Days">{weatherDayArray}</div>;
};

WeatherForNext5Days.propTypes = {
  weatherList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export { getWeatherDataDayArray };
export default WeatherForNext5Days;
