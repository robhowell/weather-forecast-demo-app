import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render specified message', () => {
    const rendered = shallow(
      <ErrorMessage message="Sorry, the weather API is not responding" />
    );
    const expected = 'Sorry, the weather API is not responding';
    const actual = rendered.text();
    expect(actual).toEqual(expected);
  });

  it('should render default error if message is not specified', () => {
    const rendered = shallow(<ErrorMessage />);
    const expected = 'An unknown error has occurred.';
    const actual = rendered.text();
    expect(actual).toEqual(expected);
  });
});
