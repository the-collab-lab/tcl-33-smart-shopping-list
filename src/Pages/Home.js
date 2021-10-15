import React from 'react';
import CreateList from '../components/CreateList';

const Home = ({ onSubmit }) => (
  <>
    <h1 className="title is-1"> Welcome to your smart shopping list </h1>
    <h2 className="title is-1"> Tap "Create shopping list" to get started. </h2>
    <CreateList onSubmit={onSubmit} />
  </>
);

export default Home;
