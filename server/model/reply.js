const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    parentPost:{
        type: mongoose.mongo.ObjectId,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Reply', ReplySchema);
