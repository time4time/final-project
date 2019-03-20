import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Nav from './components/Nav'
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header> 
        </header>
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
