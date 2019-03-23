import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './components/authentication/PrivateRoute'
import Main from './components/main/Main';
import UserDashboard from './components/dashboard/UserDashboard'
import PublishOffer from './components/publish-offer/PublishOffer'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import AuthorProfile from './components/author-profile/AuthorProfile'

import { UnauthNav, AuthNav } from './components/Nav';


class App extends Component {
    state = {
        loggedIn : false,
        username : "",
    }

    loggedIn = (aBoolean, username) => {
        this.setState({
            loggedIn: aBoolean,
            username: username,
        })
    }
    logOut = ()=> {
        this.setState({
            loggedIn: false,
            username: "",
        })
    }

    render() {
        return (
            <div className="App">
            <header> 
                {/* <Nav {...this.state} logOut={this.logOut} /> */}
                {this.state.loggedIn ?
                    <AuthNav logOut={this.logOut} /> :
                    <UnauthNav logOut={this.logOut} />
                }
            </header>
            <Switch>
                <Route exact path='/' render={(props) => <Main {...props}/>} />
                {/* En dashboard habra que pasar algun tipo de props o algo para por si queremos ir directamente a mensajes */}
                <Route path='/login'  render={(props) => <Login {...props} loggedIn={this.loggedIn}/>} />
                <Route path='/signup'  render={(props) => <Signup {...props} loggedIn={this.loggedIn}/>} /> 
                {/* <Route path='/dashboard' render={(props) => <UserDashboard {...props} />} /> */}
                <PrivateRoute path='/dashboard' component={UserDashboard} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                {/* <Route path='/publish-offer'  render={(props) => <PublishOffer {...props} />} /> */}
                <PrivateRoute path='/publish-offer'  component={PublishOffer} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                {/* <Route path='/profile:id'  render={(props) => <AuthorProfile {...props} />} /> */}
                <PrivateRoute path='/profile:id'  component={AuthorProfile} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
            </Switch>
            </div>
        );
    }
}



export default App;
