'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

const CampaignContext = createContext();

export function useCampaign() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }) {
  const router = useRouter();
  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: 'awareness',
    targeting: {
      locations: [],
      ageRange: { min: 18, max: 65 },
      gender: 'all',
      interests: [],
    },
    budget: {
      type: 'daily',
      amount: 0,
      startDate: new Date(),
      endDate: null,
    },
    creatives: {
      images: [],
      headline: '',
      description: '',
      callToAction: 'learn_more',
    },
  });

  const updateCampaignData = (section, data) => {
    setCampaignData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const createCampaign = async () => {
    try {
      const response = await api.post('/campaigns', campaignData);
      console.log('Campaign created:', response.data);
      router.push('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  };

  return (
    <CampaignContext.Provider value={{ campaignData, updateCampaignData, createCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
} 