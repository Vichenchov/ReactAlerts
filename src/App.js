import "./App.css";

import Search from "./Components/Search/Search";
import BasicData from "./Components/BasicData/BasicData";
import SearchContextProvider from "./Store/search/searchProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";
import HoursLineGraph from "./Components/LineGraphs/HoursLineGraph";
import MinDataProvider from "./Store/minutesData/minDataProvidor";
import MinutesLineGraph from "./Components/LineGraphs/MinutesLineGraph";
import AlertsPerDayChart from "./Components/BarCharts/AlertsPerDayChart";

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
            <label className="startDate"> המידע מה - 17 / 10 </label> <Search />
            <BasicData />
            <AlertsPerDayChart />
            <div className="graphs">
              <HoursLineGraph
                TitleName={"כמות התראות לפי שעה"}
                Xlabel={"טווח שעות"}
                Ylabel={"כמות התראות"}
                DataKeyX={"time"}
                DataKeyY={"count"}
                TooltipLabel={"כמות שיגורים"}
              />
              <MinutesLineGraph
                TitleName={"כמות התראות לפי דקות"}
                Xlabel={"דקה בשעה עגולה"}
                Ylabel={"כמות התראות"}
                DataKeyX={"time"}
                DataKeyY={"count"}
                TooltipLabel={"כמות שיגורים"}
              />
            </div>
          </MinDataProvider>
        </CityDataProvider>
      </SearchContextProvider>
    </div>
  );
}

export default App;
