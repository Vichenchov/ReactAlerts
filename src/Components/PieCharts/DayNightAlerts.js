import classes from "./DayNightAlerts.module.css";

import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { SearchContext } from "../../Store/search/search-context";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";
import { useMediaQuery } from "react-responsive";

import { API } from '../../urls'

let ifSmallScreen = false;

const RADIAN = Math.PI / 180;
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className={classes.timeText}
        fill={fill}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 5}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {ifSmallScreen && (
        <>
          <text
            x={cx}
            y={40}
            dy={8}
            textAnchor="middle"
            className={classes.timeText}
            fill={fill}
          >
            {payload.value} : התרעות
          </text>
          <text
            x={cx}
            y={75}
            dy={8}
            textAnchor="middle"
            className={classes.timeText}
            fill={fill}
          >
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </>
      )}

      {!ifSmallScreen && (
        <>
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >
            {`${value}`}
          </text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </>
      )}
    </g>
  );
};

const DayNightAlerts = (props) => {
  const { TitleName } = props;
  let { searchValue } = useContext(SearchContext);

  const isSmallSize = useMediaQuery({ maxWidth: 1145 });

  ifSmallScreen = isSmallSize;

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const [color, setColor] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    {
      name: "00:00 - 06:00",
      value: 0,
    },
    {
      name: "06:00 - 12:00",
      value: 0,
    },
    {
      name: "12:00 - 18:00",
      value: 0,
    },
    {
      name: "18:00 - 00:00",
      value: 0,
    }
  );

  useEffect(() => {
    setLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));
    const fetchData = async () => {
      try {
        let url = `${API.DATA}/Alerts/ישראל/quarters`;
        if (searchValue)
          url = `${API.DATA}/Alerts/${searchValue}/quarters`;
        const response = await fetch(url);
        const alerts = await response.json();
        const newData = [
          {
            name: "00:00 - 06:00",
            value: alerts.am1,
          },
          {
            name: "06:00 - 12:00",
            value: alerts.am2,
          },
          {
            name: "12:00 - 18:00",
            value: alerts.pm1,
          },
          {
            name: "18:00 - 00:00",
            value: alerts.pm2,
          },
        ];
        setData(newData);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue]);

  return (
    <>
      <div className="graph" id={classes.graph}>
        <h3 className="graphTitle">
          {isSmallSize && (
            <>
              <Tooltip title="עבור על היקף העיגול">
                <FontAwesomeIcon
                  icon="fa-regular fa-hand"
                  fade
                  size="xs"
                  className={classes.icon}
                />
              </Tooltip>
            </>
          )}
          {TitleName}
        </h3>
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
                  <PieChart width={350} height={300}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      fill={color}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                  </PieChart>
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

export default DayNightAlerts;
