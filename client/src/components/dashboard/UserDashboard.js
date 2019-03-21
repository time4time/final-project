import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AllRequests from './AllRequests.js'
import MyPetitions from './MyPetitions'
import DirectMessages from './DirectMessages'
import UserSettings from './UserSettings'

class UserDashboard extends Component {
    state = {  }
    render() { 
        return (
            <>
                <aside className="menu">
                    <p className="menu-label">
                        All requests
                    </p>
                    <ul className="menu-list">
                        <li><Link>Pending requests</Link></li>
                        <li><Link>History</Link></li>
                    </ul>
                    <p className="menu-label">
                        My petitions
                    </p>
                    <ul className="menu-list">
                        <li><Link>Pending requests</Link></li>
                        <li><Link>History</Link></li>
                    </ul>
                    <p className="menu-label"><Link>
                        Direct messages
                    </Link></p>
                    <p className="menu-label"><Link>
                        Settings
                    </Link></p>
                </aside>
            </>
        );
    }
}
 
export default UserDashboard;