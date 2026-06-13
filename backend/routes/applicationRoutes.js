const express = require("express");
const router = express.Router();

const Application = require("../models/Application");

// Create Application
router.post("/", async (req, res) => {

    try {

        const existingApplication =
            await Application.findOne({

                email: req.body.email,

                jobId: req.body.jobId

            });

        if (existingApplication) {

            return res.status(400).json({

                message:
                    "You have already applied for this job"

            });

        }

        const application =
            new Application(req.body);

        await application.save();

        res.status(201).json({

            message:
                "Application Submitted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});
// Get All Applications
// Get User Applications
router.get("/", async (req, res) => {

    try {

        const { email } = req.query;

        const applications =
            await Application.find({
                email
            });

        res.json(applications);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// Withdraw Application
router.delete("/:id", async (req, res) => {

    try {

        await Application.findByIdAndDelete(
            req.params.id
        );

        res.json({

            message:
                "Application withdrawn successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});

module.exports = router;