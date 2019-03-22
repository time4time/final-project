import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="" width="112" height="28"></img>
                    </NavLink>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink to='/' className="navbar-item">Home</NavLink>
                        <NavLink to='/dashboard' className="navbar-item">Dashboard</NavLink>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <NavLink to="/dashboard" >
                                    {/* tal vez hay que pasar algun tipo de info para que enseñe los mensajes */}
                                        <i className="fas fa-envelope"></i>
                                    </NavLink>
                                </p>
                                <p className="control">
                                    <NavLink to="/publish-offer" >
                                        <button className="button is-success">Publish new offer</button>
                                    </NavLink>
                                </p>
                                <p className="control">
                                    <NavLink to="/signup">SignUp</NavLink>
                                </p>
                                <p className="control">
                                    <NavLink to="/login">Login</NavLink>
                                </p>
                                <p className="control">
                                    <NavLink to="/login" >Logout</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>            
         );
    }
}
 
export default Nav;