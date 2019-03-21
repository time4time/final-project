import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './Search'
import DisplayMap from './DisplayMap'


//first page(render map, search, this component it's public)
class Main extends Component {
    state = { 

     }
    render() { 
        return ( 
            <>
            <h1>Main page</h1>
            <Link>
                <button className="button is-success">Publish offer!</button>
            </Link>
            <Search/>
            <DisplayMap />
            </>
         );
    }
}
 
export default Main;