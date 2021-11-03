import React, { useState } from 'react';

const FilterList = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <form action="#">
        <label htmlFor="filter-list" style={{ display: 'hidden' }}>
          Filter List
        </label>
        <br />
        <input
          type="text"
          id="filter-list"
          value={value}
          onChange={handleChange}
          placeholder="Enter your item"
        />
      </form>
    </div>
  );
};

export default FilterList;
