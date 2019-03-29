import React, { Component } from 'react';
import DisplayOffers from './DisplayOffers';
import axios from 'axios';
const config = process.env

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
        filteredOffers: []
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
          url: `${config.REACT_APP_api}/search`,
          data: newSearch,
          withCredentials : true,
          }).then(databaseResponse => {
            this.setState({filteredOffers: databaseResponse.data})
          }).catch(err => {
              this.setState({error: 'Something went wrong! We could not do the search'})
          })
    }
    

    render() { 
        return ( 
            <div className="container is-fluid">
            <div className="columns">
            <div className="column is-2">
            <form onSubmit={this.handleSubmit} className="section">
                
                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='house' type="checkbox" />
                        House
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='technology'type="checkbox" />
                        Technology
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='music'type="checkbox" />
                        Music
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='repair'type="checkbox" />
                        Repair
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='languages'type="checkbox" />
                        Languages
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='cooking'type="checkbox" />
                        Cooking
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