import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json'
import OfferModal from './OfferModal'
import { Link } from 'react-router-dom'


class DisplayOffers extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state={
            toggle: false,
            listOfOffers: [],
            currentPage: 1,
            offersPerPage: 5
        }
    }
    
    toggle(offerId){
        this.setState(() =>({
            toggle: offerId
        }));
    }

    getAllOffers = () =>{
        axios({
          method: "get",
          url: `${config.api}/display-offers`,
          withCredentials: true
        })
        .then(responseFromApi => {
          this.setState({
            listOfOffers: responseFromApi.data
          })
        })
        .catch(err => {
            console.log('error')
        })
    }

    handlePageClick = (event) => {
        this.setState({currentPage: Number(event.target.id)})
    }

    componentDidMount() {
        this.getAllOffers();
    }

    render() { 
        const { listOfOffers, currentPage, offersPerPage } = this.state

        const indexOfLastOffer = currentPage * offersPerPage
        const indexOfFirstOffer = indexOfLastOffer - offersPerPage
        const currentOffers = listOfOffers.slice(indexOfFirstOffer, indexOfLastOffer)

        const renderOffers = currentOffers.map((offer) => {
            return (
                <div key={offer._id}>
                    <div className="tile is-ancestor">
                        <div className="tile is-child box">
                                <h3>{offer.title}</h3>
                                <h4>{offer.authorUsername}</h4>
                                <p>{offer.description}</p>
                                <p>{offer.category}</p>
                            <Link className='btn' onClick={()=> {this.toggle(offer._id)}}>Open offer</Link>
                        </div>
                    </div>
                    <OfferModal {...this.props} close={this.toggle} 
                        toggle={this.state.toggle === offer._id} 
                        offerIdentificator={offer._id}
                        title={offer.title} 
                        image={offer.image}
                        author={offer.author}
                        authorUsername={offer.authorUsername} 
                        authorProfileImage={offer.authorProfileImage}
                        description={offer.description} 
                        category={offer.category}
                        dateOffer={offer.date}
                        durationOffer={offer.duration}

                    />
                </div>
            )
        })

        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(listOfOffers.length / offersPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })

        const currentFilteredOffers = this.props.filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer)

        let renderFilteredOffers = currentFilteredOffers.map((filteredOffer) => {
            return (
                <div key={filteredOffer._id}>
                    <div className="tile is-ancestor">
                        <div className="tile is-child box">
                                <h3>{filteredOffer.title}</h3>
                                <img src={`${config.api}/${filteredOffer.authorProfileImage}`} alt=""/>
                                <h4>{filteredOffer.authorUsername}</h4>
                                <p>{filteredOffer.description}</p>
                                <p>{filteredOffer.category}</p>
                            <Link className='btn' onClick={()=> {this.toggle(filteredOffer._id)}}> Open offer</Link>
                        </div>
                    </div>
                    <OfferModal  {...this.state} {...this.props} close={this.toggle} 
                        toggle={this.state.toggle === filteredOffer._id} 
                        offerIdentificator={filteredOffer._id}
                        title={filteredOffer.title} 
                        image={filteredOffer.image}
                        author={filteredOffer.author}
                        authorUsername={filteredOffer.authorUsername}
                        authorProfileImage={filteredOffer.authorProfileImage}
                        description={filteredOffer.description} 
                        category={filteredOffer.category}
                        dateOffer={filteredOffer.date}
                        durationOffer={filteredOffer.duration}
                    />
                </div>
            )
        })

        const pageFilteredNumbers = []
        for (let i = 1; i <= Math.ceil(this.props.filteredOffers.length / offersPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderFilteredPageNumbers = pageFilteredNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })


            return ( 
                <>
                { this.props.filteredOffers.length > 0 ? 
                 <div>

                 <h1>Available offers</h1>

                 <div className="list is-hoverable">
                            { renderFilteredOffers }
                            <ul id="page-numbers">
                                { renderFilteredPageNumbers }
                            </ul>
                 </div>
             </div>

                :

                <div>
                    <h1>Available offers</h1>
                    <div className="list is-hoverable">
                            { renderOffers }
                            <ul id="page-numbers">
                                { renderPageNumbers }
                            </ul>
                    </div>
                </div>
                        }
                        </>
            );
    }
}


export default DisplayOffers;