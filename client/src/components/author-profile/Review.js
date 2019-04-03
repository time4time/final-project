import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import config from '../../config.json'

//Render and constructing review component, this router 
//it's private and you can only add a review when you have an account
class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewer: {}
        }
    }
    //call to database and take username's reviewer
    getReviewerUsername = () => {
        axios({
            method: 'post',
            // url: `${config.REACT_APP_api}/reviewer`,
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
    //render review's form
    render() { 
        return (
            <div className="card">
                <div className="card-content">

                        <p className="is-size-5 column has-text-weight-semibold has-text-left">
                            Username: {this.state.reviewer.username}
                        </p>
                        <p className="subtitle column has-text-left">Date <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <div className="columns">
                        <figure className="image column">
                            <img src={`${config.api}/${this.props.pictureUrl}`} alt="Review"/>
                        </figure>
                        <p className="is-size-6 column has-text-left">
                            {this.props.opinion}
                        </p>
                    </div>

                </div>
                </div>
        );
    }
}
 
export default Review;