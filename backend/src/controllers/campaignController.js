import Campaign from '../models/Campaign.js';

export const createCampaign = async (req, res) => {
  try {
    
    const { name, objective, platform, budget, startDate, endDate, targetAudience, description, creatives } = req.body;
    
    if (!name || !objective || !platform || !budget || !startDate || !endDate) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields',
        details: {
          name: !name,
          objective: !objective,
          platform: !platform,
          budget: !budget,
          startDate: !startDate,
          endDate: !endDate
        }
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    const campaignData = {
      name,
      objective,
      platform,
      budget,
      startDate,
      endDate,
      targetAudience: {
        ageRange: targetAudience?.ageRange || { min: 18, max: 65 },
        locations: targetAudience?.locations || [],
        interests: targetAudience?.interests || []
      },
      description: description || '',
      creatives: creatives || [],
      createdBy: req.user._id
    };

    console.log('Creating campaign with data:', campaignData);

    const campaign = await Campaign.create(campaignData);
    console.log('Campaign created successfully:', campaign);
    
    res.status(201).json({
      success: true,
      campaign
    });
  } catch (error) {
    console.error('Campaign creation error:', error);
    
   
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: 'Validation error',
        details: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Error creating campaign',
      error: error.message 
    });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      campaigns
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching campaigns' 
    });
  }
};

export const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({ 
        success: false,
        message: 'Campaign not found' 
      });
    }

    res.status(200).json({
      success: true,
      campaign
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching campaign' 
    });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const { name, objective, platform, budget, startDate, endDate, targetAudience, description, creatives } = req.body;

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({ 
        success: false,
        message: 'Campaign not found' 
      });
    }

    const updateData = {
      name,
      objective,
      platform,
      budget,
      startDate,
      endDate,
      targetAudience: {
        ageRange: targetAudience?.ageRange || campaign.targetAudience.ageRange,
        locations: targetAudience?.locations || campaign.targetAudience.locations,
        interests: targetAudience?.interests || campaign.targetAudience.interests
      },
      description: description || campaign.description,
      creatives: creatives || campaign.creatives
    };

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      campaign: updatedCampaign
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating campaign' 
    });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({ 
        success: false,
        message: 'Campaign not found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Campaign deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting campaign' 
    });
  }
}; 