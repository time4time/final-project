import React, { Component } from 'react';
import DisplayOffers from './DisplayOffers';
import axios from 'axios';
import config from '../../config.json'

//render general search
class Search extends Component {
    constructor(props){
        super(props)
    this.state = { 
        house:      '',
        technology:   '',
        music:      '',
        repair:     '',
        languages:  '',
        cooking:    '',
        filteredOffers: [],
     }
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
        //   url: `${config.REACT_APP_api}/search`,
          data: newSearch,
          withCredentials : true,
          }).then(databaseResponse => {
            this.setState({
            filteredOffers: databaseResponse.data})
          }).catch(err => {
              this.setState({error: 'Something went wrong! We could not do the search'})
          })
    }
    

    render() { 
        return ( 
            <div className="container is-fluid">
            <div className="columns">
            <div className="search-column column is-2">
            <form onSubmit={this.handleSubmit} className="section">
                
                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='house' type="checkbox"/>
                    &nbsp;House &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='technology'type="checkbox" />
                    &nbsp;Technology &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='music'type="checkbox" />
                    &nbsp;Music &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='repair'type="checkbox" />
                    &nbsp;Repair &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='languages'type="checkbox" />
                    &nbsp;Languages &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='cooking'type="checkbox" />
                    &nbsp;Cooking
                </label>

                <div className="control level">
                    <button className="button is-link">Search </button>
                </div>
                <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
            </form>
            </div>

            <div className="column">
            <DisplayOffers {...this.props} filteredOffers={this.state.filteredOffers}
            />
            </div>
            </div>
            
            </div>

         );
    }
}
 
export default Search;