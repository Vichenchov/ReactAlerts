import classes from "./AlertsPerDayChart.module.css";

import { useContext, useEffect, useState, PureComponent } from "react";
import { SearchContext } from "../../Store/search/search-context";
import { ThreeDots } from "react-loader-spinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.customTooltip}>
        <p className="label">{`תאריך : ${label}`}</p>
        <p className="label">{`כמות התראות : ${payload[0].value}`}</p>
        <p className="desc">{`כמות התראות ביום : ${payload[0].payload.amCount}`}</p>
        <p className="desc">{`כמות התראות בלילה :${payload[0].payload.pmCount}`}</p>
      </div>
    );
  }

  return null;
};

const AlertsPerDayChart = (props) => {
  const { TitleName, Xlabel, Ylabel, DataKeyX, DataKeyY, TooltipLabel } = props;

  let { searchValue } = useContext(SearchContext);

  const [alertsByDayData, setAlertsByDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/Alerts/ישראל/byDay`;
        if (searchValue)
          url = `http://localhost:3001/Alerts/${searchValue}/byDay`;
        const response = await fetch(url);
        const data = await response.json();
        setAlertsByDayData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    if(alertsByDayData) setIsLoading(false)
  }, [searchValue]);

  return (
    <BarChart
      width={500}
      height={300}
      data={alertsByDayData}
    //   margin={{
    //     top: 5,
    //     right: 30,
    //     left: 20,
    //     bottom: 5,
    //   }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="total"/>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="total" barSize={20} fill={color} />
    </BarChart>
  );
};

export default AlertsPerDayChart;
