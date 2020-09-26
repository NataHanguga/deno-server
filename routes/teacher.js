const express = require('express');
const router = express.Router();
const { teacherFormatting } = require('../middleware/formatting');
const Teacher = require('../models/teacher.model');

router
    .get('/', async (req, res) => {
        try {
            const positions = await Teacher
                .find()
                .populate('rate')
            // .populate('pedagogic-title')
            // .populate('manager-position')
            // .populate('department-head');
            const responce = positions.map(item => teacherFormatting(item));

            res.json(responce)
        } catch (error) {
            res.status(400).json(error);
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const position = await Teacher.findById(req.params.id).populate('rate');

            res.json(teacherFormatting(position))
        } catch (error) {
            console.log(error);
            res.status(500).send('Something broke!')
        }
    })
    .post('/', async (req, res) => {
        const { name } = req.body;
        const newPosition = new Teacher({ ...req.body });

        try {
            console.log(name);
            const existPosition = await Teacher.find({ name });

            if (existPosition.length) {
                throw new Error('manager position already exist' + JSON.stringify(existPosition));
            }

            const result = await newPosition.save();

            res.json(teacherFormatting(result));
        } catch (error) {
            res.status(400).json(error);
        }
    })
    .put('/year-up', async(req, res) => {
        try {
            const result = await Teacher.updateMany({}, {$inc: { expiriense: 1 } });
            
            res.json(teacherFormatting(result));
        } catch (error) {
            res.status(400).json(error);
        }
    })
    .put('/:id', async (req, res) => {
        const { name,
            education,
            year,
            expiriense,
            teachHours,
            concertHours,
            pedagogicTitle,
            rate,
            managerPosition,
            departmentHead } = req.body;

        try {
            const existPosition = await Teacher.findById(req.params.id);

            if (!existPosition) {
                throw new Error('can not find this position')
            }

            existPosition.name = name;
            existPosition.education = education;
            existPosition.year = year
            existPosition.expiriense = expiriense
            existPosition.teachHours = teachHours
            existPosition.concertHours = concertHours
            existPosition.pedagogicTitle = pedagogicTitle
            existPosition.rate = rate
            existPosition.managerPosition = managerPosition
            existPosition.departmentHead = departmentHead

            const result = await existPosition.save()
            res.json(teacherFormatting(result))
        } catch (error) {
            res.status(400).json(error);
        }
    })
    .delete('/:id', async (req, res) => {

        try {
            const existRate = await Teacher.findById(req.params.id);

            if (!existRate) {
                throw new Error('can not find this position')
            }

            const result = existRate.delete();
            res.json(teacherFormatting(result))
        } catch (error) {
            res.status(400).json(error);
        }
    });

module.exports = router;