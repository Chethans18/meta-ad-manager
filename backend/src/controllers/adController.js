import Ad from '../models/Ad.js';
import Campaign from '../models/Campaign.js';


export const createAd = async (req, res) => {
  try {
    const { name, type, content, targeting, campaignId } = req.body;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      user: req.user.userId
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const ad = new Ad({
      name,
      type,
      content,
      targeting,
      campaign: campaignId
    });

    await ad.save();

    campaign.ads.push(ad._id);
    await campaign.save();

    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAds = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      user: req.user.userId
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const ads = await Ad.find({ campaign: campaignId })
      .sort({ createdAt: -1 });

    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAd = async (req, res) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    const campaign = await Campaign.findOne({
      _id: ad.campaign,
      user: req.user.userId
    });

    if (!campaign) {
      return res.status(403).json({ message: 'Not authorized to access this ad' });
    }

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, content, targeting, status } = req.body;

    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    const campaign = await Campaign.findOne({
      _id: ad.campaign,
      user: req.user.userId
    });

    if (!campaign) {
      return res.status(403).json({ message: 'Not authorized to update this ad' });
    }

    if (name) ad.name = name;
    if (type) ad.type = type;
    if (content) ad.content = content;
    if (targeting) ad.targeting = targeting;
    if (status) ad.status = status;

    await ad.save();

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }


    const campaign = await Campaign.findOne({
      _id: ad.campaign,
      user: req.user.userId
    });

    if (!campaign) {
      return res.status(403).json({ message: 'Not authorized to delete this ad' });
    }

    campaign.ads = campaign.ads.filter(adId => adId.toString() !== id);
    await campaign.save();

    await ad.deleteOne();

    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 