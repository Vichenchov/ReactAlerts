import React, { useState } from 'react';
import { SearchContext } from './search-context';

const SearchContextProvider = (props) => {
    const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;