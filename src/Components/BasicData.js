import classes from './BasicData.module.css'

const BasicData = () => {
  return (
    <div className={classes.container}>
      <div className={classes.first}>
        <div>
          <h4>אזור</h4>
          <label>חולון</label>
        </div>
        <div>
          <h4>הזמן הגרוע</h4>
          <label>00:00</label>
        </div>
      </div>
      <div className={classes.second}>
        <div>
          <h4>הזמן הטוב</h4>
          <label>17:00</label>
        </div>
        <div>
          <h4>כמות התראות צבע אדום</h4>
          <label>87</label>
        </div>
      </div>
    </div>
  )
}

export default BasicData
