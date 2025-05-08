const Reward = require('../models/rewardModel');
const User = require('../models/userModel');


const getRewards = async (req, res) => {
    try {
        const rewards = await Reward.find().sort({ xpRequired: 1 }); // Sort by XP needed
        res.status(200).json(rewards);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createReward = async (req, res) => {
    const { title, description, xpRequired } = req.body;

    try {
        const reward = await Reward.create({ title, description, xpRequired });
        res.status(201).json(reward);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUnlockedRewards = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const unlockedRewards = await Reward.find({ xpRequired: { $lte: user.xp } }).sort({ xpRequired: 1 });

        res.status(200).json(unlockedRewards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllRewards = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const allRewards = await Reward.find();

        const unlocked = allRewards.filter(reward => user.xp >= reward.xpRequired);
        const locked = allRewards.filter(reward => user.xp < reward.xpRequired);

        res.status(200).json({
            unlocked,
            locked
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRewards,
    createReward,
    getUnlockedRewards,
    getAllRewards
};
