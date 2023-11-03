import classes from "./AlertsPerDayChart.module.css";

import { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "../../Store/alertsPerDay/alertsperday-context";
import { ThreeDots } from "react-loader-spinner";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.customTooltip}>
        <p className="label"> {`תאריך : ${label}`} </p>
        <p className="label"> {`כמות התראות : ${payload[0].value}`} </p>{" "}
        <p className="desc">
          {`כמות התראות ביום : ${payload[0].payload.countAM}`}
        </p>
        <p className="desc">
          {`כמות התראות בלילה :${payload[0].payload.countPM}`}
        </p>
      </div>
    );
  }

  return null;
};

const AlertsPerDayChart = (props) => {
  const { TitleName, Xlabel, Ylabel, DataKeyX, DataKeyY, TooltipLabel } = props;

  let alertsByDayData  = useContext(alertsPerDayContext);

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
            height={300}
            data={alertsByDayData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={DataKeyX}
              label={{
                value: Xlabel,
                position: "bottom",
                offset: 0,
              }}
            />
            <YAxis
              dataKey={DataKeyY}
              label={{
                value: Ylabel,
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="total"
              name={TooltipLabel}
              barSize={20}
              fill={color}
            />
          </BarChart>
        </div>
      )}
    </>
  );
};

export default AlertsPerDayChart;
