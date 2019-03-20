import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const display ={
    display: 'block'
};

const hide ={
    display: 'none'
}

class DisplayOffers extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state={
            toggle:false
        }
    }
    
    toggle(event){
        this.setState((prevState) =>({
            toggle: !prevState.toggle
        }));
    }

    render() { 
        let modal = []
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide}>
            <div className="modal-background"></div>
                <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Offer Title</p>
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
                        <p>John Doe</p>
                        <p className="modal-card-title">Time in the app: </p>
                        <p className="modal-card-title">Califications </p>
                    </div>
                    </div>
                <h1 className="modal-card-title">Description</h1>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede </p>
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
        )
            return ( 
                <>
                <h1>Ofertas disponibles</h1>


                <div className="list is-hoverable">
                
                        listado ofertas
                        <h3>Title</h3>
                        <h3>Date</h3>
                        <div>
                            <Link className='btn' onClick={this.toggle}>{this.state.toggle ? 'Close Offer' :
                                'Open offer'}</Link>
                            {modal}
                        </div>
                
                        </div>
                </>
            );
    }
}
 
export default DisplayOffers;