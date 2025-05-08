const express = require('express')
const User = require('../models/userModel'); 
const Auth = require('../middleware/requireAuth'); 
const multer = require('multer');
const jwt = require('jsonwebtoken');

//controller functions
const {signupUser, loginUser} = require('../controllers/userController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });

const router = express.Router()

router.get('/me', Auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
      if (!user) return res.status(404).json({ msg: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  router.post('/update-profile', Auth, upload.single('profilePic'), async (req, res) => {
    try {
      const updates = {};
  
      if (req.body.username) {
        if (req.body.username.length > 20) {
          return res.status(400).json({ error: 'Username must be 20 characters or fewer.' });
        }
        updates.username = req.body.username;
      }
  
      if (req.file) {
        updates.profilePic = `/uploads/${req.file.filename}`;
      }
  
      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
      
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
        },
        process.env.SECRET,
        { expiresIn: '3d' }
      );

      res.status(200).json({ message: 'Profile updated', user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

//logn route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router