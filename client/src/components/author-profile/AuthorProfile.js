import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';


//axios reviews


class AuthorProfile extends Component {
    constructor() {
        super();
        this.state = {
          rating: 1
        };
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }    
    render() {
        const { rating } = this.state;
        return (
            <div className="colummns">
                <div className="card column is-one-quarter">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="User profile"></img>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">John Smith</p>
                                <p className="subtitle is-6">Time in the app: 2 years</p>
                            </div>
                        </div>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris.
                            <br></br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div>
                        <h1>About</h1>
                        <h2>Name: </h2>
                        <p>John Doe</p>
                        <h3>Time in the app: </h3>
                        <h3>Califications: </h3>
                        <h3>Bio:</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris.</p>
                    </div>
                    <div className="field">
                        <label className="label">Rating</label>
                        <div className="control">
                            <h2>Rating: {rating}</h2>
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Opinion</label>
                        <div className="control has-icons-left has-icons-right">
                        <div className="control">
                            <textarea className="textarea" placeholder="Textarea"></textarea>
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
                            <textarea className="textarea" placeholder="Textarea"></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-text">Cancel</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}
 
export default AuthorProfile;