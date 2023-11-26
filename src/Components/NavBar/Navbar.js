import classes from "./Navbar.module.css";

import Search from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../Tooltip/Tooltip";

const Navbar = () => {
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
