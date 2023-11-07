import classes from "./Avg.module.css";

import { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "../../Store/alertsPerDay/alertsperday-context";

const countAvg = (alerts) => {
  let sum = 0;
  alerts.forEach((alert) => {
    sum += alert.total;
  });
  return (sum / alerts.length).toFixed(1);
};

const Avg = () => {
  let alertsByDayData = useContext(alertsPerDayContext);

  const [avg, setAvg] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (alertsByDayData) {
      setIsLoading(false);
      const calcAVG = countAvg(alertsByDayData);
      setAvg(calcAVG);
    }
  }, [alertsByDayData]);

  return (
    <div className={classes.container}>
      <h3>ממוצע התרעות יומי</h3>
      <h1>{avg}</h1>
    </div>
  );
};

export default Avg;
