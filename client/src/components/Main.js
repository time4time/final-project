import React, { Component } from 'react';
import Search from './Search'
import DisplayMap from './DisplayMap'
import { Link } from 'react-router-dom'


//first page(render map, search, this component it's public)
class Main extends Component {
    state = { 

     }
    render() { 
        return ( 
            <>
            <h1>Main page</h1>
            <Link>
            <button class="button is-success">Publish offer!</button>
            </Link>
            <Search/>
            <DisplayMap />
          
            </>
         );
    }
}
 
export default Main;