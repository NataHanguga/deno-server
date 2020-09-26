const express = require('express');
const router = express.Router();
const Rate = require('../models/rate.model');
const { rateFormatting } = require('../middleware/formatting')

router
  .get('/', async (req, res) => {
    try {
      const rate = await Rate.find({});
      const responce = rate.map(item => rateFormatting(item))

      res.json(responce)
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const rate = await Rate.findById(req.params.id);
      res.json(rateFormatting(rate))
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .post('/', async (req, res) => {
    const { rate, money, title } = req.body;
    const newRate = new Rate({ rate, money, title })

    try {
      const existRate = await Rate.find({ rate, title });

      if (existRate.length) {
        throw new Error('rate with same title already exist')
      }

      const result = await newRate.save();

      res.json(rateFormatting(result));
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .put('/:id', async (req, res) => {
    const { rate, money, title } = req.body;

    try {
      const existRate = await Rate.findById(req.params.id);

      if (!existRate) {
        throw new Error('can not find this rate')
      }

      existRate.rate = rate;
      existRate.title = title;
      existRate.money = money;

      const result = await existRate.save();
      res.json(rateFormatting(result));
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete('/:id', async (req, res) => {

    try {
      const existRate = await Rate.findById(req.params.id);

      if (!existRate) {
        throw new Error('can not find this rate')
      }

      const result = existRate.delete();
      res.json(rateFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;