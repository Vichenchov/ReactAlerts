exports.getAmountOfAlerts = (alerts) => {
  let count = 0
  alerts.forEach((alert) => {
    count += alert.count
  })
  return count
}

exports.goodHour = (alertsByHours) => {
  const minVal = getMinOrMaxValue(alertsByHours, 'min')
  const finalArray = getHoursWithSameVal(alertsByHours, minVal)
  return finalArray
}

exports.badHour = (alertsByHours) => {
  const maxVal = getMinOrMaxValue(alertsByHours, 'max')
  const finalArray = getHoursWithSameVal(alertsByHours, maxVal)
  return finalArray
}

const getMinOrMaxValue = (array, type) => {
  let minOrmaxVal = array[0].count
  for (let i = 1; i < array.length; i++) {
    if (type == 'min') {
      if (array[i].count < minOrmaxVal) minOrmaxVal = array[i].count
    }
    if (type == 'max') {
      if (array[i].count > minOrmaxVal) minOrmaxVal = array[i].count
    }
  }
  return minOrmaxVal
}

const getHoursWithSameVal = (array, val) => {
  const newArray = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].count == val) newArray.push(array[i].time)
  }
  return newArray
}
