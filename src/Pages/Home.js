import React from 'react';
import CreateList from '../components/CreateList';
// import {Link} from 'react-router-dom';

const Home = () => (
  <div>
    <h1 className="title is-1">Welcome to your smart shopping list!</h1>
    <p>Tap "Create shopping list" to get started.</p>
    <h3>
      <CreateList />
    </h3>
  </div>
);

export default Home;
