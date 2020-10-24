const express = require('express');
const router = express.Router();
const ManagerPosition = require('../models/manager-position.model');
const { positionFormatting } = require('../middleware/formatting')

router
  .get('/', async (req, res) => {
    try {
      const positions = await ManagerPosition.find().populate('rate');
      const responce = positions.map(item => positionFormatting(item));

      res.json(responce)
    } catch (error) {
      res.status(400).json(error);
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const position = await ManagerPosition.findById(req.params.id).populate('rate');

      res.json(positionFormatting(position))
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!')
    }
  })
  .post('/', async (req, res) => {
    const { amount, percent, name, rate } = req.body;
    const newPosition = new ManagerPosition({ amount, percent, name, rate });

    try {
      const existPosition = await ManagerPosition.find({ name });

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
    const { percent, name, rate } = req.body;

    try {
      const existPosition = await ManagerPosition.findById(req.params.id);
      
      if (!existPosition) {
        throw new Error('can not find this position')
      }

      existPosition.percent = percent;
      existPosition.name = name;
      existPosition.rate = rate;

      const result = await existPosition.save()
      res.json(positionFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete('/:id', async (req, res) => {

    try {
      const existPosition = await ManagerPosition.findById(req.params.id);

      if (!existPosition) {
        throw new Error('can not find this position')
      }

      const result = existPosition.delete();
      res.json(positionFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;