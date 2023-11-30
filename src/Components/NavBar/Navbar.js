import classes from "./Navbar.module.css";

import Search from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../Tooltip/Tooltip";
import { useEffect, useState } from "react";

import { API } from '../../urls'

const Navbar = () => {
  const [isConnectedToPikudHaoref, setIsConnectedToPikudHaoref] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API.PIKUD}/isErrorInAPI`);
        const ifConnected = await response.json();
        setIsConnectedToPikudHaoref(ifConnected);
      } catch (error) {
        setIsConnectedToPikudHaoref(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <Tooltip title={"!ביחד ננצח"}>
          <img
            src="https://cdn.dribbble.com/users/1592949/screenshots/3762984/israel.gif"
            alt="Israel flag"
            width="63"
            height="42"
          ></img>
        </Tooltip>
        <Search />
        {isConnectedToPikudHaoref && (
          <Tooltip
            title={"תקלה בקבלת המידע מפיקוד העורף"}
            content={"ייתכן כי המידע אינו עדכני"}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-tower-cell"
              fade
              size="sm"
              style={{ color: "#bfc1c4" }}
            />
          </Tooltip>
        )}
      </div>
      <div className={classes.icon}>
        <Tooltip
          title={"Make Gaza Luna Park"}
          content={
            <FontAwesomeIcon
              icon="fa-solid fa-hand-middle-finger"
              beat
              size="lg"
              style={{ color: "#ffffff" }}
            />
          }
        >
          <FontAwesomeIcon
            icon="fa-solid fa-bullhorn"
            size="xl"
            id={classes.iconColor}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
