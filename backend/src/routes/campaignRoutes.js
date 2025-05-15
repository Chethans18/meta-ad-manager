import express from 'express';
import { createCampaign, getCampaigns, getCampaign, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.use(auth);


router.post('/', createCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router; 