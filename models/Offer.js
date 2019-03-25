const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerSchema = new Schema({
    author:             {type: Schema.Types.ObjectId, ref: 'users'},
    authorUsername:     {type: String},
    authorMail:         {type: String},
    postalCode:         {type: String},
    title:              {type: String},
    description:        {type: String},
    date:               {type: Date  },
    duration:           {type: Number},
    category:           {type: String, list: ['house', 'technology', 'music', 'repair', 'languages', 'cooking']},
    status:             {type: String, enum: ['open', 'pending', 'approved']},
    userRequest:        {type: String},
    image:              {type: String}
})

const Offer = mongoose.model('offers', offerSchema);

module.exports = Offer;