import classes from "./Tooltip.module.css";

function Tooltip(props) {
  const { title, children, content } = props;
  return (
    <div className={classes.tooltip}>
      {children}
      <span className={classes.tooltiptext}>
        <div className={classes.title}>{title}</div>
        {content}
      </span>
    </div>
  );
}

export default Tooltip;
