import React, { useContext, useEffect, useState } from "react";
import { minDataContext } from "./minData-context";
import { SearchContext } from "../search/search-context";

const MinDataProvider = ({ children }) => {
  const { searchValue } = useContext(SearchContext);
  const [minDataVal, setMinDataVal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/Alerts/ישראל/byMin`;
        if (searchValue)
          url = `http://localhost:3001/Alerts/${searchValue}/byMin`;
        const response = await fetch(url);
        const data = await response.json();
        setMinDataVal(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log(minDataVal);
  }, [searchValue]);

  return (
    <minDataContext.Provider value={minDataVal}>
      {children}
    </minDataContext.Provider>
  );
};

export default MinDataProvider;
