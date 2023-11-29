import cls from "./AlertsTable.module.css";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThreeDots } from "react-loader-spinner";

import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../Store/search/search-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertsTable = (props) => {
  const { TitleName } = props;
  const { searchValue } = useContext(SearchContext);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [err, setError] = useState(false);

  useEffect(() => {
    const root = document.querySelector(":root");
    const styles = getComputedStyle(root);
    setColor(styles.getPropertyValue("--main-color"));

    setLoading(true);
    
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/Alerts/ישראל/last24`;
        if (searchValue)
          url = `http://localhost:3001/Alerts/${searchValue}/last24`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const alerts = await response.json();
        setRows(alerts);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [searchValue]);

  return (
    <>
      <div className="graph" id={cls.graph}>
        <h3 className="graphTitle">
          {TitleName} ({rows.length}){" "}
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
                <div className={rows.length !== 0 ? cls.tableClass : ""}>
                  {rows.length === 0 && (
                    <h3 className={cls.noAlerts}>ללא התראות בזמן האחרון</h3>
                  )}
                  {rows.length > 0 && (
                    <TableContainer
                    style={{overflowX: 'hidden' }}
                    className={cls.scrollbar}
                    id={cls.scrollbar}
                      component={Paper}
                      sx={{ width: "100%", maxHeight: "20rem" }}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        className={cls.tbl}
                      >
                        <TableHead>
                          <TableRow className={cls.tableHead}>
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
                              className={cls.tableRow}
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell id={cls.tblCell} align="right">
                                {row.time.date}
                              </TableCell>
                              <TableCell id={cls.tblCell} align="right">
                                {row.time.hour}
                              </TableCell>
                              <TableCell id={cls.tblCell} align="right">
                                {row.city}{" "}
                              </TableCell>
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

export default AlertsTable;
