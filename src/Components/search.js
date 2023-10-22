import { useState } from "react";
import classes from "./Search.module.css";

const Data = [
  { id: 1, name: "חולון" },
  { id: 2, name: "תל אביב" },
  { id: 3, name: "תל אביב" },
  { id: 4, name: "תל אביב" },
  { id: 5, name: "תל אביב" },
  { id: 6, name: "תל אביב" },
  { id: 7, name: "בת ים" },
  { id: 8, name: "תל חי" },
  { id: 9, name: "תל אביב" }
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
    setSelectedItem(null);
    const currentValue = event.target.value;
    setValue(currentValue);
    currentValue ? setVisible(true) : setVisible(false);
  };

  const selectItem = (city) => {
    setValue(city);
    setSelectedItem(city);
    setVisible(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (selectedItem) {
      //send data to the server
      console.log(selectedItem);
    } else {
      window.alert('יש לבחור עיר מהרשימה');
      console.log(selectedItem);
    }
  }

  return (
    <div className={classes.container}>
      <form className={classes.search}>
        <div className={classes.resultes}>
          <input
            type="text"
            placeholder="חפש את הישוב שלך..."
            value={value}
            onChange={handleChange}
          />
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
        <button onClick={submit}>חיפוש</button>
      </form>
    </div>
  );
};

export default Search;
