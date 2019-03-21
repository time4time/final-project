const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

mongoose.connect('mongodb://localhost/timefortime', { useNewUrlParser: true }, function(err) {
   if(err) console.log("ERROR")
   else console.log("connected")
})

const Message = require('../models/Message')
const Offer = require('../models/Offer')
const User = require('../models/User')
const Review = require('../models/Review')

Message.collection.drop()
Offer.collection.drop()
Review.collection.drop()
User.collection.drop()

const messages = [
    {
        title: "Hey",
        bodyMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dateMessage: undefined,
        sender: "cosmonauta",
        receiver: "froilan"
    },
    {
        title: "Morning!",
        bodyMessage: "Maecenas accumsan arcu non porttitor semper.",
        dateMessage: undefined,
        sender: "letizia",
        receiver: "luli"
    },
    {
        title: "Bye byeee!",
        bodyMessage: "Nam sit amet lorem lectus.",
        dateMessage: undefined,
        sender: "kenita",
        receiver: "zamorano"
    },
]


let offers = [
    {
        author: "cosmonauta",
        title: "Learn how to purr",
        description: "Look but don't touch",
        date: undefined,
        category: "home"
    },
    {
        author: "kenita",
        title: "We were on break",
        description: "Let it go",
        date: undefined,
        category: "music"
    },
    {
        author: "luli",
        title: "Always strong",
        description: "Never instrong",
        date: undefined,
        category: "electronic"
    },
]

const users = [
    {
        username: "cosmonauta",
        email: "cosmonauta@gmail.com",
        password: "123456",
        firstname: "Cosmonauta",
        lastname: "Comandante de las estrellas",
        birth: undefined,
        registrationDate: undefined,
        postalCode: "1086XT",
        ratings: undefined,
        timeWallet: 3,
        offersCreated: undefined,
        offersRequested: undefined
    },
    {
        username: "kenita",
        email: "kenita@gmail.com",
        password: "123456",
        firstname: "Kenita",
        lastname: "Larrain",
        birth: undefined,
        registrationDate: undefined,
        postalCode: "1077ZX",
        ratings: undefined,
        timeWallet: 5,
        offersCreated: undefined,
        offersRequested: undefined
    },
    {
        username: "luli",
        email: "luli@gmail.com",
        password: "123456",
        firstname: "Nicole",
        lastname: "Moreno",
        birth: undefined,
        registrationDate: undefined,
        postalCode: "1016BT",
        ratings: undefined,
        timeWallet: 1,
        offersCreated: undefined,
        offersRequested: undefined
    }
]

const reviews = [
    {
        rating: 5,
        opinion: "Sed ex eros, fringilla ut molestie eu, consectetur non ante.",
        date: undefined,
        picture: undefined,
        reviewer: ["luli"],
        userReviewed: ["kenita"],
    },
    {
        rating: 1,
        opinion: "Nullam eget elementum eros, eget egestas enim. Aenean placerat ligula vitae justo venenatis congue. Ut mollis rhoncus leo a scelerisque.",
        date: undefined,
        picture: undefined,
        reviewer: ["zamorano"],
        userReviewed: ["kenita"],
    },
    {
        rating: 3,
        opinion: "Morbi lobortis lacinia elit, vitae ultricies nulla ornare nec.",
        date: undefined,
        picture: undefined,
        reviewer: ["froilan"],
        userReviewed: ["letizia"],
    }
]


//Seed the database
Message.create(messages,(err) =>{
    if(err) console.log(err);
    else console.log('Messages collection seeded successfully');
});

Offer.create(offers,(err) =>{
    if(err) console.log(err);
    else console.log('Offers collection seeded successfully');
});

User.create(users,(err) =>{
    if(err) console.log(err);
    else console.log('User collection seeded successfully');
});

Review.create(reviews,(err) =>{
    if(err) console.log(err);
    else console.log('Reviews collection seeded successfully');
});