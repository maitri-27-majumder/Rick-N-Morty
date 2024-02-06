import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfCharacter, setListOfCharacter] = useState([]);
  const [filterList, setFilterList] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("status");
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://rickandmortyapi.com/api/character");
    const json = await data.json();
    setListOfCharacter(json?.results);
  };

  //filter is based on 3 condition - searchtext , seslected filters or when both of them exists .
  // we filter the listofcharacters by iterating every character and checking for the conditions that atleast one values in the character matches an element in the selected filters array
  useEffect(() => {
    if (searchText || selectedFilters.length > 0) {
      let filteredCharacter = listOfCharacter;
      if (selectedFilters.length > 0) {
        filteredCharacter = listOfCharacter.filter((character) => {
          return selectedFilters.every((item) =>
            Object.values(character).some((i) => i === item || i?.name === item)
          );
        });
      }

      if (searchText) {
        filteredCharacter = filteredCharacter.filter((character) =>
          character.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      setFilterList(filteredCharacter);
    } else {
      setFilterList(null);
    }
  }, [searchText, selectedFilters]);

  // we extract a unique list of filter options by iterating each character from listofcharacter
  useEffect(() => {
    if (filterType) {
      setFilterOptions([
        ...new Set(
          listOfCharacter.map((character) => {
            if (filterType === "location") return character.location.name;
            else return character[filterType];
          })
        ),
      ]);
    }
  }, [filterType, listOfCharacter]);

  useEffect(() => {}, [selectedFilters]);

  const renderList = (list) => {
    return list.map((character) => (
      <Link key={character.id} to={"/character/" + character.id}>
        <CharacterCard chData={character} />
      </Link>
    ));
  };

  return (
    <div className="body">
      <div className="filter">
        <div>
          <label for="filterType" className="filter-category">
            Filter by
          </label>
          <select
            name="filterType"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            {["Status", "Location", "Gender", "Species", "Type"].map((opt) => (
              <option value={opt.toLowerCase()}>{opt}</option>
            ))}
          </select>
          {filterOptions && (
            <select
              value={"select"}
              onChange={(e) => {
                if (selectedFilters !== "select")
                  setSelectedFilters([...selectedFilters, e.target.value]);
              }}
            >
              <option value="select">Select</option>
              {filterOptions.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
        <div className="filter-category">Search</div>
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search your character here"
          />
        </div>
      </div>
      <div className="selected-filter-container">
        {selectedFilters.map((item) => (
          <span
            className="selected-filter"
            onClick={(e) => {
              setSelectedFilters(
                selectedFilters.filter((i) => i !== e.target.innerText)
              );
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="gradiant-bg"></div>
      <div className="character-container">
        {filterList ? renderList(filterList) : renderList(listOfCharacter)}
      </div>
    </div>
  );
};

export default Body;
