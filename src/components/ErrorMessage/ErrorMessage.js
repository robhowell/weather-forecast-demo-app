import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => <p className="ErrorMessage">{message}</p>;

ErrorMessage.defaultProps = {
  message: 'An unknown error has occurred.'
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
