import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios  from 'axios';
import Moment from "react-moment";
const config = process.env

class OneRequest extends Component {
    constructor(props){
        super(props)
        this.state = {
            offerStatus: '',
            error: '',
            offerApproved: undefined
        }
    }

    approveOffer = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `${config.REACT_APP_api}/approve-offer`,
            data: {offerId: this.props.offerId},
            withCredentials : true,
        }).then(databaseResponse => {
            this.updateTimeWallet(event)
            this.setState({
                offerStatus: 'Approved',
                offerApproved: databaseResponse.data
            })
            this.props.updateOffers()
            this.props.history.push('/dashboard')
        }).catch(err => {
            this.setState({error: 'The offer could not be approved'})
        })
    }
    updateTimeWallet = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `${config.REACT_APP_api}/update-time-wallet`,
            data: {offerId: this.props.offerId},
            withCredentials : true,
        }).then(databaseResponse => {
            console.log('updated time wallet')
        }).catch(err => {
            this.setState({error: 'The time wallet could not be updated'})
        })
    }
    render() { 
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                    {this.props.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                    <p>My username: &nbsp;{this.props.authorUsername} </p>
                    <p>Date: &nbsp; <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <p>Duration: &nbsp; {this.props.duration} hour(s)</p>
                    <p style={{color: 'green'}}>{this.state.offerStatus ? `You got ${this.state.offerApproved.duration} hour(s) in your Time Wallet!` : ''}</p>
                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                    </div>
                </div>
                <footer className="card-footer">
                    {this.state.offerApproved ?
                        <h1 className="card-footer-item"> Offer status: &nbsp; {this.state.offerApproved.status}</h1> :
                        <h1 className="card-footer-item"> Offer status: &nbsp; {this.props.status}</h1>
                    }
                    {this.state.offerStatus === 'Approved' ?
                    <Link className="card-footer-item button is-success">Approved!</Link> :
                    <>
                        {this.props.status === 'Open' ?
                        null :
                        <>
                            {this.props.status === 'Approved'? 
                            <Link className="card-footer-item button is-success">Approved!</Link> :
                            <Link onClick={this.approveOffer} className="card-footer-item button is-warning">Approve</Link>
                            }
                        </>
                        }
                    </>
                    }
                </footer>
            </div>
        );
    }
}
 
export default OneRequest;