import { shallow } from 'enzyme';
import Application from './Application';
import simplifiedMockResponse from '../../test-data/simplifiedMockResponse';

describe('Application', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Application />);
  });

  it('should render title and SearchBox component on initial render', () => {
    const applicationTitle = rendered.find('.Application__title');
    expect(applicationTitle.length).toEqual(1);

    const searchBox = rendered.find('SearchBox');
    expect(searchBox.length).toEqual(1);
  });

  it('should not render ErrorMessage, city name or WeatherForNext5Days component on initial render', () => {
    const errorMessage = rendered.find('ErrorMessage');
    expect(errorMessage.length).toEqual(0);

    const cityAndCountryTitle = rendered.find('.Application__cityAndCountryTitle');
    expect(cityAndCountryTitle.length).toEqual(0);

    const weatherForNext5Days = rendered.find('WeatherForNext5Days');
    expect(weatherForNext5Days.length).toEqual(0);
  });

  it('should show ErrorMessage with specified message when state is set', () => {
    rendered.setState({
      errorMessage: 'Test error message',
      showError: true
    });

    const errorMessage = rendered.find('ErrorMessage');
    expect(errorMessage.length).toEqual(1);
    expect(errorMessage.prop('message')).toEqual('Test error message');
  });

  it('should show WeatherForNext5Days when serverResponse is set in state', () => {
    rendered.setState({
      serverResponse: simplifiedMockResponse
    });

    const weatherForNext5Days = rendered.find('WeatherForNext5Days');
    expect(weatherForNext5Days.length).toEqual(1);
  });
});
