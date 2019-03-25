import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AllRequests from './AllRequests.js'
import MyPetitions from './MyPetitions'
import DirectMessages from './DirectMessages'
import UserSettings from './UserSettings'

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSection: 'all requests'
        }
        this.openSection = this.openSection.bind(this)
    }
    openSection(selectedSection) {
        this.setState({activeSection: selectedSection})
    }
    render() { 
        return (
            <>
                <aside className="menu">
                    <p className="menu-label">
                        All requests
                    </p>
                    <ul className="menu-list">
                        <li><Link onClick={()=> {this.openSection('all requests')}}>Pending requests</Link></li>
                        <li><Link onClick={()=> {this.openSection('all requests')}}>History</Link></li>
                    </ul>
                    <p className="menu-label">
                        My petitions
                    </p>
                    <ul className="menu-list">
                        <li><Link onClick={()=> {this.openSection('my petitions')}}>Pending requests</Link></li>
                        <li><Link onClick={()=> {this.openSection('my petitions')}}>History</Link></li>
                    </ul>
                    <p className="menu-label"><Link onClick={()=> {this.openSection('messages')}}>
                        Direct messages
                    </Link></p>
                    <p className="menu-label"><Link onClick={()=> {this.openSection('settings')}}>
                        Settings
                    </Link></p>
                </aside>
                <div className="mysection">
                {(() => {
                    switch(this.state.activeSection) {
                        case 'all requests':
                            return <AllRequests />;
                        case 'my petitions':
                            return <MyPetitions />;
                        case 'messages':
                            return <DirectMessages />
                        case 'settings':
                            return <UserSettings />
                        default:
                            return <AllRequests />
                    }
                })()}
                </div>

                
                
            </>
        );
    }
}

export default UserDashboard;