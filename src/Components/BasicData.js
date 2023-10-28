import { useContext, useEffect, useState } from "react";
import classes from "./BasicData.module.css";
import { SearchContext } from "../Store/search/search-context";
import { CityDataContext } from "../Store/citydata/citydata-context";

const getAmountOfAlerts = (alerts) => {
  let count = 0;
  alerts.forEach((alert) => {
    count += alert.count;
  });
  return count;
};

const BasicData = () => {
  const { searchValue } = useContext(SearchContext);
  const cityDataVal = useContext(CityDataContext);

  const [data, setData] = useState({
    city: "ישראל",
    badTime: "-",
    goodTime: "-",
    count: "-",
  });
  const [count, setCount] = useState(0);
  const [goodTime, setGoodTime] = useState("-");
  const [badTime, setBadTime] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log(cityDataVal);
    // const loadData = async () => {
    if (cityDataVal) setCount(getAmountOfAlerts(cityDataVal));
    setData({
      city: searchValue || "ישראל",
      badTime: goodTime,
      goodTime: badTime,
      count: count,
    });

    setIsLoading(false);
    // };
    // loadData();
  }, [searchValue, cityDataVal]);

  return (
    <div className={classes.container}>
      <div className={classes.first}>
        <div>
          <h4>אזור</h4>
          <label>{data.city}</label>
        </div>
        <div>
          <h4>הזמן הגרוע</h4>
          <label>{data.badTime}</label>
        </div>
      </div>
      <div className={classes.second}>
        <div>
          <h4>הזמן הטוב</h4>
          <label>{data.goodTime}</label>
        </div>
        <div>
          <h4>כמות התראות צבע אדום</h4>
          <label>{data.count}</label>
        </div>
      </div>
    </div>
  );
};

export default BasicData;
