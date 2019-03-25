import React, { Component } from 'react';
import OnePetition from './OnePetition'
import axios from 'axios';
import config from '../../config.json'


//hacer map sobre la lista de requests con axios y return el Component de OnePetition

class MyPetitions extends Component {
    state = { 
      listOfPetitions:[]
     }

    getMyPetitions = () =>{
        axios({
          method: "get",
          url: `${config.api}/my-petitions`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            listOfPetitions: responseFromApi.data
          })
        })
    }

    componentDidMount() {
      this.getMyPetitions();
    }

    
    render() { 
        return (
          <div>
            { this.state.listOfPetitions.map( mypetition => {
              return(
                <OnePetition 
                title={mypetition.title}
                Username = {mypetition.authorUsername}
                date={mypetition.date}
                duration={mypetition.duration}
                status={mypetition.status}
                />
              )
            }
          )
      }
    </div> 
    )
}
}

export default MyPetitions;