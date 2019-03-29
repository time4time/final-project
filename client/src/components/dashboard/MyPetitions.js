import React, { Component } from 'react';
import OnePetition from './OnePetition'


class MyPetitions extends Component {
    render() { 
        return (
          <div>
            { this.props.listOfPetitions.length > 0 && this.props.listOfPetitions.map( mypetition => {
              return(
                <OnePetition {...this.props} 
                title={mypetition.title}
                Username = {mypetition.authorUsername}
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