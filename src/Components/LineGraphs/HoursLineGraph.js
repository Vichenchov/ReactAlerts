import classes from "./LineGraph.module.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useContext, useEffect, useState } from "react";
import { CityDataContext } from "../../Store/citydata/citydata-context";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HoursLineGraph = (props) => {
  const { TitleName, Xlabel, Ylabel, DataKeyX, DataKeyY, TooltipLabel } = props;

  const { cityDataVal, cityDataValError } = useContext(CityDataContext);

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [err, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));
    if (cityDataValError) {
      setError(true);
      setLoading(false);
    }
    if (cityDataVal) setLoading(false);
  }, [cityDataVal, cityDataValError]);

  return (
    <>
      <div className="graph" id={classes.graph}>
      <h3 className="graphTitle"> {TitleName} </h3>
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
            {!err ? (
              <>
                <ResponsiveContainer>
                  <LineChart
                    width={650}
                    height={350}
                    data={cityDataVal}
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
                      scale="band"
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
                    <Tooltip labelStyle={{ direction: "rtl" }} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name={TooltipLabel}
                      stroke={color}
                      activeDot={{
                        r: 8,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
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

export default HoursLineGraph;
