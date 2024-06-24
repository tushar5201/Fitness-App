import express from "express";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoutes.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import nodemailer from "nodemailer";
import Users from "./models/userModel.js";
import Workout from "./models/workoutModel.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

app.use(cors(
    {
        origin: "https://fitpro-zeta.vercel.app",
        methods: ["POST", "GET", "DELETE", "PUT"],
    }
))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to db");
    }).catch(err => {
        console.log(err.message);
    });

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/user", userRoutes);

app.post("/api/addWorkout", async (req, res) => {
    const { user, category, workoutName, sets, reps, weight, duration, date } = req.body;
    const user1 = await Users.findById(user);
    if (user1) {
        const workout = new Workout({ user, category, workoutName, sets, reps, weight, duration, date }).save();
        if (workout) {
            return res.status(200).send("workoutCreated")
        } else {
            return res.status(401).send("failed")
        }
    }
});

app.get("/api/getWorkout/:date/:user", async (req, res) => {
    const date = req.params.date;
    const user = req.params.user;
    try {
        const workout = await Workout.find({ date: date });
        let i = 0;
        let data = [];
        for (i = 0; i < workout.length; i++) {
            if (user == workout[i].user) {
                data.push(workout[i]);
            }
        }
        if (data.length != 0) {
            res.status(200).json({ data: data });
        } else {
            res.status(405).json({ message: "No Saved Workout on this day" })
        }
    } catch (error) {
        res.status(404).json({ message: "No saved Workout on this day" })
    }
})

app.post("/contact", async (req, res) => {
    const { subject, email, message } = req.body;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'tlakadiya5@gmail.com',
            pass: 'lvxiyorjhvwywcqp'
        }
    });

    let mailOptions = ({
        from: 'tlakadiya5@gmail.com',
        to: "tlakadiya5@gmail.com",
        subject: subject,
        text: "You received Contact message from: \n" + email + "\n\n Saying that \n\t\t" + message
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(500).send('err in sending mail.')
        } else {
            res.status(200).send('Mail sent');
        }
    });

})

app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
})