import classes from "./BasicData.module.css";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../Store/search/search-context";
import { CityDataContext } from "../../Store/citydata/citydata-context";
import basicDataFunctions from "../../AuxiliaryClasses/BasicDataFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertsHourList from "../AlertsHoursList/AlertsHourList";
import Tooltip from "../Tooltip/Tooltip";
import { alertsPerDayContext } from "../../Store/alertsPerDay/alertsperday-context";
import { ThreeDots } from "react-loader-spinner";

const BasicData = () => {
  const { searchValue } = useContext(SearchContext);
  const { cityDataVal, cityDataValError } = useContext(CityDataContext);
  const { alertsByDayData, alertsByDayDataError } =
    useContext(alertsPerDayContext);

  const [goodTimeList, setGoodTimeList] = useState([]);
  const [badTimeList, setBadTimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [data, setData] = useState({
    city: "ישראל",
    badTime: "-",
    goodTime: "-",
    count: "-",
    avg: "-",
  });

  useEffect(() => {
    setLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    if (alertsByDayDataError || cityDataValError) {
      setData({
        city: "שגיאה בקבלת המידע",
        badTime: "?",
        goodTime: "?",
        count: "?",
        avg: "?",
      });
      setLoading(false);
    } else {
      if (cityDataVal && alertsByDayData) {
        let count = basicDataFunctions.getAmountOfAlerts(cityDataVal);
        let badTime = basicDataFunctions.badHour(cityDataVal);
        let goodTime = basicDataFunctions.goodHour(cityDataVal);
        let avg = basicDataFunctions.countAvg(alertsByDayData);
        setGoodTimeList(goodTime);
        setBadTimeList(badTime);
        setData({
          city: searchValue || "ישראל",
          badTime: badTime[0],
          goodTime: goodTime[0],
          count: count,
          avg: avg,
        });
        setLoading(false);
      }
    }
  }, [
    searchValue,
    cityDataVal,
    alertsByDayData,
    alertsByDayDataError,
    cityDataValError,
  ]);

  return (
    <>
      <div className="">
        <h1 className={classes.areaName}>{data.city}</h1>
        <div className={loading ? classes.containerLoading : classes.container}>
          {loading ? (
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
          ) : (
            <>
              <div className={classes.addPadding}>
                <h4>כמות התרעות צבע אדום</h4>
                <label>{data.count}</label>
              </div>
              <div className={classes.addPadding}>
                <h4>ממוצע התרעות יומי</h4>
                <label>{data.avg}</label>
              </div>
              <div className={classes.iconPlace2}>
                <h4>
                  {goodTimeList.length > 1 && (
                    <>
                      <Tooltip
                        title="שעות נוספות"
                        content={<AlertsHourList hours={goodTimeList} />}
                      >
                        <FontAwesomeIcon
                          icon="fa-regular fa-hand"
                          fade
                          size="xs"
                          className={classes.handIcon2}
                        />
                      </Tooltip>
                    </>
                  )}
                  הזמן הטוב
                </h4>
                <label>{data.goodTime}</label>
              </div>
              <div className={classes.iconPlace1}>
                <h4>
                  {badTimeList.length > 1 && (
                    <>
                      <Tooltip
                        title="שעות נוספות"
                        content={<AlertsHourList hours={badTimeList} />}
                      >
                        <FontAwesomeIcon
                          icon="fa-regular fa-hand"
                          fade
                          size="xs"
                          className={classes.handIcon1}
                        />
                      </Tooltip>
                    </>
                  )}
                  הזמן הגרוע
                </h4>
                <label>{data.badTime}</label>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BasicData;
