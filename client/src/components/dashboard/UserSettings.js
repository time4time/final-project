import React, { Component } from 'react';
import axios  from 'axios';
import config from "../../config.json";
// import { setFlagsFromString } from 'v8';



//editar foto de perfil, codigo postal, password, email

class UserSettings extends Component {
    constructor(props) {
        super(props)
        this.form = React.createRef()
    }
    state = {
        email: '',
        postalCode: '',
        user: [],
        error: '',
        success: '',
        
    }
    handleInput = (event)=> {
        let myInput = {} //empty object
        myInput[event.target.name] = event.target.value
        this.setState(myInput)
    }

    handleSubmitProfileImage = (event) => {
        event.preventDefault();
        let formData = new FormData(this.form.current) 
        debugger
        axios({
            method: 'post',
            url: `${config.api}/profile-image`,
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData,
            withCredentials : true,
        }).then(databaseResponse => {
            this.props.history.push('/')
        }).catch(err => {
            debugger
            this.setState({error: 'Could not edit personal information'})
            // this.props.history.push('/signup')
        })
    }
    handleSubmitPersonalInfo = (event) => {
        event.preventDefault();
        let editUser = this.state
        debugger
        axios({
            method: 'post',
            url: `${config.api}/user-settings`,
            data: editUser,
            withCredentials : true,
        }).then(databaseResponse => {
            debugger
            this.props.history.push('/')
        }).catch(err => {
            debugger
            this.setState({error: 'Could not edit personal information'})
            // this.props.history.push('/signup')
        })
    }

    render() { 
        return (
                <section>
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">User's settings</h3>
                                <div className="box">
                                    <form ref={this.form} onSubmit={this.handleSubmitProfileImage}>
                                        <div className="field">
                                        <label className="label">Image</label>
                                            <div className="control">
                                                <input onChange={this.handleInput} name='profile-image' className="input" type="file"/>
                                            </div>
                                        </div>
                                        <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                        <button className="button is-block is-info is-large is-fullwidth" value="submit">Edit profile image</button>
                                    </form>
                                </div>
                                <div className="box">
                                    <form onSubmit={this.handleSubmitPersonalInfo}>
                                        <div className="field">
                                            <div className="control">
                                                <p>{this.state.user.firstname}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.lastname}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.username}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input onChange={this.handleInput} className="input is-large" type="email" name="email" placeholder="e-mail" value={this.state.email}/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.birth}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input onChange={this.handleInput} className="input is-large" type="text" name="postalCode" placeholder="Postal Code" value={this.state.postalCode}/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input onChange={this.handleInput} className="input is-large" type="password" name="password" placeholder="Password" value={this.state.password} pattern="^[a-zA-Z0-9]{8,}$" title="At least 8 characters"/>
                                                <span className="icon is-small is-left">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                        <button className="button is-block is-info is-large is-fullwidth" value="submit">Edit personal information</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}
 
export default UserSettings;