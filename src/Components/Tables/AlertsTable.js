import classes from "./AlertsTable.module.css";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../Store/search/search-context";

const timeFormat = (time) => {
  let dd = time.getDate();
  let mm = time.getMonth();
  let yy = time.getFullYear();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  return dd + "/" + mm + "/" + yy + "  " + min + " : " + sec;
};

const AlertsTable = (props) => {
  const { TitleName } = props;
  const { searchValue } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/Alerts/ישראל/last24`;
        if (searchValue)
          url = `http://localhost:3001/Alerts/${searchValue}/last24`;
        const response = await fetch(url);
        const alerts = await response.json();
        setRows(alerts);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {}
    };
    fetchData();
  }, [searchValue]);

  return (
    <div className="graph">
      <h3 className="graphTitle"> {TitleName} </h3>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxHeight: "20rem" }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">תאריך</TableCell>
              <TableCell align="right">שעה</TableCell>
              <TableCell align="right">אזור</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
              hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.time.date}</TableCell>
                <TableCell align="right">{row.time.hour}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AlertsTable;
