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
        // requestNotification: false,
        // petitionNotification: false,
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

    // showNotifications = (notification) => {
    //     debugger
    //     console.log('entro en show notifications')
    //     if(notification === 'requestNotification'){
    //         this.setState({
    //             requestNotification: true
    //         })
    //     }else if(notification === 'petitionNotification'){
    //         this.setState({
    //             petitionNotification: true
    //         })

    //     }

    // }

    render() {
        return (
            <div className="App">
            <header> 
                {/* <Nav {...this.state} logOut={this.logOut} /> */}
                {this.state.loggedIn ?
                    <AuthNav {...this.state} logOut={this.logOut}/> :
                    <UnauthNav {...this.state} />
                }
            </header>
            <Switch>
                <Route exact path='/' render={(props) => <Main {...props} {...this.state}/>} />
                {/* En dashboard habra que pasar algun tipo de props o algo para por si queremos ir directamente a mensajes */}
                <Route path='/login'  render={(props) => <Login {...props} loggedIn={this.loggedIn}/>} />
                <Route path='/signup'  render={(props) => <Signup {...props} loggedIn={this.loggedIn}/>} /> 
                {/* <Route path='/dashboard' render={(props) => <UserDashboard {...props} />} /> */}
                <PrivateRoute path='/dashboard' component={UserDashboard} {...this.state} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                {/* <Route path='/publish-offer'  render={(props) => <PublishOffer {...props} />} /> */}
                <PrivateRoute path='/publish-offer'  component={PublishOffer} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                {/* <Route path='/profile:id'  render={(props) => <AuthorProfile {...props} />} /> */}
                <PrivateRoute path='/profile/:id'  component={AuthorProfile} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
            </Switch>
            </div>
        );
    }
}



export default App;
