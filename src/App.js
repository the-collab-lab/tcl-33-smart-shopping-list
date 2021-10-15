import React, { useState, useEffect } from 'react';
import ViewList from './Pages/ViewList';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('Token');
    user && setToken(user);
    console.log(token);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container mt-2" style={{ marginTop: 40 }}>
          <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/ViewList" /> : <Home />}
            </Route>
            <Route path="/AddItem">
              <AddItem />
            </Route>
            <Route path="/ViewList">
              <ViewList />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
