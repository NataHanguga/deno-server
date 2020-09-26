const express = require('express');
const DepartmentHead = require('../models/department-head.model');
const router = express.Router();
const { departmentHeadFormatting } = require('../middleware/formatting')

router
  .get('/', async (req, res) => {
    try {
      const positions = await DepartmentHead.find().populate('rate');
      const responce = positions.map(item => departmentHeadFormatting(item));

      res.json(responce)
    } catch (error) {
      res.status(400).json(error);
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const position = await DepartmentHead.findById(req.params.id).populate('rate');

      res.json(departmentHeadFormatting(position))
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!')
    }
  })
  .post('/', async (req, res) => {
    const { percent, department, teacherName } = req.body;
    const newPosition = new DepartmentHead({ percent, department, teacherName });

    try {
      const existPosition = await DepartmentHead.find({ department });

      if (existPosition.length) {
        throw new Error('manager position already exist' + JSON.stringify(existPosition));
      }

      const result = await newPosition.save();

      res.json(departmentHeadFormatting(result));
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .put('/:id', async (req, res) => {
    const { percent, department, teacherName } = req.body;

    try {
      const existPosition = await DepartmentHead.findById(req.params.id);

      if (!existPosition) {
        throw new Error('can not find this position')
      }

      existPosition.percent = percent;
      existPosition.department = department;
      existPosition.teacherName = teacherName;

      const result = await existPosition.save()
      res.json(departmentHeadFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete('/:id', async (req, res) => {

    try {
      const existRate = await DepartmentHead.findById(req.params.id);

      if (!existRate) {
        throw new Error('can not find this position')
      }

      const result = existRate.delete();
      res.json(departmentHeadFormatting(result))
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;