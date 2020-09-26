const mongoose = require('mongoose');
const positionSchema = new mongoose.Schema({
    amount: { type: Number, required: true, default: 1 },
    percent: { type: Number, default: 100, required: false },
    name: { type: String, required: true },
    teachHours: {type: Number, default: 1 },
    rate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rate'
    }
})

module.exports = mongoose.model('ManagerPosition', positionSchema);