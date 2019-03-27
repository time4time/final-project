import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AllRequests from './AllRequests.js'
import MyPetitions from './MyPetitions'
import DirectMessages from './DirectMessages'
import UserSettings from './UserSettings'
import MyProfile from './MyProfile'
import axios from 'axios';
import config from '../../config.json'


class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSection: 'all requests',
            petitionsNotification: false,
            listOfPetitions: [],
            myOffers: false,
            listOfMyOffers: []
        }
        this.openSection = this.openSection.bind(this)
    }
    openSection(selectedSection) {
        this.setState({activeSection: selectedSection})
    }
    // Para las ofertas que te han pedido, deberiamos preguntar por ofertas 
    // en las que authorUsername = tu username, que el status sea pending
    getMyOffers = () => {
        axios({
            method: "get",
            url: `${config.api}/my-offers`,
            withCredentials: true
          })
          .then(responseFromApi => {
            this.setState({
              listOfMyOffers: responseFromApi.data,
            })
            //cambiar validacion
            //puedo hacer un for loop through responseFromApi.data y dentro poner si responseFromApi.data[i].status === 'Pending' entonces cambiar el estado
            //luego preocuparme del update
            debugger
            for(var i = 0; i < responseFromApi.data.length; i++) {
                debugger
                if(responseFromApi.data[i].status === 'Pending') return this.setState({myOffers: true})
            }
            // if(responseFromApi.data.length > 0) this.setState({myOffers: true})
          })
    }
    getMyPetitions = () =>{
        axios({
          method: "get",
          url: `${config.api}/my-petitions`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            listOfPetitions: responseFromApi.data,
          })
          if(responseFromApi.data.length > 0) this.setState({petitionsNotification: true})
        })
    }
    componentDidMount(){
        this.getMyPetitions()
        this.getMyOffers()
    }
    render() { 
        return (
            <>
                <aside className="menu">
                    {/* <p className="menu-label">
                        All requests
                    </p> */}
                    <ul className="menu-label">
                        <li><Link onClick={()=> {this.openSection('all requests')}}>My offers &nbsp;  
                        { this.state.myOffers ? <i className="fas fa-bolt"></i> : <i className="fas fa-times"></i> }
                        </Link></li>
                    </ul>
                    {/* <p className="menu-label">
                        My petitions
                    </p> */}
                    <ul className="menu-label">
                        <li><Link onClick={()=> {this.openSection('my petitions')}}>My petitions &nbsp;  
                        { this.state.petitionsNotification ? <i className="fas fa-bolt"></i> : <i className="fas fa-times"></i> }
                        </Link></li>
                    </ul>
                    <p className="menu-label"><Link onClick={()=> {this.openSection('messages')}}>
                        Direct messages
                    </Link></p>
                    <p className="menu-label"><Link onClick={()=> {this.openSection('profile')}}>
                        Profile
                    </Link></p>
                    <p className="menu-label"><Link onClick={()=> {this.openSection('settings')}}>
                        Settings
                    </Link></p>
                </aside>
                <div>
                {(() => {
                    switch(this.state.activeSection) {
                        case 'all requests':
                            return <AllRequests {...this.props} {...this.state} listOfMyOffers={this.state.listOfMyOffers}/>;
                        case 'my petitions':
                            return <MyPetitions {...this.props} {...this.state} listOfPetitions={this.state.listOfPetitions} />;
                        case 'messages':
                            return <DirectMessages/>
                        case 'profile':
                            return <MyProfile />
                        case 'settings':
                            return <UserSettings />
                        default:
                            return <AllRequests {...this.props} {...this.state} listOfMyOffers={this.state.listOfMyOffers}/>
                    }
                })()}
                </div>

                
                
            </>
        );
    }
}

export default UserDashboard;