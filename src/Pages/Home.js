import React from 'react';
import CreateList from '../components/CreateList';

const Home = () => (
  <div>
    <h1 className="title is-1">This is the Home Page</h1>
    <h3>
      <CreateList />
    </h3>
  </div>
);

export default Home;
