import "./App.css";

import Search from "./Components/Search";
import AlertsGraph from "./Components/AlertsGraph";
import BasicData from "./Components/BasicData";
import SearchContextProvider from "./Store/search/searchProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";

function App() {
  
  return (
    <div className="main">
      <SearchContextProvider>
        <CityDataProvider>
          <Search />
          <BasicData />
          <AlertsGraph />
        </CityDataProvider>
      </SearchContextProvider>
    </div>
  );
}

export default App;
