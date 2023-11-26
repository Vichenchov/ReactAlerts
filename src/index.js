import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import SearchContextProvider from "./Store/search/searchProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";
import AlertsPerDayProvider from "./Store/alertsPerDay/alertsPerDayProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <SearchContextProvider>
      <CityDataProvider>
        <AlertsPerDayProvider>
          <App />
        </AlertsPerDayProvider>
      </CityDataProvider>
    </SearchContextProvider>
);

reportWebVitals();
