import express from "express";
import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await Users.findOne({ email: email });
        if (userExist) {
            return res.status(401).send('User exist.')
        }
        const user = new Users({ name, email, password });
        user.save().then(() => {
            return res.status(200).send('user created')
        });
    } catch (error) {
        console.log(error);
    }
});

userRoutes.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const jwtToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
            return res
                .cookie("jwtToken", jwtToken, { httpOnly: false, sameSite: "none", secure: true, expires: new Date(Date.now() + 25892000000) })
                .status(200)
                .send({ email: user.email, name: user.name, id: user._id });
        } else {
            res.status(401).send("Invalid Credentials")
        }
    } else {
        res.status(401).send("Invalid Credentials")
    }
});