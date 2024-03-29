const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getSignUp = (req, res) => {
    res.render('sign-up');
};

const postSignUp = (req, res) => {
    const newUser = new User(req.body);
    if(newUser.membership == 'donbrothers'){
        newUser.membership = "True";
    } else if(newUser.membership == 'zenkaizer'){
        newUser.membership = 'Admin';
    } else {
        newUser.membership = "False"
    };
    bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if(err) return next(err);
        console.log(newUser.password);
        newUser.password = hashedPassword;
        console.log(newUser.password);
        newUser.save()
            .then((result) => res.redirect('/'))
            .catch((error) => console.log(error));
    }); 
};

module.exports = {getSignUp, postSignUp};