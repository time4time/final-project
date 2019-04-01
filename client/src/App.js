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
import Footer from './components/Footer'
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
                {this.state.loggedIn ?
                    <AuthNav {...this.state} logOut={this.logOut}/> :
                    <UnauthNav {...this.state} />
                }
            </header>
            <Switch>
                <Route exact path='/' render={(props) => <Main {...props} {...this.state}/>} />
                <Route path='/login'  render={(props) => <Login {...props} loggedIn={this.loggedIn}/>} />
                <Route path='/signup'  render={(props) => <Signup {...props} loggedIn={this.loggedIn}/>} /> 
                <PrivateRoute path='/dashboard' component={UserDashboard} {...this.state} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                <PrivateRoute path='/publish-offer'  component={PublishOffer} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                <PrivateRoute path='/profile/:id'  component={AuthorProfile} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
            </Switch>
            <Footer />
            </div>
        );
    }
}



export default App;
