const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Number, required: true }
})

const User = mongoose.model('User', userSchema);

module.exports = User;