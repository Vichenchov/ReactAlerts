import { useState } from "react";
import classes from "./search.module.css";

const Data = [
  { id: 1, name: "חולון" },
  { id: 2, name: "תל אביב" },
  { id: 3, name: "בת ים" },
];

const searchFilter = (searchValue, list, searchBy = 'name') => {
  let lowerCaseQuery = searchValue.toLowerCase();
  let filteredList = searchValue
    ? list.filter(x => x[searchBy].toLowerCase().includes(lowerCaseQuery))
    : list;
  return filteredList;
};

const Search = (props) => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    setValue(currentValue);
    currentValue ? setVisible(true) : setVisible(false);
  };

  const selectItem = (city) => {
    setValue(city);
    setSelectedItem(city);
    setVisible(false);
  };

  return (
    <div className={classes.container}>
      <form className={classes.search}>
        <input
          type="text"
          placeholder="...חפש את הישוב שלך"
          value={value}
          onChange={handleChange}
        />
        <button>חיפוש</button>
      </form>
      <div className={classes.dropdown + `${visible ? 'v' : ''}`}>
        {visible && (
          <ul>
            {Data &&
              searchFilter(value, Data).map((city) => (
                <li
                  key={city.id}
                  onClick={() => selectItem(city.name)}
                  className={classes.dropdownItem}
                > 
                 {city.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
