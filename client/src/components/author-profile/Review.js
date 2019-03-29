import React, { Component } from 'react';
import config from '../../config.json'
import axios from 'axios';
import Moment from 'react-moment'


class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewer: {}
        }
    }
    getReviewerUsername = () => {
        axios({
            method: 'post',
            url: `${config.api}/reviewer`,
            data: {reviewerId: this.props.reviewer},
            withCredentials : true,
        }).then(databaseResponse => {
            this.setState({reviewer: databaseResponse.data})
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.getReviewerUsername()
    }
    render() { 
        return (
            <div className="card">
                <div className="card-content">
                    <p className="title">
                        {this.props.opinion}
                    </p>
                    <p>Date <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <p className="subtitle">
                        {this.state.reviewer.username}
                    </p>
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                    <div className="social-interactions">
                            <div className="sharethis-inline-share-buttons">
                                <span className="st_twitter_large" displayText="Tweet"></span>
                                <span className="st_facebook_large" displayText="Facebook"></span>
                            </div>
                    </div>
                    </p>
                </footer>
                </div>
        );
    }
}
 
export default Review;