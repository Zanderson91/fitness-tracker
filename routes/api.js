const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
    ])
        .then(Workout => {
            res.json(Workout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(Workout => {
            res.json(Workout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true, runValidators: true })
        .then(Workout => {
            res.json(Workout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})