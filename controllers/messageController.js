const Message = require('../models/messageModel');

const getMessage = (req, res) => {
    res.render('message');
}

const postMessage = (req, res) => {
    const newMessage = new Message({
        title: req.body.title,
        message: req.body.message,
        user: req.user._id
    });
    newMessage.save()
        .then((result) => res.redirect('/'))
        .catch((error) => console.log(error));
};

module.exports = {getMessage, postMessage};