import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json'


//axios request para sacar info del perfil
//hacer lo de la image del tutorial de jurgen

class MyProfile extends Component {
    state = { 
        profileInfo: {}
     }
    getProfileInfo = () =>{
        debugger
        axios({
          method: "get",
          url: `${config.api}/my-profile`,
          withCredentials: true
        })
        .then(responseFromApi => {
            debugger
          this.setState({
            profileInfo: responseFromApi.data
          })
        })
        .catch(err => {
            debugger
            console.log(err)
        })
      }
    
    componentDidMount() {
        this.getProfileInfo();
    }
    render() { 
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                    <img src={`${config.api}/${this.state.profileInfo.profileImage}`} alt="Profile"/>
                    {/* <img src='http://localhost:3001/public/images/4b74c470f74e7f66a5793878eb5a76ef' alt="Profile"/> */}
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{this.state.profileInfo.firstname} {this.state.profileInfo.lastname}</p>
                        <p className="subtitle is-6">{this.state.profileInfo.username}</p>
                    </div>
                    </div>
                    <div className="content">
                    <time datetime="2016-1-1">{this.state.profileInfo.registrationDate}</time>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MyProfile;