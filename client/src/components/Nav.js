import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import config from '../config.json'


//Named exports

export const UnauthNav = class UnauthNav extends Component {
    constructor(props){
        super(props)
        this.state={
            dropdownMenu: "navbar-dropdown is-hidden"
        }
    }
    logMeOut = ()=> {
        axios({
            method: "post",
            url: `${config.api}/logout`,
            withCredentials: true,
        })
        .then((response)=> {
            this.props.logOut()
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    toggleDropdownMenu = () => {
        if( this.state.dropdownMenu === "navbar-dropdown is-hidden") this.setState({dropdownMenu: "navbar-dropdown"})
        else this.setState({dropdownMenu: "navbar-dropdown is-hidden"})
    }
    render() { 
        return ( 
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="" width="112" height="28"></img>
                    </NavLink>
                    <div onClick={this.toggleDropdownMenu} className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={this.state.dropdownMenu}>
                    <NavLink onClick={this.toggleDropdownMenu} to='/' className="navbar-item">
                    Home
                    </NavLink>
                    <NavLink onClick={this.toggleDropdownMenu} to="/login" className="navbar-item">
                    Login
                    </NavLink>
                    <NavLink onClick={this.toggleDropdownMenu} to="/signup" className="navbar-item">
                    Sign up
                    </NavLink>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink to='/' className="navbar-item">Home</NavLink>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <NavLink to="/login">Login</NavLink>
                                </p>
                                <p className="control">
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>            
         );
    }
}


export const AuthNav = class AuthNav extends Component {
    constructor(props){
        super(props)
        this.state={
            dropdownMenu: "navbar-dropdown is-hidden"
        }
    }
    logMeOut = ()=> {
        axios({
            method: "post",
            url: `${config.api}/logout`,
            withCredentials: true,
        })
        .then((response)=> {
            this.props.logOut()
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    toggleDropdownMenu = () => {
        if( this.state.dropdownMenu === "navbar-dropdown is-hidden") this.setState({dropdownMenu: "navbar-dropdown"})
        else this.setState({dropdownMenu: "navbar-dropdown is-hidden"})
    }
    render() { 
        return ( 
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="" width="112" height="28"></img>
                    </NavLink>
                    <div onClick={this.toggleDropdownMenu} className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={this.state.dropdownMenu}>
                    <NavLink onClick={this.toggleDropdownMenu} to='/' className="navbar-item">
                    Home
                    </NavLink>
                    <NavLink onClick={this.toggleDropdownMenu} to="/dashboard" className="navbar-item">
                    Dashboard
                    </NavLink>
                    <NavLink onClick={this.toggleDropdownMenu} to="/publish-offer" className="navbar-item">
                    Publish new offer
                    </NavLink>
                    <NavLink onClick={this.toggleDropdownMenu} to="/login" className="navbar-item">
                    Logout
                    </NavLink>
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
                                <p className="control">Hello, <NavLink to="/dashboard">{this.props.username}</NavLink></p>
                                {/* <NavLink className='title is-1 is-spaced'>Hello, {this.props.username}</NavLink> */}

                                <p className="control">
                                    <NavLink to="/login" onClick={this.logMeOut}>Logout</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>            
         );
    }
}