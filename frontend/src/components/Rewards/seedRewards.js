require('dotenv').config();
const mongoose = require('mongoose');
const Reward = require('./models/rewardModel');

const rewards = [
    {
        title: 'Bronze Adventurer',
        description: 'Awarded for reaching 10 XP',
        xpRequired: 10
    },
    {
        title: 'Silver Seeker',
        description: 'Awarded for reaching 50 XP',
        xpRequired: 50
    },
    {
        title: 'Golden Master',
        description: 'Awarded for reaching 100 XP',
        xpRequired: 100
    },
    {
        title: 'Habit Hero',
        description: 'Awarded for reaching 250 XP',
        xpRequired: 250
    }
];

mongoose.connect(process.env.MONG_URI)
    .then(async () => {
        await Reward.deleteMany({});
        await Reward.insertMany(rewards);
        console.log('🎉 Rewards seeded!');
        mongoose.disconnect();
    })
    .catch(err => console.log(err));
