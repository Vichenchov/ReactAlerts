exports.getAmountOfAlerts = (alerts) => {
  let count = 0;
  alerts.forEach((alert) => {
    count += alert.count;
  });
  return count;
};

exports.goodHour = (alertsByHours) => {
  const goodHours = [];
  let minimalCount = alertsByHours[0].count;
  for (let i = 1; i < alertsByHours.length; i++) {
    if (alertsByHours[i].count < minimalCount)
      minimalCount = alertsByHours[i].count;
  }
  for (let i = 0; i < alertsByHours.length; i++) {
    if (alertsByHours[i].count == minimalCount)
      goodHours.push(alertsByHours[i].time);
  }
  return goodHours;
};

exports.badHour = (alertsByHours) => {
  const badHours = [];
  let maxCount = alertsByHours[0].count;
  for (let i = 1; i < alertsByHours.length; i++) {
    if (alertsByHours[i].count > maxCount) maxCount = alertsByHours[i].count;
  }
  for (let i = 0; i < alertsByHours.length; i++) {
    if (alertsByHours[i].count == maxCount) badHours.push(alertsByHours[i]);
  }
  return badHours;
};