import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import config from '../../config.json'
import Moment from 'react-moment'
import Review from './Review'

class AuthorProfile extends Component {
    constructor() {
        super();
        this.state = {
          rating: 1,
          authorProfile:{},
          opinion: '',
          date: '',
          error: '',
          success: '',
          bio: '',
          newReview: undefined,
          listOfReviews: [],
          currentPage: 1,
          reviewsPerPage: 5
        };
    this.form = React.createRef()
    this.onStarClick = this.onStarClick.bind(this)
    
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    handleInput = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }
 
    getAuthorInfo = () =>{
        const {id} = this.props.match.params        
        axios({
          method: "get",
          url: `${config.api}/author-profile/${id}`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            authorProfile: responseFromApi.data
          })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    handleSubmitReview = (event) => {
        event.preventDefault();
        let formData = new FormData(this.form.current) 
        axios({
            method: 'post',
            url: `${config.api}/author-profile`,
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData,
            withCredentials : true,
        }).then(databaseResponse => {
            this.setState({success: 'You successfully added a review!', newReview: databaseResponse.data})
            }).then(() => {
                this.sendUserId()
            }).catch(err => {
                this.setState({error: 'Could not add your review'})
            })
    }

    sendUserId = () => {
        axios({
            method: 'post',
            url: `${config.api}/user-reviewed-id`,
            data: {userReviewedId: this.state.authorProfile._id, newReviewId: this.state.newReview._id},
            withCredentials : true,
        }).then(databaseResponse => {
            console.log('Found the user')
        }).catch(err => {
            this.setState({error: 'Could not add your review'})
        })
    }

    getReviews = () => {
        axios({
            method: 'get',
            url: `${config.api}/get-reviews`,
            withCredentials : true,
        }).then(databaseResponse => {
            this.setState({listOfReviews: databaseResponse.data})
        }).catch(err => {
        })
    }

    handlePageClick = (event) => {
        this.setState({currentPage: Number(event.target.id)})
    }

    componentDidMount() {
        this.getAuthorInfo()
        this.getReviews()
    }

    render() {
        const { rating } = this.state;

        const { listOfReviews, currentPage, reviewsPerPage } = this.state

        const indexOfLastReview = currentPage * reviewsPerPage
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage
        const currentReviews = listOfReviews.slice(indexOfFirstReview, indexOfLastReview)

        const renderReviews = currentReviews.map (review => {
            return <Review
                rating={review.rating}
                opinion={review.opinion}
                date={review.date}
                pictureUrl={review.picture}
                reviewer={review.reviewer}
            />
        })

        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(listOfReviews.length / reviewsPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })


        return (
            <div className="colummns">
                <div className="card column is-one-quarter">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src= {`${config.api}/${this.state.authorProfile.profileImage}`} alt="User profile"></img>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">{this.state.authorProfile.firstname}&nbsp;{this.state.authorProfile.lastname}</p>
                                <div className="content">
                                    <p>In the app from: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.authorProfile.registrationDate}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                        <p>{this.state.authorProfile.bio}</p>
                        <p>The time is now: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.authorProfile.date}</Moment></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                <form ref={this.form} onSubmit={this.handleSubmitReview}>
                    <div className="field">
                        <label className="label">Reviews</label>
                        <div className="control">
                            <h2>Your Rating: {rating}</h2>
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Opinion</label>
                        <div className="control has-icons-left has-icons-right">
                        <div className="control">
                            <textarea onChange={this.handleInput} name='opinion' value={this.state.opinion} className="textarea" placeholder="Your opinion"></textarea>
                        </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Date</label>
                        <div className="control">
                            <input onChange={this.handleInput} name='date' value={this.state.date} className="input" type="date" placeholder="Date of activity"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Picture</label>
                        <div className="control">
                        <input onChange={this.handleInput} name='review-image' className="input" type="file"/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button handleSubmitReview className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-text">Cancel</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div>
                    { renderReviews }
                    <ul id="page-numbers">
                        { renderPageNumbers }
                    </ul>
                </div>
          </div>
        );
    }
}

 
export default AuthorProfile;