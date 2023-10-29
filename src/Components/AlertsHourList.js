import classes from './AlertsHourList.module.css'

const AlertsHourList = (props) => {
  const { hours } = props
  return (
    <div>
      <ul>
        {hours.map((h, index) => (
          <li
            key={index}
          >{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default AlertsHourList
