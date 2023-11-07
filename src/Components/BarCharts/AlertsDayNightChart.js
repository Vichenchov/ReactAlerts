import classes from "./AlertsPerDayChart.module.css";

import { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "../../Store/alertsPerDay/alertsperday-context";
import { ThreeDots } from "react-loader-spinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  Legend,
} from "recharts";

const AlertsDayNightChart = (props) => {
  const { TitleName, Xlabel, Ylabel, DataKeyX, DataKeyY } = props;

  let alertsByDayData = useContext(alertsPerDayContext);

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    if (alertsByDayData) setIsLoading(false);
  }, [alertsByDayData]);

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
        <div className="graph">
          <h3 className="graphTitle"> {TitleName} </h3>
          <BarChart
            width={700}
            height={350}
            data={alertsByDayData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={DataKeyX} />
            <YAxis
              label={{
                value: Ylabel,
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip labelStyle={{ direction: 'ltr' }}/>
            <Legend />
            <Bar
              dataKey="countAM"
              name="AM"
              fill="gray"
              barSize={40}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="countPM"
              name="PM"
              fill={color}
              barSize={40}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </div>
      )}
    </>
  );
};

export default AlertsDayNightChart;
