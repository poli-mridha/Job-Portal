const express = require("express");

const router = express.Router();

const Job = require("../models/job");

router.get("/", async (req, res) => {

    try {

        const jobs = await Job.find();

        res.json(jobs);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

router.post("/", async (req, res) => {

    try {

        const job = await Job.create(req.body);

        res.json(job);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

router.get("/seed", async (req, res) => {

    try {

        await Job.deleteMany({});

        await Job.insertMany([

            {
                title: "Frontend Developer",
                company: "Google",
                location: "Bangalore"
            },

            {
                title: "Backend Developer",
                company: "Microsoft",
                location: "Hyderabad"
            },

            {
                title: "Full Stack Developer",
                company: "Amazon",
                location: "Pune"
            },

            {
                title: "React Developer",
                company: "Infosys",
                location: "Kolkata"
            },

            {
                title: "Node.js Developer",
                company: "TCS",
                location: "Mumbai"
            },

            {
                title: "Software Engineer",
                company: "Wipro",
                location: "Chennai"
            },

            {
                title: "Java Developer",
                company: "Accenture",
                location: "Bangalore"
            },

            {
                title: "Python Developer",
                company: "IBM",
                location: "Remote"
            },

            {
                title: "DevOps Engineer",
                company: "Oracle",
                location: "Hyderabad"
            },

            {
                title: "Cloud Engineer",
                company: "Capgemini",
                location: "Pune"
            },

            {
                title: "Data Analyst",
                company: "Deloitte",
                location: "Mumbai"
            },

            {
                title: "Data Scientist",
                company: "Adobe",
                location: "Bangalore"
            },

            {
                title: "UI/UX Designer",
                company: "Zoho",
                location: "Chennai"
            },

            {
                title: "QA Engineer",
                company: "Cognizant",
                location: "Kolkata"
            },

            {
                title: "Cyber Security Analyst",
                company: "HCL",
                location: "Noida"
            },

            {
                title: "MERN Stack Developer",
                company: "Tech Mahindra",
                location: "Remote"
            },

            {
                title: "Machine Learning Engineer",
                company: "NVIDIA",
                location: "Bangalore"
            },

            {
                title: "Mobile App Developer",
                company: "Samsung",
                location: "Noida"
            },

            {
                title: "Database Administrator",
                company: "Intel",
                location: "Hyderabad"
            },

            {
                title: "Graduate Software Engineer",
                company: "Paytm",
                location: "Gurugram"
            }

        ]);

        res.send("20 Jobs Added Successfully");

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;