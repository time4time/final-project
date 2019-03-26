import React, { Component } from 'react';

class OnePetition extends Component {
    render() { 
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                    {this.props.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                    {this.props.authorUsername}
                    <time datetime="2016-1-1">{this.props.date}></time>
                    <p>{this.props.duration}</p>
                    </div>
                </div>
                <footer className="card-footer">
                    <h1 className="card-footer-item"> {this.props.status}</h1>
                </footer>
            </div>
        );
    }
}
 
export default OnePetition;