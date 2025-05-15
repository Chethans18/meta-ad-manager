import express from 'express';
import { createAd, getAds, getAd, updateAd, deleteAd } from '../controllers/adController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.use(auth);

router.post('/', createAd);
router.get('/campaign/:campaignId', getAds);
router.get('/:id', getAd);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router; 