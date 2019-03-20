import React, { Component } from 'react';
import DisplayOffers from './DisplayOffers';
class Search extends Component {
    state = {  }
    render() { 
        return ( 
            <>
     {/* funcion con axios para conseguir ofertas */}
            <form>
                <div className="field">
                    <label className="label">Postal code</label>
                    <div className="control">
                    <input className="input" type="text" placeholder="Text input"/>
                    </div>
                </div>
            
                <label className="checkbox">
                    <input type="checkbox" />
                        House
                </label>

                <label className="checkbox">
                    <input type="checkbox" />
                        Fix computer
                </label>

                <label className="checkbox">
                    <input type="checkbox" />
                        Music
                </label>


                <div className="control">
                    <button className="button is-link">Search </button>
                </div>

            </form>
           
        
            <DisplayOffers/>
            </>

         );
    }
}
 
export default Search;