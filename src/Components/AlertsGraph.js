import classes from "./AlertsGraph.module.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useContext, useEffect, useState } from "react";
import { CityDataContext } from "../Store/citydata/citydata-context";
import { ThreeDots } from "react-loader-spinner";

const AlertsGraph = () => {
  const cityDataVal = useContext(CityDataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    setIsLoading(true);

    if (cityDataVal) setIsLoading(false);
  }, [cityDataVal]);

  return (
    <>
      {isLoading && (
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
      )}
      {!isLoading && (
        <LineChart
          width={500}
          height={300}
          data={cityDataVal}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="התראות צבע אדום"
            stroke={color}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      )}
    </>
  );
};

export default AlertsGraph;
