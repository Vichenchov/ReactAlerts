import classes from "./Navbar.module.css";

import Search from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../Tooltip/Tooltip";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <Search />
      </div>
      <div className={classes.icon}>
        <Tooltip
          title={"Make Gaza Luna Park"}
          content={
            <FontAwesomeIcon icon="fa-solid fa-hand-middle-finger" beat size="lg" style={{color: "#ffffff",}} />
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
