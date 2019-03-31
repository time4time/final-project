import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment';

import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
    
  } from 'react-share';

import config from '../../config.json'

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
        errorTimeWallet: '',
        myOffer: undefined
    }

    handleApply = (event) => {
        event.preventDefault();
        axios({
          method: "post",
          url: `${config.api}/apply`,
        //   url: `${config.REACT_APP_api}/apply`,
          data: {offerId: this.props.offerIdentificator},
          withCredentials: true,
        })
        .then(responseFromApi => {
            if( responseFromApi.data.message === "Not enough time in the wallet to apply" ) this.setState({errorTimeWallet: "You don't have enough time in your wallet to apply to this offer"})
            else this.props.history.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }

    sendEmail = (event) => {
          event.preventDefault();
          axios({
              method:'post',
              data:{offerId:this.props.offerIdentificator},
              url: `${config.api}/send-mail`,
            //   url: `${config.REACT_APP_api}/send-mail`,
              withCredentials: true,
          })
          .then(responseFromApi =>{
              console.log('sent')
          })
          .catch(err => {
              console.log(err)
          })
    }

    redirectToLogin = () => {
        this.props.history.push('/login')
    }


    redirectToAuthorProfile = () =>{
        this.props.history.push(`/profile/${this.props.author}`)
    }  

    render() { 
        return (
                <div className="modal" style={this.props.toggle ? display : hide}>
                <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title modal-offer-title">{this.props.title}</p>
                            <Link>
                                <button className="delete" onClick={this.props.close} aria-label="close"></button>
                            </Link>
                        </header>
                        <section className="modal-card-body">
                            <div className='media columns'>
                            {/* <p className="image is-64x64">
                                <img src={`${config.REACT_APP_api}/${this.props.authorProfileImage}`} alt=""/>
                            </p> */}
                                <div className="content column">
                                    <p className="modal-card-title">Username: {this.props.authorUsername}</p>
                                    {/* <p className="modal-card-title">Ratings</p> */}
                                    <div className="level">
                                        <div className="level-left">
                                            <Link>
                                                <button onClick={this.redirectToAuthorProfile}className="button is-success">See more</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='media columns'>
                                <div className='column'>
                                    <div className="columns">
                                        <div className="column">
                                            <img className="image is-3by1 modal-image" src={`${config.REACT_APP_api}/${this.props.image}`} alt=""/>
                                        </div>
                                        <div className="column">
                                            <h1 className="modal-card-title">Description</h1>
                                            <p>{this.props.description}</p>
                                            <div className='social-media level-left'>
                                                <FacebookShareButton url={'https://www.facebook.com'}>
                                                    <FacebookIcon size={32} round={true}/>
                                                </FacebookShareButton>
                                                <TwitterShareButton url={'https://www.twitter.com'}>
                                                    <TwitterIcon size={32} round={true}/>
                                                </TwitterShareButton>
                                                <PinterestShareButton url={'https://www.pinterest.com/'}>
                                                    <PinterestIcon size={32} round={true}/>
                                                </PinterestShareButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <h1 className="modal-card-title">Category</h1>
                                                <p>{this.props.category}</p>
                                            <h1 className="modal-card-title">Postal Code</h1>
                                                <p>{this.props.postalCode}</p>
                                        </div>
                                        <div className="column">                 
                                            <h1 className="modal-card-title">Date</h1>
                                                <p><Moment format="D MMM YYYY" withTitle>{this.props.dateOffer}</Moment></p>
                                            <h1 className="modal-card-title">Duration</h1>
                                                <p>{this.props.durationOffer} hour(s)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                      
                            <Link>
                            {this.props.loggedIn ?
                                <button onClick={(e) => {
                                this.handleApply(e);
                                this.sendEmail(e)}
                                } className="button is-success">Apply </button>:
                                <button onClick={this.redirectToLogin} className="button is-dark">Apply </button>
                            }
                            </Link>
                            {this.state.errorTimeWallet?
                            <p style={{color: 'red'}}>{this.state.errorTimeWallet}</p>:
                            <p></p>
                            }
                        </footer>
                    </div>
                </div>
        );
    }
}



export default OfferModal;