import React, { Component } from 'react';
import OneRequest from './OneRequest'


//hacer map sobre la lista de requests con axios y return el Component de OneRequest

class AllRequests extends Component {
    render() { 
        return (
            <div>
            { this.props.listOfMyOffers.map( myOffer => {
              return(
                <OneRequest {...this.props} 
                offerId={myOffer._id}
                title={myOffer.title}
                authorUsername = {myOffer.authorUsername}
                date={myOffer.date}
                duration={myOffer.duration}
                status={myOffer.status}
                />
              )
            })
            }
        </div> 
        );
    }
}

export default AllRequests;