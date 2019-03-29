import React, { Component } from 'react';
import Moment from 'react-moment'


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
                    <p>Author {this.props.authorUsername}</p>
                    <p>Date <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <p>Duration {this.props.duration} hour(s)</p>
                    </div>
                </div>
                <footer className="card-footer">
                {(() => {
                    switch(this.props.status) {
                        case 'Open':
                            return <h1 className="card-footer-item">{this.props.status}</h1>;
                        case 'Pending':
                            return <h1 className="card-footer-item has-background-warning">{this.props.status}</h1>;
                        case 'Approved':
                            return <h1 className="card-footer-item has-background-success">{this.props.status}</h1>;
                        default:
                            return null;
                    }
                })()}
                </footer>
            </div>
        );
    }
}


export default OnePetition;