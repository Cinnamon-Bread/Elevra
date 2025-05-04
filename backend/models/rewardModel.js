// rewardModel.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    xpRequired: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reward', rewardSchema);
