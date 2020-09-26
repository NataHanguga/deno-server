const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    amount: { type: Number, required: true, default: 1 },
    percent: { type: Number },
    name: { type: String, required: true },
    rate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rate'
    }
})

module.exports = mongoose.model('EmployeePosition', employeeSchema);