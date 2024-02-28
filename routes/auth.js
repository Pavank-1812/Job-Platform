const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const user = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isExsistingUser = await User.findOne({ email: email});
        if(isExsistingUser) {
            return res
            .status(409)
            .json({ errorMessage: "User already exists"});
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const userData = new User({
            name, 
            email,
            password: hashedPasssword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request Invalid Credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                userDetails.password
            );
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ errorMessage: "Invalid Credentials"});
            }

            const token = jwt.sign({}, )

            res.json({ message: "User logged in", name: userDetails.name});
        } catch (error) {}
});

module.exports = router;