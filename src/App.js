import React, { useState, useEffect } from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import ViewList from './Pages/ViewList';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import AddItem from './Pages/AddItem';
// import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './lib/firebase';
import estimatedTime from './lib/estimate';

function App() {
  const [token, setToken] = useState(null);
  // const [list, loading, error] = useCollection(db.collection(token));

  // console.log(calculateEstimate(urgency, daysSinceLastTransaction, timesPurchase))

  useEffect(() => {
    const user = localStorage.getItem('Token');
    user && setToken(user);
  }, [token]);

  const createToken = (e) => {
    e.preventDefault();
    const newToken = getToken(words);
    localStorage.setItem('Token', newToken);
    setToken(newToken);
  };

  const shareToken = (token) => {
    localStorage.setItem('Token', token);
    setToken(token);
  };

  const checkItem = (doc) => {
    estimatedTime(doc, token);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} />
        <div className="container mt-2" style={{ marginTop: 40 }}>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/ViewList" />
              ) : (
                <Home
                  createToken={(e) => createToken(e)}
                  onSharedToken={shareToken}
                />
              )}
            </Route>

            <Route exact path="/AddItem">
              {!token ? <Redirect to="/" /> : <AddItem token={token} />}
            </Route>

            <Route exact path="/ViewList">
              {!token ? (
                <Redirect to="/" />
              ) : (
                <ViewList token={token} checkItem={checkItem} />
              )}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
