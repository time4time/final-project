import React, { Component } from 'react';
import OnePetition from './OnePetition'


class MyPetitions extends Component {
    render() { 
        return (
          <div>
            { this.props.listOfPetitions.map( mypetition => {
              return(
                <OnePetition 
                title={mypetition.title}
                authorUsername = {mypetition.authorUsername}
                date={mypetition.date}
                duration={mypetition.duration}
                status={mypetition.status}
                />
              )
            })
            }
        </div> 
    )
}
}

export default MyPetitions;