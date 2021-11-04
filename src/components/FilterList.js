import React, { useState, useEffect } from 'react';
let arrString = ['fruit', 'vegetables', 'water', 'legumes'];
const FilterList = () => {
  const [value, setValue] = useState('');

  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('Use Effect ');
    if (value === '') {
      setResults([]);
      return;
    }
    const matches = arrString.filter(function (currentWord) {
      console.log(`Current Word = ${currentWord}`);
      return currentWord.includes(value);
    });
    console.log(matches);
    setResults(matches);
  }, [value]);

  const handleChange = (e) => {
    console.log('handle change fired');
    setValue(e.target.value);
  };

  //   const handleReset = (e) => {
  //       e.preventDefault();
  //       console.log("reset");
  //       setValue('');
  //   }

  return (
    <div>
      <p>Items = {results}</p>
      <form action="#">
        <label htmlFor="filter-list" style={{ display: 'hidden' }}>
          Filter List
        </label>
        <br />
        <input
          type="search"
          id="filter-list"
          value={value}
          onChange={handleChange}
          placeholder="Enter your item"
        />
        {/* <button onClick={handleReset}>Reset</button> */}
      </form>
    </div>
  );
};

export default FilterList;
