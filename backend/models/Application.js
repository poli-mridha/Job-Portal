const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    name: String,

    email: String,

    phone: String,

    resume: String,

    jobId: String,

    jobTitle: String,

    company: String,

    status: {

        type: String,

        default: "Pending Review"

    },

    appliedAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    "Application",

    applicationSchema

);