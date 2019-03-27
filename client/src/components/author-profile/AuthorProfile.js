import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import config from '../../config.json'
import Moment from 'react-moment'



//axios reviews


class AuthorProfile extends Component {
    constructor() {
        super();
        this.state = {
          rating: 1,
          authorProfile:{}
          
        };
    this.form = React.createRef()

    
    }
    // onStarClick(nextValue, prevValue, name) {
    //     this.setState({rating: nextValue});
    // }
    
 
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

      componentDidMount() {
       
        this.getAuthorInfo()
    }
    
    handleSubmitReview = (event) => {
        event.preventDefault();
        let formData = new FormData(this.form.current) 
        debugger
        axios({
            method: 'post',
            url: `${config.api}/author-profile`,
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData,
            withCredentials : true,
        }).then(databaseResponse => {
            debugger
            this.props.history.push('/dashboard')
        }).catch(err => {
            debugger
            this.setState({error: 'Could not add your review'})
            // this.props.history.push('/signup')
        })
    }
    
    render() {

        // const { rating } = this.state;
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
                                <p>In the app from: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.authorProfile.registrationDate}</Moment></p>
                            </div>
                        </div>
                        <div className="content">
                        <p>{this.state.authorProfile.description}</p>
                            <br></br>
                            <p>The time is now: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.authorProfile.date}</Moment></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                <form ref={this.form} onSubmit={this.handleSubmitReview}>
                    <div>
                        <h1>About</h1>
                        <h2>{this.state.authorProfile.firstname} </h2>
                        <h3>Time in the app: </h3>
                        <h3>Ratings: </h3>
                        <h3>Bio:</h3>
                        <p>{this.state.authorProfile.description}</p>
                    </div>
                    <div className="field">
                        <label className="label">Rating</label>
                        <div className="control">
                            {/* <h2>Rating: {rating}</h2> */}
                            {/* <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick}
                            /> */}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Opinion</label>
                        <div className="control has-icons-left has-icons-right">
                        <div className="control">
                            <textarea name='opinion'className="textarea" placeholder="Your opinion"></textarea>
                        </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Date</label>
                        <div className="control">
                        {/* Poner que le salga automaticamente la fecha de hoy */}
                            <input className="input" type="date" placeholder="Date of activity"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Pictures</label>
                        {/* hacer lo de moodle por la tarde */}
                        <div className="control">
                        <input onChange={this.handleInput} name='image' className="input" type="file"/>
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
          </div>
        );
    }
}
 
export default AuthorProfile;