import React, { Component } from 'react';
import OneRequest from './OneRequest'


//hacer map sobre la lista de requests con axios y return el Component de OneRequest

class AllRequests extends Component {
    state = {  }
    render() { 
        return (
            <div>
            { this.props.listOfOffersRequested.map( myOfferRequested => {
              return(
                <OneRequest 
                title={myOfferRequested.title}
                authorUsername = {myOfferRequested.authorUsername}
                date={myOfferRequested.date}
                duration={myOfferRequested.duration}
                status={myOfferRequested.status}
                />
              )
            })
            }
        </div> 
        );
    }
}

export default AllRequests;