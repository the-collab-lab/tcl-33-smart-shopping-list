import { doc } from 'prettier';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  // if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  const [inputValue, setInputValue] = useState('');
  // const [matchValue, setMatchValue] = useState([]);

  const handleChange = e => {
    e.preventDefault()
    console.log('handle change fired');
    setInputValue(e.target.value)
  };

  // const findMatches = () => {
  //   let matches = list.docs.map(doc => doc.data().item)
  //   let matchesArray = JSON.stringify(matches).split(" ")
  //   let filteredMatchesArray = matchesArray.filter(match => match.includes(inputValue))
  //   setMatchValue(filteredMatchesArray)
  //   console.log(`this is our matchesArray ${filteredMatchesArray} and this is our input ${inputValue}`)
  // }



  /* ******************************************* */

  return (
    <div>
      <h2>Grocery List</h2>

      {/* FILTER LIST RENDERING */}
      <div>
        <form action="#">
          <label htmlFor="filter-list" style={{ display: 'hidden' }}>
            Filter List
          </label>
          <br />
          <input
            type="search"
            id="filter-list"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your item"
          />
        </form>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {list && !inputValue && inputValue == null ? (
        <ul>
          {/* list.docs.filter(docs => docs.data().item.includes(inputValue).map(filteredItem => )) */}
          {list.docs.map((doc) => (
            <li key={doc.id} style={{ listStyleType: 'none' }}>
              {doc.data().item}
              {/* {`this is our matchValue: ${matchValue}`} */}

              {/* {JSON.stringify(filteredItems)} */}
              {console.log(JSON.stringify(doc.data().item))}{' '}
              {/* {console.log("this is " + doc.data().item)} */}
            </li>
          ))}
        </ul>
      ) : ( 
        <ul>
          {list.docs.map((doc) => (
          // <li>This is the input value {inputValue}</li>
          <li key={doc.id} style={{ listStyleType: 'none' }}>
            { doc.data().item.split(" ").filter(thing => thing.toLowerCase().includes(inputValue.toLowerCase()))}
            </li>
           ))} 
        </ul>


      )}
    </div>
  );
};

export default ViewList;
