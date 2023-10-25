import { useContext, useEffect, useState } from "react";
import classes from "./Search.module.css";

import { SearchContext } from "../Context/SearchContext";

let i = 0;

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

const Search = (props) => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(-1); // Index of the selected item

  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search

  const { setSearchValue } = useContext(SearchContext);

  const [data, setData] = useState(null);
  const [results, setResults] = useState(null); // Your search results

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/Alerts/cities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedItem(null);
    const currentValue = event.target.value;
    setValue(currentValue);
    currentValue ? setVisible(true) : setVisible(false);
    setFilteredData(filterListInOrder(value, data));
  };

  const selectItem = (city) => {
    setValue(city);
    setSelectedItem(city);
    setVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      submit(filteredData[selectedIndex]);
      handleSelection(filteredData[selectedIndex]);
    }
  };

  const handleSelection = (selectedItem) => {
    // Logic to handle the selection from the dropdown
    console.log('Selected:', selectedItem);
  };

  // const dropDownData = (value, data) => {
  //   const newData = filterListInOrder(value, data);
  //   setResults(newData);
  //   return newData;
  // };

  const submit = (event) => {
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
      <form onSubmit={submit} className={classes.search}>
        <div className={classes.resultes}>
          <input
            type="text"
            placeholder="חפש את הישוב שלך..."
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className={classes.dropdown + `${visible ? "v" : ""}`}>
            {visible && (
              <ul>
                {data &&
                  filteredData.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => selectItem(city)}
                      className={classes.dropdownItem}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submit(city);
                        }
                      }}
                    >
                      {city}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <button type="submit">חיפוש</button>
      </form>
    </div>
  );
};

export default Search;
