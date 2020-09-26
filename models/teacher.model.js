const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    education: { type: String, required: true },
    year: { type: Number, required: true },
    expiriense: { type: Number, required: true },
    teachHours: { type: Number, default: 0 },
    concertHours: { type: Number, default: 0 },
    pedagogicTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PedagogicTitle',
        default: null
    },
    rate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rate',
        required: true
    },
    managerPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManagerPosition',
        default: null
    },
    departmentHead: {type: String}
})

module.exports = mongoose.model('Teacher', teacherSchema);