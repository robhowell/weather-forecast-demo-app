import moment from 'moment';
import PropTypes from 'prop-types';
import './WeatherForDay.scss';

const WeatherForDay = ({ date, weather }) => {
  const dayName = moment(date).format('dddd');
  const tempsForEachTime = weather.map(weatherForTimeData => weatherForTimeData.main.temp);
  const totalTemp = tempsForEachTime.reduce((previous, current) => current + previous);
  const averageTemp = Math.round(totalTemp / tempsForEachTime.length);

  const weatherForDay = weather.map((weatherForDayData) => {
    const temp = Math.round(weatherForDayData.main.temp);
    const formattedTime = moment(weatherForDayData.dt_txt).format('ha');
    const mainWeather = weatherForDayData.weather[0].main;

    return (
      <p key={weatherForDayData.dt_txt} className="WeatherForDay__item">
        <span className="WeatherForDay__item-time">{formattedTime}: </span>
        <strong className="WeatherForDay__item-temp">{temp}<span className="WeatherForDay__degrees">&#8451;</span>, </strong>
        <span className="WeatherForDay__item-main-weather">{mainWeather}</span>
      </p>
    );
  });

  return (
    <div className="WeatherForDay">
      <h3 className="WeatherForDay__day-name">{dayName}</h3>
      <h4 className="WeatherForDay__day-average-temp">{averageTemp}<span className="WeatherForDay__degrees">&#8451;</span></h4>
      {weatherForDay}
    </div>
  );
};

WeatherForDay.propTypes = {
  date: PropTypes.string.isRequired,
  weather: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WeatherForDay;
