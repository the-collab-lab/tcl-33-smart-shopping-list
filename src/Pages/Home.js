import React from 'react';
import CreateList from '../components/CreateList';
import JoinList from '../components/JoinList';

const Home = ({ createToken, onTokenSubmit, setErrorMessage }) => (
  <>
    <h1 className="title is-1"> Welcome to your smart shopping list </h1>
    <h2 className="title is-1"> Tap "Create shopping list" to get started. </h2>
    <CreateList onSubmit={createToken} />
    <p>
      You can also <span>join an existing shopping list.</span>
    </p>
    <JoinList setErrorMessage={setErrorMessage} onSharedToken={onTokenSubmit} />
  </>
);

export default Home;
