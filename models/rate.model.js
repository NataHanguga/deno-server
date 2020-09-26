const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    money: { type: Number, required: true },
    title: { type: String }
});

module.exports =  mongoose.model('Rate', rateSchema)