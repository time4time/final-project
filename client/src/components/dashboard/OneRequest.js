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
    // approveOffer = () => {
    //     this.setState({offerStatus: 'Approved'})
    // }
    approveOffer = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `${config.api}/approve-offer`,
            data: {offerId: this.props.offerId},
            withCredentials : true,
        }).then(databaseResponse => {
            this.setState({
                offerStatus: 'Approved',
                offerApproved: databaseResponse.data
            })
            this.props.history.push('/dashboard')
            
        }).catch(err => {
            this.setState({error: 'The offer could not be approved'})
            // this.props.history.push('/signup')
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
                    {this.state.offerStatus ? 
                    <Link className="card-footer-item button is-success">Approved!</Link> :
                    <Link onClick={this.approveOffer} className="card-footer-item button is-danger">Approve</Link>
                    }
                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                </footer>
            </div>
        );
    }
}
 
export default OneRequest;