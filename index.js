const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

//Cookies
app.use(cookieParser())

app.get("/cookies", (req, res) => {
    res.cookie("name", "Likhith");
    res.send("Hello..!");
});

app.get("/read", (req, res) => {
    console.log(req.cookies);
    res.send("Reading Cookies...");
});

//Bcrypt
app.get("/", (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("likhithkp1234", salt, function(err, hash) {
            console.log(hash);
        });
    });
})

app.get("/compare", (req, res) => {
    bcrypt.compare("likhithkp1234", "$2b$10$OW7kuum1uPqedDMNH9Wv.OzrAtDFTxeuj9F4NIWQH9D5c1eOIYo7m", function(err, result) {
        console.log(result);
    });
})

//Jwt
app.get("/token", (req, res) => {
    let token = jwt.sign({email: "likhithkpdev@gmail.com"}, "secret");
    res.cookie("token", token);
    res.send("Jwt set..");
});

app.get("/readToken", (req, res) => {
    res.send(req.cookies.token);
});

app.get("/verifyToken", (req, res) => {
    let verifyToken = jwt.verify(req.cookies.token, "secret");
    res.send(verifyToken);
});

app.listen(3001, () => {
    console.log("Server running...");
});
