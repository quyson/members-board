const Message = require('../models/messageModel');

const getIndex = (req, res) => {
    Message.find()
        .then((result) => {
            res.render('index', { user: req.user, messages: result });
        })
        .catch((error) => console.log(error));
};

module.exports = { getIndex };