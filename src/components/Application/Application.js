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
      errorMessage: '',
      searchText: '',
      serverResponse: {},
      showError: false,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    this.showWeatherForLocation('London, GB');
  }

  onTextChange(event) {
    this.setState({ showError: false, searchText: event.target.value });
  }

  onButtonClick(event) {
    this.showWeatherForLocation(this.state.searchText);
    event.preventDefault();
  }

  showWeatherForLocation(location) {
    getWeatherForCity(location)
      .then((serverResponse) => {
        const cityAndCountryTitle = `${serverResponse.city.name}, ${serverResponse.city.country}`;
        this.setState({
          errorMessage: '',
          searchText: cityAndCountryTitle,
          serverResponse,
          showError: false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
          serverResponse: {},
          showError: true,
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
        {showError && <ErrorMessage message={errorMessage} />}
        {weatherList && <WeatherForNext5Days weatherList={weatherList} />}
      </div>
    );
  }
}

export default Application;
