import React, { Component } from 'react';

//redirigirle a su dashboard cuando publique la oferta

//private router
class PublishOffer extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <h1>You can publish an offer!</h1>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control has-icons-left has-icons-right">
                    <div className="control">
                    <input className="input" type="text" placeholder="Title"/>
                    </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control has-icons-left has-icons-right">
                    <div className="control">
                        <textarea className="textarea" placeholder="Description"></textarea>
                    </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input className="input" type="date" placeholder="Date"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Duration</label>
                    <div className="control">
                        <input className="input" type="number" placeholder="Duration"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                        <select>
                            <option>House</option>
                            <option>Fix computer</option>
                            <option>Music</option>
                        </select>
                        </div>
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
            </>
         );
    }
}
 
export default PublishOffer;