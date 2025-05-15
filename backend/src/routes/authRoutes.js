import express from 'express';
import { signUpUser, signInUser, updateProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js'; // Make sure to use 'auth' middleware
import User from '../models/User.js';


const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.put('/update-profile', auth,  updateProfile);

router.get('/me',auth, async (req, res) => { 
  try {
    console.log("requested by client");
    
    const user = await User.findById(req.user.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
