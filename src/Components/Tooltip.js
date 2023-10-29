import classes from './Tooltip.module.css';

import AlertsHourList from './AlertsHourList';

function Tooltip(props) {
  const { text, children, hours } = props;
  return (
    <div className={classes.tooltip}>

      {children}
      <span className={classes.tooltiptext}>{text}</span>
    </div>
  );
}

export default Tooltip;