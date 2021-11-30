import React from 'react';
import CreateList from '../components/CreateList';
import JoinList from '../components/JoinList';
import '../App.css';

const Home = ({ createToken, onSharedToken }) => (
  <>
    <CreateList onSubmit={createToken} />
    <div className="joinListStyle">
      <JoinList onSharedToken={onSharedToken} />
    </div>
  </>
);

export default Home;
