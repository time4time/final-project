import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import config from '../../config.json'
import axios from 'axios'

const display = {
    display: 'block'
};

const hide = {
    display: 'none'
}

class OfferModal extends Component {
    state = { 
        title: '',
        author: '',
        description: '',
        category: '',
        

    }


    handleSubmit=(event) =>{
        // this.props.showNotifications('petitionNotification')
        debugger
        event.preventDefault();
        axios({
          method: "post",
          url: `${config.api}/apply`,
         data:{offerId:this.props.offerIdentificator},
          withCredentials: true,
        })
        .then(responseFromApi => {
        //   this.setState({
        //     listOfOffers: responseFromApi.data
        //   })
        this.props.history.push('/dashboard')
        })
        .catch(err => {
            debugger
            console.log(err)
        })

      }

      sendEmail = (event) => {
          event.preventDefault();
          debugger
          axios({
              method:'post',
              data:{offerId:this.props.offerIdentificator},
              url: `${config.api}/send-mail`,
              withCredentials: true,
          })
          .then(responseFromApi =>{
            debugger
              console.log('sent')
          })
          .catch(err => {
            debugger
              console.log(err)
          })
      }


    render() { 
        return (
                <div className="modal" style={this.props.toggle ? display : hide}>
                <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{this.props.title}</p>
                            <Link>
                                <button className="delete" onClick={this.props.close} aria-label="close"></button>
                            </Link>
                        </header>
                        <section className="modal-card-body">
                            <div className='media'>
                            <p className="image is-64x64">
                                <img src="lightscape-741984-unsplash.jpg" alt=''></img>
                            </p>
                                <div className="content">
                                    <p className="modal-card-title">Name </p>
                                    <p>{this.props.authorUsername}</p>
                                    <p className="modal-card-title">Califications </p>
                                    <Link>
                                        <button className="button is-success">See more</button>
                                    </Link>
                                </div>
                            </div>
                        <h1 className="modal-card-title">Description</h1>
                            <p>{this.props.description}</p>
                        
                            <img src={`${config.api}/${this.props.image}`} alt=""/>
                        
                        <h1 className="modal-card-title">Category</h1>
                            <p>{this.props.category}</p>
                        <h1 className="modal-card-title">Date</h1>
                            <p>{this.props.dateOffer}</p>
                            <p></p>
                        </section>
                        <footer className="modal-card-foot">
                            <Link>
                              <button 
                              onClick={(e) => {
                                this.handleSubmit(e);
                                this.sendEmail(e)} 
                              }
                              className="button is-success">Apply</button>
                            </Link>
                        </footer>
                    </div>
                </div>
        );
    }
}
 
export default OfferModal;