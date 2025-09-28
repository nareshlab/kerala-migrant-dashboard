import React, { createContext, useContext, useState, useCallback } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => string;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Comprehensive translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    // Main titles
    'Kerala Digital Health Records': 'Kerala Digital Health Records',
    'Migrant Worker System': 'Migrant Worker System',
    'Dashboard': 'Dashboard',
    'Health Records': 'Health Records',
    'Find Healthcare': 'Find Healthcare',
    'Health Assistant': 'Health Assistant',
    'Emergency': 'Emergency',
    'SDG Dashboard': 'SDG Dashboard',
    'Employer Dashboard': 'Employer Dashboard',
    'Medical Awareness': 'Medical Awareness',
    
    // Dashboard content
    'Registered Migrant Workers': 'Registered Migrant Workers',
    'Click on any worker to view their detailed health profile': 'Click on any worker to view their detailed health profile',
    'System Overview': 'System Overview',
    'Location Distribution': 'Location Distribution',
    'Recent Alerts': 'Recent Alerts',
    'Total Workers': 'Total Workers',
    'Active Today': 'Active Today',
    'Health Alerts': 'Health Alerts',
    'AI Health Insights': 'AI Health Insights',
    'Quick Access': 'Quick Access',
    'View Health Records': 'View Health Records',
    'Back to List': '← Back to List',
    'Health Profile': '- Health Profile',
    
    // Emergency Services
    'Emergency Services': 'Emergency Services',
    'SEND EMERGENCY ALERT': 'SEND EMERGENCY ALERT',
    'Emergency alert will send your location to:': 'Emergency alert will send your location to:',
    'Emergency services (108)': '• Emergency services (108)',
    'Your registered emergency contact': '• Your registered emergency contact',
    'Your employer': '• Your employer',
    'Nearby health volunteers': '• Nearby health volunteers',
    'Migrant Helpline': 'Migrant Helpline',
    'Employer Emergency': 'Employer Emergency',
    'Local Health Center': 'Local Health Center',
    'Call Now': 'Call Now',
    'EMERGENCY ACTIVE': 'EMERGENCY ACTIVE',
    'Emergency alert has been sent. Help is on the way.': 'Emergency alert has been sent. Help is on the way.',
    'Location sent:': 'Location sent:',
    'Alert sent:': 'Alert sent:',
    'Call 108': 'Call 108',
    'Cancel Alert': 'Cancel Alert',
    'Call': 'Call',
    'Are you sure you want to call': 'Are you sure you want to call',
    
    // Common words
    'Online': 'Online',
    'Offline Mode': 'Offline Mode',
    'Verified': 'Verified',
    'registered workers': 'registered workers',
    'Construction Worker': 'Construction Worker',
    'Textile Worker': 'Textile Worker',
    'Agricultural Worker': 'Agricultural Worker',
    'Food Processing': 'Food Processing',
    'Road Construction': 'Road Construction',
    'Domestic Worker': 'Domestic Worker',
    'From': 'From',
    'ID:': 'ID:',
    'High BP detected': 'High BP detected',
    'Missed checkup': 'Missed checkup',
    'Vaccination complete': 'Vaccination complete',
    'Others': 'Others',
    "You're currently offline. Some features may be limited. Data will sync when connection is restored.": "You're currently offline. Some features may be limited. Data will sync when connection is restored.",
    
    // Emergency Page Enhanced Content
    'Health Guide': 'Health Guide',
    'Safety Tips': 'Safety Tips',
    'In case of medical emergency, call immediately': 'In case of medical emergency, call immediately',
    'EMERGENCY ALERT': 'EMERGENCY ALERT',
    'Send location to all contacts': 'Send location to all contacts',
    'Emergency Contact Numbers': 'Emergency Contact Numbers',
    'Other Important Numbers': 'Other Important Numbers',
    'Medical Emergency Guide': 'Medical Emergency Guide',
    'Recognize symptoms and know what to do': 'Recognize symptoms and know what to do',
    'Safety Guidelines for Migrant Workers': 'Safety Guidelines for Migrant Workers',
    'Essential safety tips for staying safe and healthy': 'Essential safety tips for staying safe and healthy',
    'Language Support': 'Language Support',
    'Important Documents to Keep': 'Important Documents to Keep',
    'Kerala Police': 'Kerala Police',
    'Fire Services': 'Fire Services',
    'Women Helpline': 'Women Helpline',
    'Migrant Worker Helpline': 'Migrant Worker Helpline',
    'Mental Health Helpline': 'Mental Health Helpline',
    'Child Helpline': 'Child Helpline',
    'Poison Control': 'Poison Control',
    'For all medical emergencies': 'For all medical emergencies',
    'For security and safety issues': 'For security and safety issues',
    'For fire emergencies and rescue': 'For fire emergencies and rescue',
    '24x7 women safety helpline': '24x7 women safety helpline',
    'Kerala Labour Department support': 'Kerala Labour Department support',
    'Mental health crisis support': 'Mental health crisis support',
    'Child protection services': 'Child protection services',
    'For poisoning emergencies': 'For poisoning emergencies',
    'Heart Attack': 'Heart Attack',
    'Stroke': 'Stroke',
    'Severe Allergic Reaction': 'Severe Allergic Reaction',
    'Severe Bleeding': 'Severe Bleeding',
    'Unconsciousness': 'Unconsciousness',
    'Heat Stroke': 'Heat Stroke',
    'Chest pain, shortness of breath, nausea': 'Chest pain, shortness of breath, nausea',
    'Face drooping, arm weakness, speech difficulty': 'Face drooping, arm weakness, speech difficulty',
    'Difficulty breathing, swelling, rash': 'Difficulty breathing, swelling, rash',
    "Heavy bleeding that won't stop": "Heavy bleeding that won't stop",
    'Person not responding': 'Person not responding',
    'High fever, confusion, hot dry skin': 'High fever, confusion, hot dry skin',
    'Call 108 immediately, chew aspirin if available': 'Call 108 immediately, chew aspirin if available',
    'Call 108 immediately, note time of symptoms': 'Call 108 immediately, note time of symptoms',
    'Use EpiPen if available, call 108': 'Use EpiPen if available, call 108',
    'Apply direct pressure, elevate wound, call 108': 'Apply direct pressure, elevate wound, call 108',
    'Check breathing, call 108, do not move unless necessary': 'Check breathing, call 108, do not move unless necessary',
    'Move to shade, cool with water, call 108': 'Move to shade, cool with water, call 108',
    'Symptoms:': 'Symptoms:',
    'Action:': 'Action:',
    "Remember: When in doubt, always call 108. It's better to be safe than sorry.": "Remember: When in doubt, always call 108. It's better to be safe than sorry.",
    'Always carry your health ID and emergency contact information': 'Always carry your health ID and emergency contact information',
    'Save emergency numbers in your phone with clear labels': 'Save emergency numbers in your phone with clear labels',
    'Share your location with trusted contacts when working': 'Share your location with trusted contacts when working',
    'Inform your employer about any medical conditions': 'Inform your employer about any medical conditions',
    'Know the location of nearest hospital from your workplace': 'Know the location of nearest hospital from your workplace',
    'Keep important medical documents easily accessible': 'Keep important medical documents easily accessible',
    "Emergency services (108) provide support in multiple languages including English, Malayalam, Hindi, and Tamil. Don't hesitate to call if you need help communicating.": "Emergency services (108) provide support in multiple languages including English, Malayalam, Hindi, and Tamil. Don't hesitate to call if you need help communicating.",
    'Aadhaar Card': 'Aadhaar Card',
    'Health ID Card': 'Health ID Card',
    'Emergency Contact Info': 'Emergency Contact Info',
    'Blood Type Information': 'Blood Type Information',
    'Medical Allergies List': 'Medical Allergies List',
    'Current Medications': 'Current Medications',
    'Number:': 'Number:',
    'Welcome to Kerala Digital Health Records': 'Welcome to Kerala Digital Health Records',
    'A comprehensive digital health platform designed specifically for migrant workers in Kerala. Access your health records, find healthcare facilities, and get AI-powered health insights in your preferred language.': 'A comprehensive digital health platform designed specifically for migrant workers in Kerala. Access your health records, find healthcare facilities, and get AI-powered health insights in your preferred language.',
    'Comprehensive healthcare for migrant workers - Aarogyam Anandham': 'Comprehensive healthcare for migrant workers - Aarogyam Anandham',
    'Get Started': 'Get Started',
    'Access Health Dashboard': 'Access Health Dashboard',
    'Quick Actions': 'Quick Actions',
    'Emergency Alert': 'Emergency Alert',
    'Find Nearest Hospital': 'Find Nearest Hospital',
    'For Migrant Workers': 'For Migrant Workers',
    'Portable health records that move with you across Kerala. Access healthcare services with your Aadhaar-linked digital health ID.': 'Portable health records that move with you across Kerala. Access healthcare services with your Aadhaar-linked digital health ID.',
    'AI-Powered Insights': 'AI-Powered Insights',
    'Get personalized health risk predictions and preventive care recommendations based on your health data and local disease patterns.': 'Get personalized health risk predictions and preventive care recommendations based on your health data and local disease patterns.',
    'SDG Monitoring': 'SDG Monitoring',
    "Contributing to Kerala's Sustainable Development Goals by ensuring equitable healthcare access for all migrant workers.": "Contributing to Kerala's Sustainable Development Goals by ensuring equitable healthcare access for all migrant workers.",
    'Home': 'Home',
    'Kerala Digital Health Records - Migrant Worker System': 'Kerala Digital Health Records - Migrant Worker System',
    'Multilingual Support': 'Multilingual Support',
    'AI Health Assistant': 'AI Health Assistant',
    'Emergency Alerts': 'Emergency Alerts',
    'Emergency alert will send your location to emergency services, your emergency contact, employer, and nearby health volunteers.': 'Emergency alert will send your location to emergency services, your emergency contact, employer, and nearby health volunteers.',
    'Kerala Health Assistant': 'Kerala Health Assistant',
    'Switch to Offline Mode': 'Switch to Offline Mode',
    'Switch to Online Mode': 'Switch to Online Mode',
    'Offline': 'Offline'
  },
  ml: {
    // Main titles
    'Kerala Digital Health Records': 'കേരള ഡിജിറ്റൽ ആരോഗ്യ രേഖകൾ',
    'Migrant Worker System': 'കുടിയേറ്റ തൊഴിലാളി സിസ്റ്റം',
    'Dashboard': 'ഡാഷ്‌ബോർഡ്',
    'Health Records': 'ആരോഗ്യ രേഖകൾ',
    'Find Healthcare': 'ആരോഗ്യസേവ കണ്ടെത്തുക',
    'Health Assistant': 'ആരോഗ്യ സഹായി',
    'Emergency': 'അടിയന്തരാവസ്ഥ',
    'SDG Dashboard': 'എസ്‌ഡിജി ഡാഷ്‌ബോർഡ്',
    'Employer Dashboard': 'തൊഴിലുടമ ഡാഷ്‌ബോർഡ്',
    'Medical Awareness': 'മെഡിക്കൽ അവബോധം',
    
    // Dashboard content
    'Registered Migrant Workers': 'രജിസ്റ്റർ ചെയ്ത കുടിയേറ്റ തൊഴിലാളികൾ',
    'Click on any worker to view their detailed health profile': 'വിശദമായ ആരോഗ്യ പ്രൊഫൈൽ കാണാൻ ഏതെങ്കിലും തൊഴിലാളിയിൽ ക്ലിക്ക് ചെയ്യുക',
    'System Overview': 'സിസ്റ്റം അവലോകനം',
    'Location Distribution': 'സ്ഥാന വിതരണം',
    'Recent Alerts': 'സമീപകാല മുന്നറിയിപ്പുകൾ',
    'Total Workers': 'മൊത്തം തൊഴിലാളികൾ',
    'Active Today': 'ഇന്ന് സജീവം',
    'Health Alerts': 'ആരോഗ്യ മുന്നറിയിപ്പുകൾ',
    'AI Health Insights': 'AI ആരോഗ്യ ഉൾക്കാഴ്ചകൾ',
    'Quick Access': 'ദ്രുത പ്രവേശനം',
    'View Health Records': 'ആരോഗ്യ രേഖകൾ കാണുക',
    'Back to List': '← ലിസ്റ്റിലേക്ക് മടങ്ങുക',
    'Health Profile': '- ആരോഗ്യ പ്രൊഫൈൽ',
    
    // Emergency Services
    'Emergency Services': 'അടിയന്തര സേവനങ്ങൾ',
    'SEND EMERGENCY ALERT': 'അടിയന്തര മുന്നറിയിപ്പ് അയയ്ക്കുക',
    'Emergency alert will send your location to:': 'അടിയന്തര മുന്നറിയിപ്പ് നിങ്ങളുടെ സ്ഥാനം അയയ്ക്കും:',
    'Emergency services (108)': '• അടിയന്തര സേവനങ്ങൾ (108)',
    'Your registered emergency contact': '• നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത അടിയന്തര കോൺടാക്റ്റ്',
    'Your employer': '• നിങ്ങളുടെ തൊഴിലുടമ',
    'Nearby health volunteers': '• അടുത്തുള്ള ആരോഗ്യ സന്നദ്ധപ്രവർത്തകർ',
    'Migrant Helpline': 'കുടിയേറ്റ ഹെൽപ്പ് ലൈൻ',
    'Employer Emergency': 'തൊഴിലുടമ അടിയന്തരാവസ്ഥ',
    'Local Health Center': 'പ്രാദേശിക ആരോഗ്യ കേന്ദ്രം',
    'Call Now': 'ഇപ്പോൾ വിളിക്കുക',
    'EMERGENCY ACTIVE': 'അടിയന്തരാവസ്ഥ സജീവം',
    'Emergency alert has been sent. Help is on the way.': 'അടിയന്തര മുന്നറിയിപ്പ് അയച്ചു. സഹായം വരുന്നു.',
    'Location sent:': 'സ്ഥാനം അയച്ചു:',
    'Alert sent:': 'അലേർട്ട് അയച്ചു:',
    'Call 108': '108 വിളിക്കുക',
    'Cancel Alert': 'അലേർട്ട് റദ്ദാക്കുക',
    'Call': 'വിളിക്കുക',
    'Are you sure you want to call': 'നിങ്ങൾക്ക് വിളിക്കാൻ ആഗ്രഹമുണ്ടോ',
    'Home': 'ഹോം',
    'Kerala Health Assistant': 'കേരള ആരോഗ്യ സഹായി',
    'Health Guide': 'ആരോഗ്യ ഗൈഡ്',
    'Safety Tips': 'സുരക്ഷാ നുറുങ്ങുകൾ',
    'In case of medical emergency, call immediately': 'മെഡിക്കൽ അടിയന്തരാവസ്ഥയിൽ ഉടൻ വിളിക്കുക',
    'EMERGENCY ALERT': 'അടിയന്തര അലേർട്ട്',
    'Send location to all contacts': 'എല്ലാ കോൺടാക്റ്റുകൾക്കും സ്ഥാനം അയയ്ക്കുക',
    'Emergency Contact Numbers': 'അടിയന്തര കോൺടാക്റ്റ് നമ്പറുകൾ',
    'Other Important Numbers': 'മറ്റ് പ്രധാന നമ്പറുകൾ',
    'Emergency alert will send your location to emergency services, your emergency contact, employer, and nearby health volunteers.': 'അടിയന്തര അലേർട്ട് നിങ്ങളുടെ സ്ഥാനം അടിയന്തര സേവനങ്ങൾക്കും നിങ്ങളുടെ അടിയന്���ര കോൺടാക്റ്റിനും തൊഴിലുടമയ്ക്കും അടുത്തുള്ള ആരോഗ്യ സന്നദ്ധപ്രവർത്തകർക്കും അയയ്ക്കും.',
    'Others': 'മറ്റുള്ളവ',
    'Welcome to Kerala Digital Health Records': 'കേരള ഡിജിറ്റൽ ആരോഗ്യ രേഖകളിലേക്ക് സ്വാഗതം',
    'Comprehensive healthcare for migrant workers - Aarogyam Anandham': 'കുടിയേറ്റ തൊഴിലാളികൾക്കുള്ള സമഗ്ര ആരോഗ്യസേവനം - ആരോഗ്യം ആനന്ദം',
    'Get Started': 'ആരംഭിക്കുക',
    'Switch to Offline Mode': 'ഓഫ്‌ലൈൻ മോഡിലേക്ക് മാറുക',
    'Switch to Online Mode': 'ഓൺലൈൻ മോഡിലേക്ക് മാറുക',
    'Offline': 'ഓഫ്‌ലൈൻ'
  },
  hi: {
    'Emergency': 'आपातकाल',
    'Emergency Services': 'आपातकालीन सेवाएं',
    'Health Guide': 'स्वास्थ्य गाइड',
    'Safety Tips': 'सुरक्षा टिप्स',
    'EMERGENCY ALERT': 'आपातकालीन अलर्ट',
    'Home': 'होम',
    'Dashboard': 'डैशबोर्ड',
    'Health Records': 'स्वास्थ्य रिकॉर्ड',
    'Find Healthcare': 'स्वास्थ्य सेवा खोजें',
    'Kerala Health Assistant': 'केरल स्वास्थ्य सहायक',
    'Others': 'अन्य',
    'Welcome to Kerala Digital Health Records': 'केरल डिजिटल स्वास्थ्य रिकॉर्ड में आपका स्वागत है',
    'Comprehensive healthcare for migrant workers - Aarogyam Anandham': 'प्रवासी श्रमिकों के लिए व्यापक स्वास्थ्य सेवा - आरोग्यम आनंदम',
    'Get Started': 'शुरू करें',
    'Switch to Offline Mode': 'ऑफ़लाइन मोड पर स्विच करें',
    'Switch to Online Mode': 'ऑनलाइन मोड पर स्विच करें',
    'Offline': 'ऑफ़लाइन'
  },
  ta: {
    'Emergency': 'அவசரநிலை',
    'Emergency Services': 'அவசர சேவைகள்',
    'Health Guide': 'சுகாதார வழிகாட்டி',
    'Safety Tips': 'பாதுகாப்பு குறிப்புகள்',
    'EMERGENCY ALERT': 'அவசர எச்சரிக்கை',
    'Home': 'முகப்பு',
    'Dashboard': 'டாஷ்போர்டு',
    'Health Records': 'சுகாதார பதிவுகள்',
    'Find Healthcare': 'சுகாதார சேவையைக் கண்டறியுங்கள்',
    'Kerala Health Assistant': 'கேரள சுகாதார உதவியாளர்',
    'Others': 'மற்றவை',
    'Welcome to Kerala Digital Health Records': 'கேரள டிஜிட்டல் சுகாதார பதிவுகளுக்கு வரவேற்கிறோம்',
    'Comprehensive healthcare for migrant workers - Aarogyam Anandham': 'இடம்பெயர்ந்த தொழிலாளர்களுக்கான விரிவான சுகாதார சேவை - ஆரோக்யம் ஆனந்தம்'
  }
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = useCallback((text: string): string => {
    if (!text || typeof text !== 'string') return text;
    
    const currentTranslations = translations[language] || translations.en;
    
    // First try exact match
    if (currentTranslations[text]) {
      return currentTranslations[text];
    }
    
    // Try to find partial matches for complex strings
    for (const key in currentTranslations) {
      if (text.includes(key)) {
        return text.replace(key, currentTranslations[key]);
      }
    }
    
    return text;
  }, [language]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setIsTranslating(true);
    setLanguage(newLanguage);
    
    // Simulate translation delay for better UX
    setTimeout(() => {
      setIsTranslating(false);
    }, 300);
  }, []);

  const value = {
    language,
    setLanguage: handleLanguageChange,
    translate,
    isTranslating
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Helper component to automatically translate text
interface TProps {
  children: string;
  className?: string;
  [key: string]: any;
}

export const T: React.FC<TProps> = ({ children, ...props }) => {
  const { translate } = useTranslation();
  return <span {...props}>{translate(children)}</span>;
};