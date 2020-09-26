const mongoose = require('mongoose');
const headSchema = new mongoose.Schema({
    percent: { type: Number, default: 15 },
    department: {type: String, required: true},
    teacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher' 
    }
})

module.exports = mongoose.model('DepartmentHead', headSchema);