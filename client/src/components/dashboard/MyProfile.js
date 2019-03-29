import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment'
const config = process.env

class MyProfile extends Component {
    state = { 
        profileInfo: {}
     }
    
    getProfileInfo = () =>{
        axios({
          method: "get",
          url: `${config.api}/my-profile`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            profileInfo: responseFromApi.data
          })
        })
        .catch(err => {
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
                    <figure className="image is-128x128">
                    <img src={`${config.api}/${this.state.profileInfo.profileImage}`} alt="Profile"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{this.state.profileInfo.firstname} {this.state.profileInfo.lastname}</p>
                        <p className="subtitle is-6">Username: &nbsp; {this.state.profileInfo.username}</p>
                    </div>
                    </div>
                    <div className="content">

                        <p className="subtitle is-6">Time wallet: {this.state.profileInfo.timeWallet} hour(s)</p>
                        <p>Registration Date: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.profileInfo.registrationDate}</Moment></p>

                    </div>
                </div>
            </div>
        );
    }
}
 
export default MyProfile;