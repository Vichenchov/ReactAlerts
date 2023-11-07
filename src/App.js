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
import DayNightAlerts from "./Components/PieCharts/DayNightAlerts";
import AlertsTable from "./Components/Tables/AlertsTable";
import Avg from "./Components/Avg/Avg";

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
              <AlertsTable TitleName={"התראות ב24 שעות האחרונות"} />{" "}
              <div className="graphs">
              <AlertsPerDayChart
                TitleName={"כמות התרעות לפי ימים"}
                Xlabel={"תאריך"}
                Ylabel={"כמות התרעות"}
                TooltipLabel={'סה"כ ההתרעות ביממה'}
                DataKeyX={"date"}
              />
              <Avg/>
              </div>
              <div className="graphs">
                <AlertsDayNightChart
                  TitleName={"התרעות - יום ולילה"}
                  Xlabel={"תאריך"}
                  Ylabel={"כמות התרעות"}
                  DataKeyX={"date"}
                  DataKeyY={"total"}
                />{" "}
                <DayNightAlerts TitleName={"התראות לפי זמנים ביממה"} />{" "}
              </div>{" "}
              <div className="graphs">
                <HoursLineGraph
                  TitleName={"כמות התרעות לפי שעות"}
                  Xlabel={"טווח שעות"}
                  Ylabel={"כמות התרעות"}
                  DataKeyX={"time"}
                  DataKeyY={"count"}
                  TooltipLabel={"כמות התרעות"}
                />{" "}
                <MinutesLineGraph
                  TitleName={"כמות התרעות לפי דקות"}
                  Xlabel={"דקה בשעה עגולה"}
                  Ylabel={"כמות התרעות"}
                  DataKeyX={"time"}
                  DataKeyY={"count"}
                  TooltipLabel={"כמות התרעות"}
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
