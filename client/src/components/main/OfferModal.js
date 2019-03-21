import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const display = {
    display: 'block'
};

const hide = {
    display: 'none'
}

class OfferModal extends Component {
    state = {  }
    render() { 
        return (
                <div className="modal" style={this.props.toggle ? display : hide}>
                <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{this.props.title}</p>
                            <Link>
                                <button className="delete" onClick={this.toggle} aria-label="close"></button>
                            </Link>
                        </header>
                        <section className="modal-card-body">
                            <div className='media'>
                            <p className="image is-64x64">
                                <img src="lightscape-741984-unsplash.jpg" alt=''></img>
                            </p>
                                <div className="content">
                                    <p className="modal-card-title">Name: </p>
                                    <p>{this.props.author}</p>
                                    <p className="modal-card-title">Time in the app: </p>
                                    <p className="modal-card-title">Califications </p>
                                    <Link>
                                        <button className="button is-success">See more</button>
                                    </Link>
                                </div>
                            </div>
                        <h1 className="modal-card-title">Description</h1>
                            <p>{this.props.description}</p>
                            <p>{this.props.category}</p>
                        <h1 className="modal-card-title">Date</h1>
                            <p>algun dia a las 12:30 pm</p>
                            <p>2 hours</p>
                        </section>
                        <footer className="modal-card-foot">
                        {/* <button className="button is-success"> Close</button> */}
                            <Link>
                                <button className="button is-success">Apply </button>
                            </Link>
                        </footer>
                    </div>
                </div>
        );
    }
}
 
export default OfferModal;