const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const cors = require('cors')

const rate = require('./routes/rate');
const managerPosition = require('./routes/manager-position');
const employeePosition = require('./routes/employee-position')
const teacher = require('./routes/teacher')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'))
app.use(cors())

app.use('/', (req, res) => res.end(`<div>Hello</div>`))
app.use('/rate', rate);
app.use('/manager-position', managerPosition);
app.use('/employee-position', employeePosition);
app.use('/teacher', teacher)

module.exports = app;
