import React, { useContext, useEffect, useState } from "react";
import { CityDataContext } from "./citydata-context";
import { SearchContext } from "../search/search-context";

const CityDataProvider = ({ children }) => {
  const { searchValue } = useContext(SearchContext);
  const [cityDataVal, setCityDataVal] = useState(null);
  const [cityDataValError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:3001/Alerts";
        if (searchValue && searchValue !== "ישראל")
          url = `http://localhost:3001/Alerts/${searchValue}/byHour`;
        const response = await fetch(url);
        const data = await response.json();
        setCityDataVal(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [searchValue]);

  return (
    <CityDataContext.Provider value={{cityDataVal, cityDataValError}}>
      {children}
    </CityDataContext.Provider>
  );
};

export default CityDataProvider;
