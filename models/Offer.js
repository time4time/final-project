const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    author:             {type: Schema.Types.ObjectId, ref: 'users'},
    title:              {type: String},
    description:        {type: String},
    date:               {type: Date},
    category:           {type: String, list: ['house', 'technology', 'music', 'repair', 'languages', 'cooking']},
    postalCode:         {type: String},
    status:             {type: String},
})

const Offer = mongoose.model('offers', offerSchema);

module.exports = Offer;