const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:           {type: String, unique: true},
    email:              {type: String, unique: true},
    password:           {type: String},
    firstname:          {type: String},
    lastname:           {type: String},
    birth:              {type: Date},
    registrationDate:   {type: Date, default: Date.now},
    postalCode:         {type: String},
    ratings:            [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    timeWallet:         {type: Number},
    offersCreated:      [{type: Schema.Types.ObjectId, ref: 'offers'}],
    offersRequested:    [{type: Schema.Types.ObjectId, ref: 'offers'}]
});

const User = mongoose.model('users', userSchema);

module.exports = User;