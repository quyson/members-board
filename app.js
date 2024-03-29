const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require('./models/userModel');
const indexRouter = require('./routes/indexRouter');
const signUpRouter = require('./routes/signUpRouter');
const messageRouter = require('./routes/messageRouter');
const bcrypt = require('bcryptjs');

const mongoDb = "mongodb+srv://quysonnguyen:prshinkenger3529@cluster0.ooejzu9.mongodb.net/MemberBoard?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

const strategy = new LocalStrategy(
    async(username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            success: false,
            message: 'User not found'
          })
        };
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Incorrect password" })
            }
        });
    } catch (error) {
        done(error, false);
    }
    }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
   
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(signUpRouter);
app.use(indexRouter);
app.use(messageRouter);

app.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "sign-up"
    })
);   

app.get("/log-out", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

app.use((req, res) => {
	res.status(404).sendFile('./views/404.html', { root: __dirname });
});

app.listen(3000, () => console.log("app listening on port 3000!"));