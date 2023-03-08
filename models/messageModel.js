const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type: String, maxLength: 100},
    message: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;