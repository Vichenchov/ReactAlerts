import React, { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "./alertsperday-context";
import { SearchContext } from "../search/search-context";

const AlertsPerDayProvider = ({ children }) => {
  const { searchValue } = useContext(SearchContext);
  const [alertsByDayData, setAlertsByDayData] = useState(null);
  const [alertsByDayDataError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            let url = `http://localhost:3001/Alerts/ישראל/byDay`;
            if (searchValue)
              url = `http://localhost:3001/Alerts/${searchValue}/byDay`;
            const response = await fetch(url);
            const data = await response.json();
            setAlertsByDayData(data);
          } catch (error) {
            setError(true);
          }
        };
        fetchData();
  }, [searchValue]);

  return (
    <alertsPerDayContext.Provider value={{alertsByDayData, alertsByDayDataError}}>
      {children}
    </alertsPerDayContext.Provider>
  );
};

export default AlertsPerDayProvider;
