import React from 'react';
import CreateList from '../components/CreateList';

const Home = () => (
  <div>
    <h1 className="title is-1">This is the Home Page</h1>
    <h1 className="title is-1"> Welcome to your smart shopping list </h1>
    <h5 className="title is-1"> Tap "Create shopping list" to get started. </h5>
    <h3>
      <CreateList />
    </h3>
    <h6 className="title is-1"> You can also join an existing shopping list</h6>
  </div>
);

export default Home;
