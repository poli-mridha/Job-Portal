const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");


router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({

                message:
                    "Email already exists. Please Sign in."

            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.json({

            message:
                "Registration Successful"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Registration Failed"

        });

    }

});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "User not found"

            })

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid Password"

            })

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            message: "Sign in Successful",

            token

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

});

router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const otp = Math.floor(

            100000 + Math.random() * 900000

        ).toString();

        user.otp = otp;

        user.otpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Password Reset OTP",

            text: `Your OTP is ${otp}`

        });

        res.json({

            message: "OTP sent successfully"

        });

    }

    catch (err) {

        console.log("FORGOT PASSWORD ERROR:");
        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

});

router.post("/verify-otp", async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (
            !user ||
            user.otp !== otp ||
            user.otpExpires < Date.now()
        ) {

            return res.status(400).json({

                message: "Invalid or Expired OTP"

            });

        }

        res.json({

            message: "OTP Verified"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

router.post("/reset-password", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.json({

            message: "Password Reset Successfully"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;