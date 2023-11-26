import classes from "./AlertsPerDayChart.module.css";

import { useContext, useEffect, useState } from "react";
import { alertsPerDayContext } from "../../Store/alertsPerDay/alertsperday-context";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertsPerDayChart = (props) => {
  const { TitleName, Xlabel, Ylabel, DataKeyX, DataKeyY, TooltipLabel } = props;

  const { alertsByDayData, alertsByDayDataError } =
    useContext(alertsPerDayContext);

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [err, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    if (alertsByDayDataError) {
      setError(true);
      setLoading(false);
    }
    if (alertsByDayData) setLoading(false)
  }, [alertsByDayData, alertsByDayDataError]);

  return (
    <>
      <div className="graph" id={classes.graph}>
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
            <h3 className="graphTitle"> {TitleName} </h3>
            {!err ? (
              <ResponsiveContainer>
                <BarChart
                  width={800}
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
                  <XAxis
                    dataKey={DataKeyX}
                    label={{
                      value: Xlabel,
                      position: "bottom",
                      offset: 0,
                    }}
                  />{" "}
                  <YAxis
                    dataKey={DataKeyY}
                    label={{
                      value: Ylabel,
                      angle: -90,
                      position: "insideLeft",
                      textAnchor: "middle",
                    }}
                  />{" "}
                  <Tooltip
                    labelStyle={{
                      direction: "rtl",
                    }}
                  />{" "}
                  <Bar
                    dataKey="total"
                    name={TooltipLabel}
                    barSize={20}
                    fill={color}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <h2 className="err">
                <FontAwesomeIcon
                  icon="fa-regular fa-face-frown"
                  bounce
                  size="sm"
                />{" "}
                שגיאה בקבלת הנתונים
              </h2>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AlertsPerDayChart;
