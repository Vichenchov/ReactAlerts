import { useContext, useEffect, useState } from 'react'
import classes from './BasicData.module.css'
import { SearchContext } from '../Store/search/search-context'
import { CityDataContext } from '../Store/citydata/citydata-context'
import { ThreeDots } from 'react-loader-spinner'
import basicDataFunctions from '../AuxiliaryClasses/BasicDataFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AlertsHourList from './AlertsHourList'
import Tooltip from './Tooltip'

const BasicData = () => {
  const { searchValue } = useContext(SearchContext)
  const cityDataVal = useContext(CityDataContext)

  const [showTooltip, setShowTooltip] = useState(false)
  const [color, setColor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [goodTimeList, setGoodTimeList] = useState([])
  const [badTimeList, setBadTimeList] = useState([])
  const [data, setData] = useState({
    city: 'ישראל',
    badTime: '-',
    goodTime: '-',
    count: '-',
  })

  const handleMouseEnter = () => {
    console.log(1)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    console.log(2)
    setShowTooltip(false)
  }

  useEffect(() => {
    const root = document.querySelector(':root')
    const styles = getComputedStyle(root)
    setColor(styles.getPropertyValue('--main-color'))

    setIsLoading(true)

    if (cityDataVal) {
      let count = basicDataFunctions.getAmountOfAlerts(cityDataVal)
      let badTime = basicDataFunctions.badHour(cityDataVal)
      let goodTime = basicDataFunctions.goodHour(cityDataVal)
      setGoodTimeList(goodTime)
      setBadTimeList(badTime)
      setData({
        city: searchValue || 'ישראל',
        badTime: badTime[0].time,
        goodTime: goodTime[0],
        count: count,
      })
      setIsLoading(false)
    }
  }, [searchValue, cityDataVal])

  return (
    <>
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color={color}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.first}>
            <div>
              <h4>אזור</h4>
              <label>{data.city}</label>
            </div>
            <div className={classes.iconPlace1}>
              {badTimeList.length > 1 && (
                <FontAwesomeIcon
                  icon="fa-regular fa-hand"
                  fade
                  size="xs"
                  className={classes.handIcon1}
                />
              )}
              <h4>הזמן הגרוע</h4>
              <label>{data.badTime}</label>
            </div>
          </div>
          <div className={classes.second}>
            <div className={classes.iconPlace2}>
              <h4>
                {goodTimeList.length > 1 && (
                  <>
                    <Tooltip text='max' >
                      <FontAwesomeIcon
                        icon="fa-regular fa-hand"
                        fade
                        size="xs"
                        className={classes.handIcon2}
                      />
                    </Tooltip>
                  </>
                )}
                הזמן הטוב
              </h4>
              <label>{data.goodTime}</label>
            </div>
            <div>
              <h4>כמות התראות צבע אדום</h4>
              <label>{data.count}</label>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BasicData

{
  /* {goodTime.length > 1 && <span className="dot"></span>}הזמן הטוב */
}
