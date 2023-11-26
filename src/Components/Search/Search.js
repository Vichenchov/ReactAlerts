import { useContext, useEffect, useState } from "react";
import classes from "./Search.module.css";

import { SearchContext } from "../../Store/search/search-context";

function filterListInOrder(searchValue, list) {
  let resultStartsWith = [];
  let resultContains = [];

  for (let item of list) {
    if (item.startsWith(searchValue)) {
      resultStartsWith.push(item);
    } else if (item.includes(searchValue)) {
      resultContains.push(item);
    }
  }
  return resultStartsWith.concat(resultContains);
}

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);

  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [selectedIndex, setSelectedIndex] = useState(-1); // Index of the selected item
  const [visible, setVisible] = useState(false);
  const [disableSearch, setDisableSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        event.target.blur(); // Remove focus from the active element - remove the bright boder from the search input if the user clicked Enter or
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/Alerts/cities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(["ישראל", ...result]);
        setFilteredData(["ישראל", ...result]);
      } catch (error) {
        console.log(123);
        setDisableSearch(true);
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    if (error) {
      window.alert("שגיאה בקבלת רשימת הערים");
    }
    const currentValue = event.target.value;
    setSelectedIndex(-1);
    setSelectedItem(null);
    setValue(currentValue);
    const filtered = filterListInOrder(currentValue, data);
    if(currentValue.length !== 0){
      setVisible(true);
      filtered.length > 0 && filtered.length !== data.length
        ? setFilteredData(filtered)
        : setFilteredData(['האזור לא נמצא',...filtered])
    }else{
      setVisible(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleResultClick(filteredData[selectedIndex]);
    }
  };

  const handleResultClick = (city) => {
    setValue(city);
    setSelectedItem(city);
    setSearchValue(city);
    setVisible(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedItem) {
      setSearchValue(selectedItem);
    } else {
      window.alert(
        "יש לבחור עיר מהרשימה\nבמידה ובישובך לא נשמעה אזעקה מעולם, הישוב לא יוצג"
      );
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleFormSubmit} className={classes.search}>
        <div className={classes.resultes}>
          <input
            className={classes.searchInput}
            disabled={disableSearch}
            type="text"
            placeholder={
              disableSearch ? "שגיאה בקבלת רשימת הערים" : "יש לבחור אזור מהרשימה"
            }
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div>
            {visible && (
              <ul className={classes.ulCities}>
                {data &&
                  filteredData.map((city, index) => (
                    <li
                      style={
                        index === selectedIndex
                          ? {
                              background: "#f0f0f0",
                            }
                          : {}
                      }
                      key={index}
                      onClick={() => handleResultClick(city)}
                      className={classes.dropdownItem}
                    >
                      <span className={classes.item}> {city} </span>{" "}
                    </li>
                  ))}
              </ul>
            )}
          </div>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
};

export default Search;
