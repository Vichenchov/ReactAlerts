import './App.css'

import Search from './Components/Search'
import AlertsGraph from './Components/AlertsGraph'
import BasicData from './Components/BasicData'
import SearchContextProvider from './Store/search/searchProvidor'
import CityDataProvider from './Store/citydata/cityDataProvider'
import HoursGraph from './Components/HoursGraph'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far)

function App() {
  return (
    <div className="main">
      <SearchContextProvider>
        <CityDataProvider>
          <Search />
          <BasicData />
          <AlertsGraph />
          <HoursGraph/>
        </CityDataProvider>
      </SearchContextProvider>
    </div>
  )
}

export default App
