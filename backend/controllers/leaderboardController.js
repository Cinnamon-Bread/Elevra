const User = require('../models/userModel');

// Get leaderboard (sort by XP or level)
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({}, { password: 0, __v: 0 })
            .sort({ xp: -1 })
            .limit(10); // Optional: limit to top 10
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getLeaderboard = (req, res) => {
    // Sample leaderboard data, ideally this would come from your database
    const leaderboard = [
        { rank: 1, username: 'User1', score: 150 },
        { rank: 2, username: 'User2', score: 120 },
        { rank: 3, username: 'User3', score: 100 },
    ];

    res.json(leaderboard);
};

module.exports = {
    getLeaderboard
}
