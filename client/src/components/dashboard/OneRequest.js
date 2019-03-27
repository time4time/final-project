import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios  from 'axios';
import config from "../../config.json";


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
        debugger
        event.preventDefault();
        axios({
            method: 'post',
            url: `${config.api}/approve-offer`,
            data: {offerId: this.props.offerId},
            withCredentials : true,
        }).then(databaseResponse => {
            debugger
            this.updateTimeWallet(event)
            this.setState({
                offerStatus: 'Approved',
                offerApproved: databaseResponse.data
            })
            this.props.history.push('/dashboard')
            
        }).catch(err => {
            debugger
            this.setState({error: 'The offer could not be approved'})
            // this.props.history.push('/signup')
        })
    }
    updateTimeWallet = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `${config.api}/update-time-wallet`,
            data: {offerId: this.props.offerId},
            withCredentials : true,
        }).then(databaseResponse => {
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
                    {this.props.authorUsername}
                    <time datetime="2016-1-1">{this.props.date}></time>
                    <p>{this.props.duration}</p>
                    </div>
                </div>
                <footer className="card-footer">
                    {this.state.offerApproved ?
                    <h1 className="card-footer-item"> {this.state.offerApproved.status}</h1> :
                    <h1 className="card-footer-item"> {this.props.status}</h1>
                    }
                    {this.state.offerStatus === 'Approved' ?
                    <Link className="card-footer-item button is-success">Approved!</Link> :
                    <div>
                        {this.props.status === 'Open' ?
                        null :
                        <div>
                            {this.props.status === 'Approved'? 
                            <Link className="card-footer-item button is-success">Approved!</Link> :
                            <Link onClick={this.approveOffer} className="card-footer-item button is-danger">Approve</Link>
                            }
                            {/* {this.state.offerStatus ? 
                                <Link className="card-footer-item button is-success">Approved!</Link> :
                                <Link onClick={this.approveOffer} className="card-footer-item button is-danger">Approve</Link>
                                } */}
                        </div>
                        }
                    </div>
                    }


                    <p style={{color: 'green'}}>{this.state.offerStatus ? `You got ${this.state.offerApproved.duration} hour(s) in your Time Wallet!` : ''}</p>
                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                </footer>
            </div>
        );
    }
}
 
export default OneRequest;