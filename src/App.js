import "./App.css";

import SearchContextProvider from "./Store/search/searchProvidor";
import MinDataProvider from "./Store/minutesData/minDataProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";
import AlertsPerDayProvider from "./Store/alertsPerDay/alertsPerDayProvider";
import Search from "./Components/Search/Search";
import BasicData from "./Components/BasicData/BasicData";
import HoursLineGraph from "./Components/LineGraphs/HoursLineGraph";
import MinutesLineGraph from "./Components/LineGraphs/MinutesLineGraph";
import AlertsPerDayChart from "./Components/BarCharts/AlertsPerDayChart";
import AlertsDayNightChart from "./Components/BarCharts/AlertsDayNightChart";

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
            <AlertsPerDayProvider>
              <label className="startDate"> המידע מה - 17 / 10 </label>{" "}
              <Search />
              <BasicData />
              <AlertsPerDayChart
                TitleName={"כמות התראות לפי ימים"}
                Xlabel={"תאריך"}
                Ylabel={"כמות התראות"}
                DataKeyX={"date"}
              />{" "}
              <div className="graphs">
                <AlertsDayNightChart
                  TitleName={"התראות - יום ולילה"}
                  Xlabel={"תאריך"}
                  Ylabel={"כמות התראות"}
                  DataKeyX={"date"}
                  DataKeyY={"total"}
                />{" "}
                {/* לשים כאן את הכרף עוגה */}{" "}
              </div>{" "}
              <div className="graphs">
                <HoursLineGraph
                  TitleName={"כמות התראות לפי שעות"}
                  Xlabel={"טווח שעות"}
                  Ylabel={"כמות התראות"}
                  DataKeyX={"time"}
                  DataKeyY={"count"}
                  TooltipLabel={"כמות התראות"}
                />{" "}
                <MinutesLineGraph
                  TitleName={"כמות התראות לפי דקות"}
                  Xlabel={"דקה בשעה עגולה"}
                  Ylabel={"כמות התראות"}
                  DataKeyX={"time"}
                  DataKeyY={"count"}
                  TooltipLabel={"כמות התראות"}
                />{" "}
              </div>{" "}
            </AlertsPerDayProvider>{" "}
          </MinDataProvider>{" "}
        </CityDataProvider>{" "}
      </SearchContextProvider>{" "}
    </div>
  );
}

export default App;
