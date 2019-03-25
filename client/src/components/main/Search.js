import React, { Component } from 'react';
import DisplayOffers from './DisplayOffers';
import axios from 'axios';
import config from '../../config.json'

class Search extends Component {
    constructor(props){
        super(props)
    this.state = { 
        postalcode:      '',
        house:      '',
        technology:   '',
        music:      '',
        repair:     '',
        languages:  '',
        cooking:    '',
     }
    }

    //input postal code
    handleInput = (event)=> {
        let generalSearch = {} //empty object
        generalSearch[event.target.name] = event.target.value
        this.setState(generalSearch)
        
    }

    handleCheck = (event)=> {
        let generalSearch = {} //empty object
        generalSearch[event.target.name] = event.target.name
        this.setState(generalSearch)
        
    }

    //submit button
    handleSubmit = (event) =>{
        event.preventDefault();
        let newSearch = this.state  
        axios({
        method: 'post',
          url: `${config.api}/search`,
          data: newSearch,
          withCredentials : true,
          }).then(databaseResponse => {
            this.setState({databaseResponse})
          }).catch(err => {

            
        //   this.props.history.push('/')
          })
    }
    

    render() { 
        return ( 
            <>
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Postal code</label>
                    <div className="control">
                    <input onChange={this.handleInput} name='postalcode'className="input" 
                    type="text" placeholder="Postal code" value={this.state.postalcode}/>
                    </div>
                </div>
            
                <label className="checkbox">
                    <input onChange={this.handleCheck} name='house' type="checkbox" />
                        House
                </label>

                <label className="checkbox">
                    <input onChange={this.handleCheck} name='technology'type="checkbox" />
                        Technology
                </label>

                <label className="checkbox">
                    <input onChange={this.handleCheck} name='music'type="checkbox" />
                        Music
                </label>

                <label className="checkbox">
                    <input onChange={this.handleCheck} name='repair'type="checkbox" />
                        Repair
                </label>

                <label className="checkbox">
                    <input onChange={this.handleCheck} name='languages'type="checkbox" />
                        Languages
                </label>

                <label className="checkbox">
                    <input onChange={this.handleCheck} name='cooking'type="checkbox" />
                        Cooking
                </label>

                <div className="control">
                    <button className="button is-link">Search </button>
                </div>

            </form>
           
        
            <DisplayOffers {...this.props} filteredOffers={this.state.databaseResponse}
            
            
            
            
            />
            
            </>

         );
    }
}
 
export default Search;