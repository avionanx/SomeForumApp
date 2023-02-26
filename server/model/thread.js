const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Thread', ThreadSchema);

