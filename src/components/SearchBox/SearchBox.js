import PropTypes from 'prop-types';
import './SearchBox.scss';

const SearchBox = ({ onButtonClick, onTextChange, searchText }) => (
  <div className="SearchBox">
    <label className="SearchBox__title" htmlFor="SearchBox__text">Search for city: </label>

    <input
      className="SearchBox__text"
      id="SearchBox__text"
      onChange={onTextChange}
      value={searchText}
      type="text"
    />

    <button className="SearchBox_button" onClick={onButtonClick}>
      Search
    </button>
  </div>
);

SearchBox.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
};

export default SearchBox;
