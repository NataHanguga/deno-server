const express = require('express');
const EmployeePosition = require('../models/employee.model');
const router = express.Router();
const { positionFormatting } = require('../middleware/formatting')

router
  .get('/', async (req, res) => {
    try {
      const positions = await EmployeePosition.find().populate('rate');
      const responce = positions.map(item => positionFormatting(item));

      res.json(responce)
    } catch (error) {
      res.status(400).json(error);
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const position = await EmployeePosition.findById(req.params.id).populate('rate');

      res.json(positionFormatting(position))
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!')
    }
  })
  .post('/', async (req, res) => {
    const { amount, percent, name, rate } = req.body;
    const newPosition = new EmployeePosition({ amount, percent, name, rate });

    try {
      const existPosition = await EmployeePosition.find({ name });

      if (existPosition.length) {
        throw new Error('manager position already exist' + JSON.stringify(existPosition));
      }

      const result = await newPosition.save();

      res.json(positionFormatting(result));
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .put('/:id', async (req, res) => {
    const { percent, name, rate, amount } = req.body;

    try {
      const existPosition = await EmployeePosition.findById(req.params.id);

      if (!existPosition) {
        throw new Error('can not find this position')
      }

      existPosition.percent = percent;
      existPosition.name = name;
      existPosition.rate = rate;
      existPosition.amount = amount;

      const result = await existPosition.save()
      res.json(positionFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete('/:id', async (req, res) => {

    try {
      const existRate = await EmployeePosition.findById(req.params.id);

      if (!existRate) {
        throw new Error('can not find this position')
      }

      const result = existRate.delete();
      res.json(positionFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;