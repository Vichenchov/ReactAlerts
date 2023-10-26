import classes from './AlertsGraph.module.css'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../Context/SearchContext'
import { ThreeDots } from 'react-loader-spinner'

const AlertsGraph = (props) => {
  const { searchValue } = useContext(SearchContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [color, setColor] = useState('')

  useEffect(() => {
    setIsLoading(true)

    const root = document.querySelector(':root')
    const styles = getComputedStyle(root)
    setColor(styles.getPropertyValue('--main-color'))

    const loadData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Alerts`)
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Alerts/${searchValue}/byHour`,
        )
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    if (searchValue) {
      loadData()
    }
  }, [searchValue])

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
        <LineChart
          width={500}
          height={300}
          data={data}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="'התראות 'צבע אדום"
            stroke={color}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </>
  )
}

export default AlertsGraph
