import classes from './AlertsHourList.module.css'

const AlertsHourList = (props) => {
  const { hours } = props
  console.log(hours);
  return (
    <div className={classes.container}>
      <ul className={classes.ul}>  
        {hours && hours.map((h, index) => (
          <li className={classes.item}
            key={index}
          >{h}</li>
        ))}{}
      </ul>
    </div>
  )
}

export default AlertsHourList
