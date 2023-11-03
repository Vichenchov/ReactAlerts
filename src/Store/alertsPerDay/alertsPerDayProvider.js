import React, { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "./alertsperday-context";
import { SearchContext } from "../search/search-context";

const AlertsPerDayProvider = ({ children }) => {
  const { searchValue } = useContext(SearchContext);
  const [alertsByDayData, setAlertsByDayData] = useState(null);

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
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
  }, [searchValue]);

  return (
    <alertsPerDayContext.Provider value={alertsByDayData}>
      {children}
    </alertsPerDayContext.Provider>
  );
};

export default AlertsPerDayProvider;
