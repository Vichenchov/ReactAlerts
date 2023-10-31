import "./App.css";

import Search from "./Components/Search";
import AlertsGraph from "./Components/AlertsGraph";
import BasicData from "./Components/BasicData";
import SearchContextProvider from "./Store/search/searchProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";
import HoursGraph from "./Components/HoursGraph";
import MinDataProvider from "./Store/minutesData/minDataProvidor";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab, far);

function App() {
  return (
    <div className="main">
      <SearchContextProvider>
        <CityDataProvider>
          <MinDataProvider>
            <label className="startDate"> המידע מה - 10.10 .23 </label>{" "}
            <Search />
            <BasicData />
            <div className="graphs">
              <AlertsGraph />
              <HoursGraph />
            </div>
          </MinDataProvider>
        </CityDataProvider>
      </SearchContextProvider>
    </div>
  );
}

export default App;
