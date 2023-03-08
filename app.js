const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const indexRouter = require('./routes/indexRouter');

const mongoDb = "mongodb+srv://quysonnguyen:prshinkenger3529@cluster0.ooejzu9.mongodb.net/MemberBoard?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

app.use((req, res) => {
	res.status(404).sendFile('./views/404.html', { root: __dirname });
});


app.listen(3000, () => console.log("app listening on port 3000!"));