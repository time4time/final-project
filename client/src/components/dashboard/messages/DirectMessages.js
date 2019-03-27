import React, { Component } from 'react';
import UsernameForm from './UsernameForm'
import ChatScreen from './ChatScreen'
import config from '../../../config.json'

class DirectMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUsername: '',
            currentScreen: 'WhatIsYourUsernameScreen'     
        }
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
    }

    //CAMBIAR A AXIOS
    onUsernameSubmitted(username) {
        fetch(`${config.api}/chat-users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        })
          .then(response => {
            this.setState({
              currentUsername: username,
              currentScreen: 'ChatScreen'
            })
          })
          .catch(error => console.error('error', error))
    }   
    render() { 
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
            return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
            return <ChatScreen currentUsername={this.state.currentUsername} />
        }
    
    }
}
 
export default DirectMessages;