import React, { useState, useEffect } from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import ViewList from './Pages/ViewList';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import AddItem from './Pages/AddItem';
import { db } from './lib/firebase';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('Token');
    user && setToken(user);
  }, [token]);

  // db.collection(id).get().then(resp => !!resp.size)
  const collectionExists = async (id) => {
    let resp = await db.collection(id).get();
    return !!resp.size;
  };
  console.log(
    collectionExists('ncaa happy croak').then((value) => console.log(value)),
  );

  const createToken = (e) => {
    e.preventDefault();
    const newToken = getToken(words);
    localStorage.setItem('Token', newToken);
    setToken(newToken);
  };

  const shareToken = (e, token) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container mt-2" style={{ marginTop: 40 }}>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/AddItem" />
              ) : (
                <Home onSubmit={(e) => createToken(e)} />
              )}
            </Route>
            <Route exact path="/AddItem">
              <AddItem token={token} />
            </Route>
            <Route exact path="/ViewList">
              <ViewList token={token} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
