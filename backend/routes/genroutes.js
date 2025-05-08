const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { getRewards, 
        createReward,
        getUnlockedRewards,
        getAllRewards } = require('../controllers/rewardController');
const router = express.Router();

// Leaderboard route
router.get('/leaderboard', getLeaderboard);


router.get('/rewards', getRewards);
router.get('/rewards/all/:userId', getAllRewards);
router.get('/rewards/unlocked/:userId', getUnlockedRewards);



router.post('/rewards', createReward)


module.exports = router;