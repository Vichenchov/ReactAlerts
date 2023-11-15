import cls from "./AlertsTable.module.css";

import * as React from "react";
import Table from "@mui/material/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../Store/search/search-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const root = document.querySelector(":root");
const styles = getComputedStyle(root);
const headerColor = styles.getPropertyValue("--main-color");

const useStyles = makeStyles({
  tableHead: {
    "& .MuiTableCell-head": {
      color: headerColor,
      fontWeight: "bold",
      backgroundColor: "var(--graphs-background-color)",
    },
  },
});

const AlertsTable = (props) => {
  const { TitleName } = props;
  const { searchValue } = useContext(SearchContext);
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setLoading(true);
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
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue]);

  return (
    <>
      <div className="graph">
        <h3 className="graphTitle"> {TitleName} </h3>
        <div className={cls.tableClass}>
          {rows.length === 0 && (
            <h3 className={cls.noAlerts}>ללא התראות בזמן האחרון</h3>
          )}
          {rows.length > 0 && (
            <TableContainer
              component={Paper}
              sx={{ width: "100%", maxHeight: "20rem" }}
            >
              <Table stickyHeader aria-label="sticky table" className={cls.tbl}>
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell align="right">תאריך</TableCell>
                    <TableCell align="right">שעה</TableCell>
                    <TableCell align="right">אזור</TableCell>
                    <TableCell align="right">
                      <FontAwesomeIcon
                        icon="fa-solid fa-bullhorn"
                        flip="horizontal"
                        size="xs"
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell id={cls.tblCell} align="right">{row.time.date}</TableCell>
                      <TableCell id={cls.tblCell} align="right">{row.time.hour}</TableCell>
                      <TableCell id={cls.tblCell} align="right">{row.city} </TableCell>
                      <TableCell id={cls.tblCell} align="right">
                        <FontAwesomeIcon
                          icon="fa-solid fa-bullhorn"
                          flip="horizontal"
                          size="xs"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default AlertsTable;
