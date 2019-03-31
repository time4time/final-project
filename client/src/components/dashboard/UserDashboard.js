import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AllRequests from './AllRequests.js'
import MyPetitions from './MyPetitions'
import DirectMessages from './messages/DirectMessages'
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
            listOfMyOffers: [],
        }
        this.openSection = this.openSection.bind(this)
    }
    openSection(selectedSection) {
        this.setState({activeSection: selectedSection})
    }
    notificationControl = (dataFromRequest, statusControl) => {
        let checkPending = []
        for(var i = 0; i < dataFromRequest.length; i++) {
            if(dataFromRequest[i].status === 'Pending') checkPending.push('new offer')
        }
        switch(statusControl) {
            case 'offers':
                if(checkPending.length > 0) return this.setState({myOffers: true})
                else return this.setState({myOffers: false})
            case 'petitions':
                if(checkPending.length > 0) return this.setState({petitionsNotification: true})
                else return this.setState({petitionsNotification: false})
            default:
            return null
        }
    }
    getMyOffers = () => {
        axios({
            method: "get",
            url: `${config.api}/my-offers`,
            // url: `${config.REACT_APP_api}/my-offers`,
            withCredentials: true
          })
          .then(responseFromApi => {
            this.setState({
              listOfMyOffers: responseFromApi.data,
            })
            this.notificationControl(responseFromApi.data, 'offers')
          })
    }
    getMyPetitions = () =>{
        axios({
          method: "get",
          url: `${config.api}/my-petitions`,
        //   url: `${config.REACT_APP_api}/my-petitions`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            listOfPetitions: responseFromApi.data,
          })
          this.notificationControl(responseFromApi.data, 'petitions')
        })
    }   
    componentDidMount(){
        this.getMyPetitions()
        this.getMyOffers()
    }
    render() { 
        return (
            <div className='section'>
            <div className='container'>
            <div className='columns'>
                <aside className="menu column is-3">
                    <ul className="menu-label">
                        <li><Link onClick={()=> {this.openSection('all requests')}}>My offers &nbsp;  
                        { this.state.myOffers ? <i className="fas fa-bolt"></i> : <i className="fas fa-times"></i> }
                        </Link></li>
                    </ul>
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
                <div className="column">
                {(() => {
                    switch(this.state.activeSection) {
                        case 'all requests':
                            return <AllRequests {...this.props} {...this.state} updateOffers={this.getMyOffers} listOfMyOffers={this.state.listOfMyOffers}/>;
                        case 'my petitions':
                            return <MyPetitions {...this.props} {...this.state} listOfPetitions={this.state.listOfPetitions} />;
                        case 'messages':
                            return <DirectMessages/>
                        case 'profile':
                            return <MyProfile />
                        case 'settings':
                            return <UserSettings {...this.props}/>
                        default:
                            return <AllRequests {...this.props} {...this.state} listOfMyOffers={this.state.listOfMyOffers}/>
                    }
                })()}
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default UserDashboard;