import React, { Component } from 'react';
import axios from 'axios';
import OfferModal from './OfferModal'
import { Link } from 'react-router-dom'
// const config = process.env
import config from '../../config.json'

//this component display all offers in the main page with OPEN status
//pending and close offers, don't show in main page

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
        //   url: `${config.REACT_APP_api}/display-offers`,
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
        //Set pagination for list of offers
        const { listOfOffers, currentPage, offersPerPage } = this.state
        const indexOfLastOffer = currentPage * offersPerPage
        const indexOfFirstOffer = indexOfLastOffer - offersPerPage
        const currentOffers = listOfOffers.slice(indexOfFirstOffer, indexOfLastOffer)
        const renderOffers = currentOffers.map((offer) => {
            return (
                <div key={offer._id}>
                    <div className="tile is-ancestor">
                        <div className="tile is-child box">
                                <h3 className="title">{offer.title}</h3>
                                <h4><strong>User</strong>: {offer.authorUsername}</h4>
                                <p>{offer.postalCode}</p>
                                <p>{offer.description}</p>
                                <p><strong>Category</strong>: {offer.category}</p>
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
                        postalCode={offer.postalCode}
                        description={offer.description} 
                        category={offer.category}
                        dateOffer={offer.date}
                        durationOffer={offer.duration}
                    />
                </div>
            )
        })

        //Numbers for pagination
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
                    className="page-numbers column"
                >
                    {number}
                </li>
            )
        })

        //Pagination for the list of offers you get when you search
        const currentFilteredOffers = this.props.filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer)

        let renderFilteredOffers = currentFilteredOffers.map((filteredOffer) => {
            return (
                <div key={filteredOffer._id}>
                    <div className="tile is-ancestor">
                        <div className="tile is-child box">
                                <h3 className="title">{filteredOffer.title}</h3>
                                {/* <img src={`${config.REACT_APP_api}/${filteredOffer.authorProfileImage}`} alt=""/> */}
                                <img src={`${config.api}/${filteredOffer.authorProfileImage}`} alt=""/>
                                <h4><strong>User</strong>: {filteredOffer.authorUsername}</h4>
                                <p>{filteredOffer.postalCode}</p>
                                <p>{filteredOffer.description}</p>
                                <p><strong>Category</strong>: {filteredOffer.category}</p>
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
                        postalCode={filteredOffer.postalCode}
                        description={filteredOffer.description} 
                        category={filteredOffer.category}
                        dateOffer={filteredOffer.date}
                        durationOffer={filteredOffer.duration}
                    />
                </div>
            )
        })

        //Numbers for the list obtained after searching
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
                    className="page-numbers column"
                >
                    {number}
                </li>
            )
        })


            return ( 
                <>
                {/* Ternary operator to show the whole list of offers or the filtered one 
                if you have done a search */}
                { this.props.filteredOffers.length > 0 ? 
                 <div>
                    <div className="list is-hoverable">
                            { renderFilteredOffers }
                            <div className="columns page-numbers-column">
                                <ul id="page-numbers" className="level column is-half is-offset-one-quarter columns">
                                    { renderFilteredPageNumbers }
                                </ul>
                            </div>
                    </div>
                </div>

                :

                <div>
                    <div className="list is-hoverable">
                            { renderOffers }
                            <div className="columns page-numbers-column">
                                <ul id="page-numbers" className="level column is-half is-offset-one-quarter columns">
                                    { renderPageNumbers }
                                </ul>
                            </div>
                    </div>
                </div>
                        }
                        </>
            );
    }
}


export default DisplayOffers;