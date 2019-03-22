import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Main from './components/main/Main';
import Nav from './components/Nav'
import UserDashboard from './components/dashboard/UserDashboard'
import PublishOffer from './components/publish-offer/PublishOffer'
// import Signup from './components/authentication/Signup'
// import Login from './components/authentication/Login'
import AuthorProfile from './components/author-profile/AuthorProfile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header> 
            <Nav />
        </header>
        <Switch>
            <Route exact path='/' render={(props) => <Main {...props}/>} />
            {/* En dashboard habra que pasar algun tipo de props o algo para por si queremos ir directamente a mensajes */}
            <Route path='/dashboard' render={(props) => <UserDashboard {...props} />} />
            <Route path='/publish-offer'  render={(props) => <PublishOffer {...props} />} />
            {/* <Route path='/signup'  render={(props) => <Signup {...props} />} /> 
            <Route path='/login'  render={(props) => <Login {...props} />} /> */}
            <Route path='/profile:id'  render={(props) => <AuthorProfile {...props} />} />
      </Switch>
      </div>
    );
  }
}

export default App;
