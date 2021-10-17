import React, { Component } from 'react';
import ViewList from './Pages/ViewList';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import AddItem from './Pages/AddItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="container mt-2" style={{ marginTop: 40 }}>
            <Switch>
              <Route exact path="/">
                <Home />
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
}

export default App;
