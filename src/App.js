import "./App.css";

import SearchContextProvider from "./Store/search/searchProvidor";
import MinDataProvider from "./Store/minutesData/minDataProvidor";
import CityDataProvider from "./Store/citydata/cityDataProvider";
import AlertsPerDayProvider from "./Store/alertsPerDay/alertsPerDayProvider";
import BasicData from "./Components/BasicData/BasicData";
import HoursLineGraph from "./Components/LineGraphs/HoursLineGraph";
import MinutesLineGraph from "./Components/LineGraphs/MinutesLineGraph";
import AlertsPerDayChart from "./Components/BarCharts/AlertsPerDayChart";
import AlertsDayNightChart from "./Components/BarCharts/AlertsDayNightChart";
import DayNightAlerts from "./Components/PieCharts/DayNightAlerts";
import AlertsTable from "./Components/Tables/AlertsTable";
import Navbar from "./Components/NavBar/Navbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

library.add(fas, fab, far);

function App() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    setTimeout(() => {
      setLoading(false);
    }, 2222);
  }, []);

  const linkedinProfileUrl =
    "https://www.linkedin.com/in/max-viventsov-b58754206";

  const handleHover = (event) => {
    event.target.style.color = "#005885";
  };

  const handleMouseOut = (event) => {
    event.target.style.color = "#0077b5";
  };

  const handleClick = () => {
    window.location.href = linkedinProfileUrl;
  };

  return (
    <SearchContextProvider>
      <CityDataProvider>
        <MinDataProvider>
          <AlertsPerDayProvider>
            <>
              {loading ? (
                <div className="threeDots">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color={color}
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : (
                <div className="main">
                  <Navbar />

                  <div className="data">
                    <BasicData />

                    <div className="row">
                      <AlertsPerDayChart
                        TitleName={"כמות התרעות לפי ימים"}
                        Xlabel={"תאריך"}
                        Ylabel={"כמות התרעות"}
                        TooltipLabel={'סה"כ ההתרעות ביממה'}
                        DataKeyX={"date"}
                      />
                      <AlertsTable TitleName={"התראות ב24 שעות האחרונות"} />
                    </div>

                    <div className="row">
                      <DayNightAlerts TitleName={"התראות לפי זמנים ביממה"} />
                      <AlertsDayNightChart
                        TitleName={"התרעות - יום ולילה"}
                        Xlabel={"תאריך"}
                        Ylabel={"כמות התרעות"}
                        DataKeyX={"date"}
                        DataKeyY={"total"}
                      />
                    </div>

                    <div className="row">
                      <HoursLineGraph
                        TitleName={"כמות התרעות לפי שעות"}
                        Xlabel={"טווח שעות"}
                        Ylabel={"כמות התרעות"}
                        DataKeyX={"time"}
                        DataKeyY={"count"}
                        TooltipLabel={"כמות התרעות"}
                      />
                      <MinutesLineGraph
                        TitleName={"כמות התרעות לפי דקות"}
                        Xlabel={"דקה בשעה עגולה"}
                        Ylabel={"כמות התרעות"}
                        DataKeyX={"time"}
                        DataKeyY={"count"}
                        TooltipLabel={"כמות התרעות"}
                      />
                    </div>
                  </div>

                  <div className="notes">
                    <label>המידע מה 17.10</label>
                    <label>נבנה ע"י מקס ויבנצוב</label>
                    <div
                      className="linkedin-btn"
                      onClick={handleClick}
                      onMouseOver={handleHover}
                      onMouseOut={handleMouseOut}
                    >
                      <FontAwesomeIcon icon="fa-brands fa-linkedin" size="sm" />
                    </div>
                  </div>
                </div>
              )}
            </>
          </AlertsPerDayProvider>
        </MinDataProvider>
      </CityDataProvider>
    </SearchContextProvider>
  );
}

export default App;
