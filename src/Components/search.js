import { useContext, useEffect, useState } from "react";
import classes from "./Search.module.css";

import { SearchContext } from "../Context/SearchContext";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [selectedIndex, setSelectedIndex] = useState(-1); // Index of the selected item

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { setSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);


  const [results, setResults] = useState(null); // Your search results
  const [error, setError] = useState(null);

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
    setSelectedIndex(-1);
    setSelectedItem(null);
    const currentValue = event.target.value;
    setValue(currentValue);
    currentValue ? setVisible(true) : setVisible(false);
    const filtered = data.filter((item) =>
      item.includes(currentValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelection = (city) => {
    setValue(city);
    setSelectedItem(city);
    setSearchValue(city);
    setVisible(false);
    console.log('Selected:', selectedItem);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      handleSelection(filteredData[selectedIndex]);
    }
  };

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
      <form className={classes.search}>
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
                      style={index === selectedIndex ? { background: '#f0f0f0' } : {}}
                      key={index}
                      onClick={() => handleSelection(city)}
                      className={classes.dropdownItem}
                    >
                      {city}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        {/* <button type="submit">חיפוש</button> */}
      </form>
    </div>
  );
};

export default Search;
