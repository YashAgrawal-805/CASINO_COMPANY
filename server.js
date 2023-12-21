const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const alert = require("alert");
const popup = require('node-popup');

const app = express();
const emailToken = Math.random().toString(36).substring(2,7);
const url = "http://localhost:3000/" + emailToken

// Set the view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("./public"));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb+srv://compcasino:09ODQcFEjfKPLazD@casino.4hv0r7k.mongodb.net/UserDB", { useNewUrlParser: true });


async function sendEmail(email, url) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'comp.casino@gmail.com',
                pass: 'vdnf zhoy ritj jtnq'
                },
            debug: true
        });

        const mailOptions = {
            from: 'comp.casino@gmail.com',
            to: email,
            subject: 'Hello',
            html: '<center><h2>CLICK BELOE TO VERIFY</h2><form action=' + url + '><button style="height: 50px;width: 150px;background-color: rgb(0, 132, 255);color: black;border-radius: 30px;box-shadow: 5px 5px 5px;font-size: larger;font-weight: bolder;">Verify</button></form></center>'
        };
        const info = await transporter.sendMail(mailOptions);
        return(info.messageId);
        console.log('Email sent:', info.messageId);
        } catch (error) {
        console.error('Error occurred:', error);
        }
}


// User Schema
const UserSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    }
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 10);
    }
    next();
});

const Users = mongoose.model("Users", UserSchema);

// Route for the home page
app.get("/", function (req, res, next) {
    res.render("index", { a: "SIGNUP/LOGIN"});
});

// Route for the registration page
app.get("/register", function (req, res, next) {
    res.render("login");
});
app.get("/about",function(req,res){
    res.render("about");
})
// Route to handle signup form submission
app.post("/signup", async function (req, res) {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.Email;
    var password = req.body.password;

    const user = await Users.findOne({ Email: email });

    if (!user) {
        console.log(firstname, lastname, email, password);


        sendEmail(email,url);
        console.log(email);
        res.render("gmail");
        // Create a new user instance
        app.get("/"+emailToken, async function (req, res) {
            res.render("Verification");
            const newUser = new Users({
                Firstname: firstname,
                lastname: lastname,
                Email: email,
                Password: password
            });
            await newUser.save();
            console.log("User saved successfully");
        })
        app.get("/registered", async function (req, res) {
            res.render("index", {a: firstname.toUpperCase()});
        })
    }
    else{
        return res.render("Resignup");
    }
    });

// Route to handle login form submission
app.post("/login", async function (req, res) {
    var email = req.body.Email;
    var password = req.body.password;
    const user = await Users.findOne({ Email: email ,password: password});

    if (!user) {
        res.render("Relogin");
    }
    else{
        res.render("index", { a: user.Firstname.toUpperCase()});
        console.log(email);
    }
});

// Start the server
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});
