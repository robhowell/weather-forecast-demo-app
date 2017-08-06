import { Component } from 'react';
import 'normalize.css';
import './Application.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';
import WeatherForNext5Days from '../WeatherForNext5Days/WeatherForNext5Days';
import getWeatherForCity from '../../networking/getWeatherForCity';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityAndCountryTitle: '',
      errorMessage: '',
      searchText: '',
      serverResponse: {},
      showError: false
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onTextChange(event) {
    this.setState({ showError: false, searchText: event.target.value });
  }

  onButtonClick(event) {
    event.preventDefault();

    getWeatherForCity(this.state.searchText).then((serverResponse) => {
      this.setState({
        cityAndCountryTitle: `${serverResponse.city.name}, ${serverResponse.city.country}`,
        errorMessage: '',
        serverResponse,
        showError: false
      });
    }).catch((error) => {
      this.setState({
        cityAndCountryTitle: '',
        errorMessage: error.message,
        serverResponse: {},
        showError: true
      });
    });
  }

  render() {
    const { onButtonClick, onTextChange } = this;
    const { cityAndCountryTitle, errorMessage, searchText, serverResponse, showError } = this.state;
    const weatherList = serverResponse.list || [];

    const renderedErrorMessage = showError ?
      <ErrorMessage message={errorMessage} /> : null;

    const renderedCityAndCountryTitle = cityAndCountryTitle !== '' ?
      <h2 className="Application__cityAndCountryTitle">{cityAndCountryTitle}</h2> : null;

    const renderedWeatherForNext5Days = weatherList.length ?
      <WeatherForNext5Days weatherList={weatherList} /> : null;

    return (
      <div className="Application">
        <h1 className="Application__title">5-day weather forecast</h1>
        <SearchBox {...{ onButtonClick, onTextChange, searchText }} />
        { renderedErrorMessage }
        { renderedCityAndCountryTitle }
        { renderedWeatherForNext5Days }
      </div>
    );
  }
}

export default Application;
