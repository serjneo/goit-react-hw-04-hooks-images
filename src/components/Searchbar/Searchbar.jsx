import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.scss';

function Searchbar({onSubmit}) {
  const [text, setText] = useState('');
    
  const handleTextChange = e => {
    setText(e.target.value.toLowerCase());
    };
    
  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === '') {
        toast.error('Enter text');
        return;
    }
    onSubmit(text);
    setText('');
  };

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className= "SearchForm-button">
            <span className= "SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={handleTextChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;