const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    completed: { type: Boolean, required: true },
    name: { type: String, required: true },
    sample_img: { type: String, required: true },
    images: { type: Array }
})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;