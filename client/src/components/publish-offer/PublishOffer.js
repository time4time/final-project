import React, { Component } from 'react';
import axios from 'axios'
import config from '../../config.json'

//redirigirle a su dashboard cuando publique la oferta

//private router
class PublishOffer extends Component {

    constructor(props){
        super(props)
        this.state = { 
            title:          '',
            postalcode:     '',
            description:    '',
            date:           '',
            duration:       '',
            category:       '',
        }
    }

    //input postal code
    handleInput = (event)=> {
        let publish = {} //empty object
        publish[event.target.name] = event.target.value
        this.setState(publish)
        
    }

    //submit button
    handleSubmit = (event) =>{
        event.preventDefault();
        let newOffer = this.state  
        axios({
        method: 'post',
          url: `${config.api}/publish-offer`,
          data: newOffer,
          withCredentials : true,
          
          }).then(databaseResponse => {
            this.setState({databaseResponse})
            this.props.history.push('/')
          }).catch(err => {
          
        //   this.props.history.push('/')
          })
    }
 
    render() { 
        return ( 
            <>
            <form onSubmit={this.handleSubmit}>
               
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control has-icons-left has-icons-right">
                    <div className="control">
                    <input onChange={this.handleInput} name='title' className="input" type="text" placeholder="Title" value={this.state.title}/>
                    </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Postal code</label>
                    <div className="control has-icons-left has-icons-right">
                    <div className="control">
                    <input onChange={this.handleInput} name='postalcode' className="input" type="text" placeholder="1077XT" value={this.state.postalcode}/>
                    </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control has-icons-left has-icons-right">
                    <div className="control">
                        <textarea onChange={this.handleInput} name='description'className="textarea" placeholder="Description" value={this.state.description}/>
                    </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input onChange={this.handleInput} name='date'className="input" type="date" placeholder="Date" value={this.state.date}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Duration</label>
                    <div className="control">
                        <input onChange={this.handleInput} name='duration' className="input" type="number" placeholder="Duration" value={this.state.duration}/>
                    </div>
                </div>
                <div className="field">
                    <label  className="label">Category</label>
                    <div className="control">
                        <div className="select">
                        <select name='category' value={this.state.category} onChange={this.handleInput}>
                            <option value='house'>House</option>
                            <option value='technology'>Technology</option>
                            <option value="music">Music</option>
                            <option value="repair">Repair</option>
                            <option value="languages">Languages</option>
                            <option value="cooking">Cooking</option>
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
                </form>
            </>
         );
    }
}
 
export default PublishOffer;