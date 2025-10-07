import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '../config/api';

interface MosqueInfo {
  mosque_name: string;
  mosque_address: string;
  mosque_phone: string;
  mosque_email: string;
  mosque_website: string;
  mosque_description: string;
}

interface SocialMedia {
  social_facebook: string;
  social_instagram: string;
  social_telegram: string;
}

interface FooterSettings {
  footer_copyright: string;
  footer_additional_text: string;
}

interface ContactSettings {
  contact_office_hours: string;
  contact_friday_prayer: string;
}

interface DonationSettings {
  donation_title: string;
  donation_description: string;
  donation_account_number: string;
  donation_mfo: string;
  donation_inn: string;
  donation_contact_phone: string;
  donation_payme_link: string;
  donation_payme_text: string;
  donation_click_code: string;
  donation_click_text: string;
}

interface Settings {
  mosque_info: MosqueInfo;
  social_media: SocialMedia;
  footer: FooterSettings;
  contact: ContactSettings;
  donation: DonationSettings;
}

interface SettingsContextType {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  mosque_info: {
    mosque_name: 'Chimir ota Jome Masjidi',
    mosque_address: 'Toshkent Shahri Shayhontohur tumani\nYangi toshmi Chimir ota masjidi\nToshkent, O\'zbekiston',
    mosque_phone: '+998 12 345 6789',
    mosque_email: 'info@chimirotajome.uz',
    mosque_website: 'https://chimirotajome.uz',
    mosque_description: 'Jamiyatimizga xizmat qiluvchi ibodat, bilim va birlik maskani.'
  },
  social_media: {
    social_facebook: 'https://facebook.com/chimirotajome',
    social_instagram: 'https://instagram.com/chimirotajome',
    social_telegram: 'https://t.me/chimirotajome'
  },
  footer: {
    footer_copyright: '© 2025 Chimir ota Jome Masjidi. Barcha huquqlar himoyalangan.',
    footer_additional_text: 'Ibodat va birlik maskani'
  },
  contact: {
    contact_office_hours: '9:00 dan 18:00 gacha',
    contact_friday_prayer: '12:30'
  },
  donation: {
    donation_title: '𝐌𝐚𝐬𝐣𝐢𝐝 𝐮𝐜𝐡𝐮𝐧 𝐞𝐡𝐬𝐨𝐧',
    donation_description: 'Allah yo\'lida ehson qiling va masjidimizning faoliyatini qo\'llab-quvvatlashda ishtirok eting',
    donation_account_number: '20212000700124304001',
    donation_mfo: '00901',
    donation_inn: '202465253',
    donation_contact_phone: '974779411',
    donation_payme_link: 'https://payme.uz/fallback/merchant/?id=6261544f84e4da44d89eb31c',
    donation_payme_text: 'Ehson qilish',
    donation_click_code: '*880*047452*summa#',
    donation_click_text: 'Kodni nusxalash'
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/settings`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      
      const data = await response.json();
      
      // Merge with defaults in case some settings are missing
      const mergedSettings: Settings = {
        mosque_info: { ...defaultSettings.mosque_info, ...data.mosque_info },
        social_media: { ...defaultSettings.social_media, ...data.social_media },
        footer: { ...defaultSettings.footer, ...data.footer },
        contact: { ...defaultSettings.contact, ...data.contact },
        donation: { ...defaultSettings.donation, ...data.donation }
      };
      
      setSettings(mergedSettings);
      
    } catch (error) {
      console.error('Settings fetch error:', error);
      setError('Failed to load settings');
      // Use default settings as fallback
      setSettings(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const contextValue: SettingsContextType = {
    settings,
    isLoading,
    error,
    refreshSettings
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};