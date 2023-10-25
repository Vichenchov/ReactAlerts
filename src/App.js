import "./App.css";

import Search from "./Components/Search";
import AlertsGraph from "./Components/AlertsGraph";

import { SearchContext } from "./Context/SearchContext";
import { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="main">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Search />
        <AlertsGraph />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
