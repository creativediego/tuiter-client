import React from 'react';

/**
 * Search box with dynamic state as the user types. Input state is maintained by the parent component, which uses it to dispatch an action.
 * @param {string} searchValue the input value of the search box
 * @param {Function} setInputValue sets the searchValue state
 */
const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className='ttr-search position-relative'>
      {/* <i className='fas fa-search position-absolute'></i> */}
      <input
        className='bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5'
        placeholder='Search for users'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
