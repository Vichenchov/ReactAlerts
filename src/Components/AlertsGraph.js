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
import { SearchContext } from "../Context/SearchContext";

const AlertsGraph = (props) => {
  const { searchValue } = useContext(SearchContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Alerts/${searchValue}/byHour`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (searchValue) {
      loadData();
    }
  }, [searchValue]);

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
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
        name="כמות שיגורים"
        stroke="#fc8387"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default AlertsGraph;
