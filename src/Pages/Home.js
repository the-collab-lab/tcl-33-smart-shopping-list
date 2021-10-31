import React from 'react';
import CreateList from '../components/CreateList';
import JoinList from '../components/JoinList';

const Home = ({ createToken, onSharedToken }) => (
  <>
    <CreateList onSubmit={createToken} />
    <JoinList onSharedToken={onSharedToken} />
  </>
);

export default Home;
