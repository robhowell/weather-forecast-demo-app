import { shallow } from 'enzyme';
import Application from './Application';
import simplifiedMockResponse from '../../test-data/simplifiedMockResponse';

const fetchMock = async () => ({
  json: () => ({
    city: { name: 'Edinburgh', country: 'United Kingdom' },
    list: [{}]
  })
});

describe('Application', () => {
  let wrapper;

  beforeEach(() => {
    global.fetch = fetchMock;
    wrapper = shallow(<Application />);
  });

  it('should render SearchBox component on initial render', () => {
    const searchBox = wrapper.find('SearchBox');
    expect(searchBox.length).toEqual(1);
  });

  it('should not render ErrorMessage or city name on initial render', () => {
    const errorMessage = wrapper.find('ErrorMessage');
    expect(errorMessage.exists()).toBe(false);

    const cityAndCountryTitle = wrapper.find(
      '.Application__cityAndCountryTitle'
    );
    expect(cityAndCountryTitle.exists()).toBe(false);
  });

  it('should show ErrorMessage with specified message when state is set', () => {
    wrapper.setState({
      errorMessage: 'Test error message',
      showError: true
    });

    const errorMessage = wrapper.find('ErrorMessage');
    expect(errorMessage.length).toEqual(1);
    expect(errorMessage.prop('message')).toEqual('Test error message');
  });

  it('should show WeatherForNext5Days when serverResponse is set in state', () => {
    wrapper.setState({
      serverResponse: simplifiedMockResponse
    });

    const weatherForNext5Days = wrapper.find('WeatherForNext5Days');
    expect(weatherForNext5Days.length).toEqual(1);
  });
});
