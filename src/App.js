import React, { useState, useEffect } from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import ViewList from './Pages/ViewList';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import AddItem from './Pages/AddItem';

function App() {
  const [token, setToken] = useState(null);
  const [checked, setChecked] = useState({})

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

  const handleChange = (e) => {
    console.log(e.target.value)
    if (checked[e.target.value] ) {
      console.log("exists")
    } else {
      checked[e.target.value] = true
    }
  }

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
              {!token ? <Redirect to="/" /> : <ViewList token={token} handleChange={handleChange} checked={checked}/>}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
