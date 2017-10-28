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
      const cityAndCountryTitle = `${serverResponse.city.name}, ${serverResponse.city.country}`;
      this.setState({
        cityAndCountryTitle,
        errorMessage: '',
        searchText: cityAndCountryTitle,
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
    const { errorMessage, searchText, serverResponse, showError } = this.state;
    const weatherList = serverResponse.list || null;

    return (
      <div className="Application">
        <SearchBox {...{ onButtonClick, onTextChange, searchText }} />
        { showError && <ErrorMessage message={errorMessage} /> }
        { weatherList && <WeatherForNext5Days weatherList={weatherList} /> }
      </div>
    );
  }
}

export default Application;
