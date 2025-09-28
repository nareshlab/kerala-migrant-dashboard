import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  Wifi,
  Sparkles,
  Heart,
  Shield,
  Activity,
  Clock,
  Star,
  ChevronDown,
  RotateCcw,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  Zap,
  Volume2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Globe
} from 'lucide-react';

interface ChatBotProps {
  language: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  type?: 'text' | 'health-tip' | 'emergency';
}

export function ChatBot({ language, isOnline = true }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: getWelcomeMessage(language),
      sender: 'bot',
      timestamp: new Date(),
      suggestions: getKeralaDiseasePrompts(language).slice(0, 3),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [activeCategory, setActiveCategory] = useState('diseases');
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  function getWelcomeMessage(lang: string): string {
    const messages = {
      en: "👋 Welcome to Kerala AI Health Assistant! I'm here to help migrant workers with health guidance, disease prevention, and local medical information. What can I help you with today?",
      ml: "👋 കേരള AI ആരോഗ്യ സഹായിയിലേക്ക് സ്വാഗതം! കുടിയേറ്റ തൊഴിലാളികൾക്ക് ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശം, രോഗ പ്രതിരോധം, പ്രാദേശിക വൈദ്യ വിവരങ്ങൾ എന്നിവയിൽ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
      hi: "👋 केरल AI स्वास्थ्य सहायक में आपका स्वागत है! मैं प्रवासी श्रमिकों को स्वास्थ्य मार्गदर्शन, रोग बचाव और स्थानीय चिकित्सा जानकारी में मदद करने के लिए यहाँ हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
      ta: "👋 கேரள AI சுகாதார உதவியாளருக்கு வரவேற்கிறோம்! புலம்பெயர்ந்த தொழிலாளர்களுக்கு சுகாதார வழிகாட்டுதல், நோய் தடுப்பு மற்றும் உள்ளூர் மருத்துவ தகவல்களில் உதவ நான் இங்கே இருக்கிறேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
    };
    return messages[lang as keyof typeof messages] || messages.en;
  }

  function getKeralaDiseasePrompts(lang: string): string[] {
    const prompts = {
      en: [
        'Dengue fever prevention & symptoms',
        'Chikungunya complete guide',
        'Leptospirosis monsoon safety',
        'Malaria protection methods',
        'Food safety for workers',
        'Water purification tips',
        'Emergency health contacts',
        'Nearest medical facilities'
      ],
      ml: [
        'ഡെങ്കു പനി പ്രതിരോധവും ലക്ഷണങ്ങളും',
        'ചിക്കുൻഗുന്യ പൂർണ്ണ ഗൈഡ്',
        'ലെപ്റ്റോസ്പൈറോസിസ് മൺസൂൺ സുരക്ഷ',
        'മലേറിയ സംരക്ഷണ രീതികൾ',
        'തൊഴിലാളികൾക്കുള്ള ഭക്ഷണ സുരക്ഷ',
        'ജല ശുദ്ധീകരണ നുറുങ്ങുകൾ',
        'അടിയന്തര ആരോഗ്യ കോൺടാക്റ്റുകൾ',
        'അടുത്തുള്ള വൈദ്യസൗകര്യങ്ങൾ'
      ],
      hi: [
        'डेंगू बुखार बचाव और लक्षण',
        'चिकनगुनिया पूर्ण गाइड',
        'लेप्टोस्पाइरोसिस मानसून सुरक्षा',
        'मलेरिया संरक्षण तरीके',
        'श्रमिकों के लिए खाद्य सुरक्षा',
        'पानी शुद्धीकरण सुझाव',
        'आपातकालीन स्वास्थ्य संपर्क',
        'निकटतम चिकित्सा सुविधाएं'
      ],
      ta: [
        'டெங்கு காய்ச்சல் தடுப்பு & அறிகுறிகள்',
        'சிக்குன்குனியா முழுமையான வழிகாட்டி',
        'லெப்டோஸ்பைரோசிஸ் பருவமழை பாதுகாப்பு',
        'மலேரியா பாதுகாப்பு முறைகள்',
        'தொழிலாளர்களுக்கான உணவு பாதுகாப்பு',
        'நீர் சுத்திகரிப்பு குறிப்புகள்',
        'அவசர சுகாதார தொடர்புகள்',
        'அருகிலுள்ள மருத்துவ வசதிகள்'
      ]
    };
    return prompts[lang as keyof typeof prompts] || prompts.en;
  }

  function getHealthTips(lang: string): string[] {
    const tips = {
      en: [
        '💧 Drink 3+ liters of water daily in Kerala heat',
        '🧼 Wash hands frequently, especially before meals',
        '🦟 Use mosquito nets - peak disease season ongoing',
        '🍎 Eat fresh, hot food - avoid roadside vendors initially',
        '💊 Keep basic medicines: ORS, paracetamol, antiseptic',
        '📱 Save emergency numbers: 108 (ambulance), 112 (emergency)',
        '🏥 Register at nearest primary health center',
        '🌡️ Monitor temperature - seek help if fever persists'
      ],
      ml: [
        '💧 കേരളത്തിലെ ചൂടിൽ ദിവസം 3+ ലിറ്റർ വെള്ളം കുടിക്കുക',
        '🧼 കൈകൾ ഇടയ്ക്കിടെ കഴുകുക, പ്രത്യേകിച്ച് ഭക്ഷണത്തിനു മുമ്പ്',
        '🦟 കൊതുക് വല ഉപയോഗിക്കുക - രോഗ സീസൺ തുടരുന്നു',
        '🍎 പുതിയ, ചൂടുള്ള ഭക്ഷണം കഴിക്കുക - തുടക്കത്തിൽ റോഡ്സൈഡ് വെണ്ടർമാരെ ഒഴിവാക്കുക',
        '💊 അടിസ്ഥാന മരുന്നുകൾ കരുതുക: ORS, പാരസെറ്റമോൾ, ആന്റിസെപ്റ്റിക്',
        '📱 അടിയന്തര നമ്പറുകൾ സേവ് ചെയ്യുക: 108 (ആംബുലൻസ്), 112 (അടിയന്തര)',
        '🏥 അടുത്തുള്ള പ്രാഥമിക ആരോഗ്യ കേന്ദ്രത്തിൽ രജിസ്റ്റർ ചെയ്യുക',
        '🌡️ താപനില നിരീക്ഷിക്കുക - പനി തുടർന്നാൽ സഹായം തേടുക'
      ],
      hi: [
        '💧 केरल की गर्मी में दिन में 3+ लीटर पानी पिएं',
        '🧼 बार-बार हाथ धोएं, खासकर खाने से पहले',
        '🦟 मच्छरदानी का उपयोग करें - बीमारी का मौसम जारी',
        '🍎 ताजा, गर्म खाना खाएं - शुरू में रोडसाइड वेंडर से बचें',
        '💊 बुनियादी दवाएं रखें: ORS, पेरासिटामोल, एंटीसेप्टिक',
        '📱 आपातकालीन नंबर सेव करें: 108 (एम्बुलेंस), 112 (आपातकाल)',
        '🏥 निकटतम प्राथमिक स्वास्थ्य केंद्र में पंजीकरण कराएं',
        '🌡️ तापमान की निगरानी करें - बुखार बने तो मदद लें'
      ],
      ta: [
        '💧 கேரளாவின் வெப்பத்தில் நாளொன்றுக்கு 3+ லிட்டர் தண்ணீர் குடிக்கவும்',
        '🧼 அடிக்கடி கை கழுவவும், குறிப்பாக உணவுக்கு முன்',
        '🦟 கொசுவலை பயன்படுத்தவும் - நோய் பருவம் தொடர்கிறது',
        '🍎 புதிய, சூடான உணவு சாப்பிடவும் - ஆரம்பத்தில் சாலையோர விற்பனையாளர்களை தவிர்க்கவும்',
        '💊 அடிப்படை மருந்துகள் வைத்திருக்கவும்: ORS, பாராசிட்டமால், கிருமி நாசினி',
        '📱 அவசர எண்களை சேமிக்கவும்: 108 (ஆம்புலன்ஸ்), 112 (அவசரம்)',
        '🏥 அருகிலுள்ள முதன்மை சுகாதார மையத்தில் பதிவு செய்யவும்',
        '🌡️ வெப்பநிலையை கண்காணிக்கவும் - காய்ச்சல் தொடர்ந்தால் உதவி பெறவும்'
      ]
    };
    return tips[lang as keyof typeof tips] || tips.en;
  }

  function getBotResponse(userMessage: string, lang: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      en: {
        dengue: "🦟 **Dengue Fever - Complete Guide:**\n\n**🔴 Critical Symptoms:**\n• High fever (104°F+) for 2-7 days\n• Severe headache & eye pain\n• Muscle & joint aches\n• Nausea, vomiting\n• Skin rash (day 3-5)\n\n**⚠️ Danger Signs (Seek Emergency Care):**\n• Severe abdominal pain\n• Persistent vomiting\n• Bleeding (nose, gums)\n• Difficulty breathing\n• Cold, clammy skin\n\n**🛡️ Prevention Protocol:**\n• Eliminate standing water (pots, containers)\n• Use mosquito nets (especially 6AM-6PM)\n• Wear long sleeves & pants\n• Apply DEET-based repellent\n• Clean water storage weekly\n\n**💊 Treatment:**\n• Paracetamol for fever (NOT aspirin)\n• Increase fluid intake\n• Rest in mosquito-free area\n• Monitor platelet count\n\n**📞 Emergency:** Call 108 if symptoms worsen",
        chikungunya: "🦟 **Chikungunya - Worker's Guide:**\n\n**🔴 Key Symptoms:**\n• Sudden high fever (102-104°F)\n• Severe joint pain (hands, feet, knees)\n• Muscle pain & stiffness\n• Headache & fatigue\n• Skin rash\n\n**⚡ Distinguishing Features:**\n• Joint pain can last weeks/months\n• Morning stiffness is common\n• Affects small joints more\n\n**🛡️ Prevention (Same as Dengue):**\n• Remove stagnant water sources\n• Use protective clothing\n• Apply mosquito repellent\n• Sleep under treated nets\n\n**💊 Management:**\n• Paracetamol for pain & fever\n• Gentle joint exercises\n• Warm compresses for stiffness\n• Stay hydrated\n• Avoid aspirin & ibuprofen\n\n**⏰ Recovery:** Most recover in 7-10 days, but joint pain may persist\n\n**🏥 See doctor if:** Severe joint pain affects work ability",
        leptospirosis: "🌊 **Leptospirosis - Monsoon Alert:**\n\n**⚠️ HIGH RISK in Kerala Monsoons!**\n\n**🔴 Early Symptoms (Days 1-7):**\n• High fever & chills\n• Severe headache\n• Muscle aches (calves, thighs)\n• Nausea, vomiting\n• Red eyes\n• Abdominal pain\n\n**🔴 Severe Phase (Week 2):**\n• Jaundice (yellow skin/eyes)\n• Kidney problems\n• Bleeding\n• Difficulty breathing\n\n**🛡️ Critical Prevention:**\n• AVOID wading in flood water\n• Wear waterproof boots\n• Cover all cuts & wounds\n• Boil drinking water\n• Avoid swimming in contaminated water\n\n**🧼 After Water Exposure:**\n• Wash thoroughly with soap\n• Disinfect any cuts\n• Change clothes immediately\n• Monitor for symptoms\n\n**💊 Treatment:**\n• Antibiotics (doxycycline/penicillin)\n• Must start early for effectiveness\n• Supportive care for complications\n\n**🚨 URGENT:** See doctor immediately if symptoms appear after water contact!",
        malaria: "🦟 **Malaria Protection Guide:**\n\n**🔴 Symptoms:**\n• Fever with chills (cyclical pattern)\n• Intense sweating\n• Headache & fatigue\n• Nausea, vomiting\n• Muscle aches\n\n**⚡ Emergency Signs:**\n• High fever (105°F+)\n• Confusion, seizures\n• Difficulty breathing\n• Dark/bloody urine\n\n**🛡️ Prevention Strategy:**\n• Use ITNs (Insecticide-Treated Nets)\n• Apply repellent (evening/night)\n• Wear long clothes after sunset\n• Use coils/vaporizers indoors\n• Remove breeding sites\n\n**💊 Treatment:**\n• Rapid diagnostic test required\n• Artemisinin-based therapy\n• Complete full course of medication\n• Follow-up blood tests\n\n**⏰ Timing:** Seek treatment within 24 hours of symptoms\n\n**🏥 Where:** Any government hospital/PHC provides free treatment",
        foodsafety: "🍽️ **Food Safety for Migrant Workers:**\n\n**✅ Safe Eating Practices:**\n• Eat freshly cooked, steaming hot food\n• Choose busy restaurants (high turnover)\n• Avoid raw vegetables initially\n• Peel fruits yourself\n• Drink only boiled/bottled water\n\n**❌ Foods to Avoid Initially:**\n• Street vendor food\n• Raw salads & cut fruits\n• Ice in drinks\n• Dairy products (unrefrigerated)\n• Leftover food\n• Tap water\n\n**🏠 At Accommodation:**\n• Store food in sealed containers\n• Refrigerate perishables immediately\n• Cook meat thoroughly\n• Use clean utensils\n• Keep cooking area clean\n\n**🦠 Common Foodborne Illnesses:**\n• Traveler's diarrhea\n• Food poisoning\n• Typhoid fever\n• Hepatitis A\n\n**💊 First Aid:**\n• ORS for diarrhea\n• Plenty of fluids\n• Bland foods (rice, banana)\n• Avoid dairy temporarily\n\n**🏥 See doctor if:** Severe symptoms, blood in stool, high fever",
        waterborne: "💧 **Water Safety & Purification:**\n\n**🔴 Common Water-borne Diseases:**\n• Cholera (severe diarrhea)\n• Typhoid fever\n• Hepatitis A & E\n• Dysentery\n• Giardiasis\n\n**✅ Safe Water Sources:**\n• Boiled water (rolling boil for 1 min)\n• Bottled water (sealed brands)\n• Water purification tablets\n• UV sterilized water\n\n**🧪 DIY Water Purification:**\n• Boiling: Most effective method\n• Chlorine tablets: Follow instructions\n• Solar disinfection: Clear bottles in sun\n• Filtration: Use clean cloth first\n\n**❌ Avoid:**\n• Tap water\n• Well water (unless tested)\n• Ice cubes\n• Fountain drinks\n• Swimming pool water\n\n**🚿 Personal Hygiene:**\n• Use safe water for brushing teeth\n• Shower with soap\n• Wash hands frequently\n• Clean wounds with safe water\n\n**⚠️ Monsoon Special Alert:**\n• Water contamination increases\n• Be extra cautious\n• Boil even 'clean' looking water",
        emergency: "🚨 **Emergency Health Contacts:**\n\n**📞 Primary Numbers:**\n• Ambulance: 108 (Free, 24/7)\n• Emergency Response: 112\n• Police: 100\n• Fire Service: 101\n• Women Helpline: 1091\n\n**🏥 Kerala Health Services:**\n• Health Department: 0471-2318250\n• Disease Control: 0471-2308470\n• Blood Bank: 0471-2443152\n\n**📱 Mobile Apps:**\n• Arogyam: Kerala health app\n• 108 Ambulance app\n• ESANJEEVANI: Telemedicine\n\n**🆘 When to Call 108:**\n• High fever (104°F+)\n• Difficulty breathing\n• Chest pain\n• Severe headache\n• Unconsciousness\n• Heavy bleeding\n• Severe abdominal pain\n\n**📍 Information to Provide:**\n• Exact location/landmarks\n• Nature of emergency\n• Number of patients\n• Your contact number\n\n**💳 Important:** All emergency services are FREE",
        clinic: "🏥 **Finding Healthcare in Kerala:**\n\n**🎯 Nearest Facilities:**\n• Primary Health Center (PHC): 800m\n• Community Health Center: 2.3km\n• District Hospital: 5.1km\n• Medical College: 12.4km\n\n**📋 What to Bring:**\n• Aadhaar card\n• Health ID (if available)\n• Previous medical records\n• Current medications\n• Emergency contact info\n\n**💰 Cost Information:**\n• PHC: Free consultation\n• Government hospitals: Minimal fees\n• Private clinics: ₹200-500\n• Emergency: Free at govt facilities\n\n**⏰ Operating Hours:**\n• PHC: 8 AM - 8 PM\n• Hospitals: 24/7 emergency\n• Specialist clinics: By appointment\n\n**🗣️ Language Support:**\n• Malayalam translators available\n• Hindi-speaking staff at major hospitals\n• Use translation app if needed\n\n**📱 Would you like directions to the nearest facility?**",
        default: "I'm Kerala's AI Health Assistant, specialized in local diseases and health guidance for migrant workers. I can help with:\n\n🦟 Vector-borne diseases (Dengue, Chikungunya, Malaria)\n🌊 Monsoon-related health risks\n🍽️ Food & water safety\n🏥 Healthcare navigation\n🚨 Emergency guidance\n\nWhat specific health topic would you like to know about?"
      },
      ml: {
        default: "ഞാൻ കേരളത്തിലെ AI ആരോഗ്യ സഹായിയാണ്, പ്രാദേശിക രോഗങ്ങളിലും കുടിയേറ്റ തൊഴിലാളികൾക്കുള്ള ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശത്തിലും വിശേഷജ്ഞൻ. എനിക്ക് സഹായിക്കാം:\n\n🦟 വെക്റ്റർ പരത്തുന്ന രോഗങ്ങൾ (ഡെങ്കു, ചിക്കുൻഗുന്യ, മലേറിയ)\n🌊 മൺസൂൺ ആരോഗ്യ അപകടങ്ങൾ\n🍽️ ഭക്ഷണ-ജല സുരക്ഷ\n🏥 ആരോഗ്യ സേവന മാർഗ്ഗനിർദ്ദേശം\n🚨 അടിയന്തര സഹായം\n\nകൃത്യമായി ഏത് ആരോഗ്യ വിഷയത്തെക്കുറിച്ചാണ് അറിയാൻ വേണ്ടത്?"
      },
      hi: {
        default: "मैं केरल का AI स्वास्थ्य सहायक हूँ, स्थानीय बीमारियों और प्रवासी श्रमिकों के लिए स्वास्थ्य मार्गदर्शन में विशेषज्ञ। मैं मदद कर सकता हूँ:\n\n🦟 वेक्टर जनित रोग (डेंगू, चिकनगुनिया, मलेरिया)\n🌊 मानसून स्वास्थ्य जोखिम\n🍽️ खाना-पानी की सुरक्षा\n🏥 स्वास्थ्य सेवा मार्गदर्शन\n🚨 आपातकालीन सहायता\n\nआप किस विशिष्ट स्वास्थ्य विषय के बारे में जानना चाहते हैं?"
      },
      ta: {
        default: "நான் கேரளாவின் AI சுகாதார உதவியாளர், உள்ளூர் நோய்கள் மற்றும் புலம்பெயர்ந்த தொழிலாளர்களுக்கான சுகாதார வழிகாட்டுதலில் நிபுணர். என்னால் உதவ முடியும்:\n\n🦟 வெக்டர் பரவும் நோய்கள் (டெங்கு, சிக்குன்குனியா, மலேரியா)\n🌊 பருவமழை சுகாதார அபாயங்கள்\n🍽️ உணவு-நீர் பாதுகாப்பு\n🏥 சுகாதார சேவை வழிகாட்டுதல்\n🚨 அவசர உதவி\n\nநீங்கள் எந்த குறிப்பிட்ட சுகாதார தலைப்பைப் பற்றி அறிய விரும்புகிறீர்கள்?"
      }
    };

    const langResponses = responses[lang as keyof typeof responses] || responses.en;

    // Enhanced disease detection with more keywords
    if (lowerMessage.includes('dengue') || lowerMessage.includes('ഡെങ്കു') || lowerMessage.includes('डेंगू') || lowerMessage.includes('டெங்கு')) {
      return langResponses.dengue || responses.en.dengue;
    } else if (lowerMessage.includes('chikungunya') || lowerMessage.includes('ചിക്കുൻഗുന്യ') || lowerMessage.includes('चिकनगुनिया') || lowerMessage.includes('சிக்குன்குனியா')) {
      return langResponses.chikungunya || responses.en.chikungunya;
    } else if (lowerMessage.includes('leptospirosis') || lowerMessage.includes('ലെപ്റ്റോസ്പൈറോസിസ്') || lowerMessage.includes('लेप्टोस्पाइरोसिस') || lowerMessage.includes('லெப்டோஸ்பைரோசிஸ்')) {
      return langResponses.leptospirosis || responses.en.leptospirosis;
    } else if (lowerMessage.includes('malaria') || lowerMessage.includes('മലേറിയ') || lowerMessage.includes('मलेरिया') || lowerMessage.includes('மலேரியா')) {
      return langResponses.malaria || responses.en.malaria;
    } else if (lowerMessage.includes('food') || lowerMessage.includes('ഭക്ഷണം') || lowerMessage.includes('खाना') || lowerMessage.includes('உணவு')) {
      return responses.en.foodsafety;
    } else if (lowerMessage.includes('water') || lowerMessage.includes('വെള്ളം') || lowerMessage.includes('पानी') || lowerMessage.includes('நீர்')) {
      return responses.en.waterborne;
    } else if (lowerMessage.includes('clinic') || lowerMessage.includes('hospital') || lowerMessage.includes('doctor')) {
      return responses.en.clinic;
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
      return responses.en.emergency;
    } else {
      return langResponses.default;
    }
  }

  const sendMessage = (): void => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay with typing indicator
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage, language),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: getKeralaDiseasePrompts(language).slice(0, 3),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSuggestionClick = (suggestion: string): void => {
    setInputMessage(suggestion);
  };

  const handleVoiceInput = (): void => {
    setIsListening(!isListening);
    // Mock voice input functionality
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("What are the symptoms of dengue fever?");
        setIsListening(false);
      }, 2000);
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  const handleFeedback = (messageId: string, type: 'positive' | 'negative'): void => {
    // Mock feedback functionality
    console.log(`Feedback for message ${messageId}: ${type}`);
  };

  const categories = {
    diseases: { icon: Activity, label: 'Diseases', prompts: getKeralaDiseasePrompts(language).slice(0, 4) },
    tips: { icon: Heart, label: 'Health Tips', prompts: getHealthTips(language).slice(0, 4) },
    emergency: { icon: Shield, label: 'Emergency', prompts: ['Emergency contacts', 'Nearest hospital', 'Ambulance service', 'First aid guide'] }
  };

  const quickActions = [
    { icon: Phone, label: 'Emergency 108', action: () => window.open('tel:108'), color: 'text-red-600' },
    { icon: MapPin, label: 'Find Hospital', action: () => setInputMessage('nearest hospital'), color: 'text-blue-600' },
    { icon: FileText, label: 'Health Records', action: () => setInputMessage('health record access'), color: 'text-green-600' },
    { icon: Globe, label: 'Language Help', action: () => setInputMessage('language support'), color: 'text-purple-600' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Enhanced Header */}
      <div className="kerala-dhs-header p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-white" />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white animate-pulse ${
                isOnline ? 'bg-green-400' : 'bg-orange-400'
              }`}></div>
            </div>
            <div className="text-white">
              <h2 className="font-semibold">Kerala AI Health Assistant</h2>
              <p className="text-xs opacity-90 flex items-center gap-2">
                {isOnline ? '🟢 Online - Real-time responses' : '🟡 Offline - Cached responses'}
                <Zap className="w-3 h-3" />
                <span>Advanced AI</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`text-white hover:bg-blue-700 p-2 ${isListening ? 'bg-blue-700' : ''}`}
              title="Voice Input"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessages([{
                  id: '1',
                  content: getWelcomeMessage(language),
                  sender: 'bot',
                  timestamp: new Date(),
                  suggestions: getKeralaDiseasePrompts(language).slice(0, 3),
                  type: 'text'
                }]);
                setShowPrompts(true);
              }}
              className="text-white hover:bg-blue-700 p-2"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      {showQuickActions && (
        <div className="bg-gradient-to-r from-red-50 to-blue-50 border-b p-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Quick Emergency Actions</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickActions(false)}
              className="text-xs text-gray-500 p-1"
            >
              ×
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="flex items-center gap-2 h-auto py-2 text-xs"
              >
                <action.icon className={`w-3 h-3 ${action.color}`} />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Categories */}
      <div className="flex-shrink-0">
        {showPrompts && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Quick Health Assistant</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(categories).map(([key, category]) => (
                <Button
                  key={key}
                  variant={activeCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 ${activeCategory === key ? 'kerala-dhs-button-primary' : ''}`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              {categories[activeCategory as keyof typeof categories].prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage(prompt);
                    setShowPrompts(false);
                  }}
                  className="text-left justify-start h-auto py-2 px-3 text-xs kerala-dhs-nav-item-dropdown"
                >
                  {prompt}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowPrompts(false)}
              className="text-xs text-blue-600"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              Hide suggestions
            </Button>
          </div>
        )}
      </div>
      
      {/* Messages Area with Proper Scrolling */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className={`w-10 h-10 flex-shrink-0 ${message.sender === 'bot' ? 'kerala-dhs-accent' : ''}`}>
                  <AvatarFallback className={message.sender === 'bot' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-xs lg:max-w-lg ${message.sender === 'user' ? 'ml-auto' : ''}`}>
                  <div className={`p-4 rounded-lg shadow-sm ${
                    message.sender === 'user' 
                      ? 'kerala-dhs-button-primary text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className={`${lineIndex === 0 ? 'mt-0' : 'mt-2'} mb-1`}>
                          {line}
                        </p>
                      ))}
                    </div>
                    
                    {/* Message Actions for Bot Messages */}
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.content)}
                          className="text-xs p-1 h-auto"
                          title="Copy message"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const utterance = new SpeechSynthesisUtterance(message.content);
                            utterance.lang = language === 'ml' ? 'ml-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
                            speechSynthesis.speak(utterance);
                          }}
                          className="text-xs p-1 h-auto"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Separator orientation="vertical" className="h-4" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, 'positive')}
                          className="text-xs p-1 h-auto text-green-600"
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, 'negative')}
                          className="text-xs p-1 h-auto text-red-600"
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.sender === 'bot' && isOnline && (
                      <Badge variant="outline" className="text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        Live AI
                      </Badge>
                    )}
                    {message.sender === 'bot' && (
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Kerala Expert
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].suggestions && (
              <div className="flex flex-wrap gap-2 px-2 mt-4">
                <div className="flex items-center gap-2 mb-2 w-full">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Suggested topics:</span>
                </div>
                {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors py-1 px-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is analyzing your query...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
        
      {/* Enhanced Input Area */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        {!showPrompts && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowPrompts(true)}
            className="mb-3 text-xs kerala-dhs-accent flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Show health suggestions
          </Button>
        )}
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Ask about symptoms, diseases, prevention, or emergency help..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="kerala-dhs-input pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}
              title={isListening ? "Stop listening" : "Voice Input"}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={sendMessage} 
            size="sm" 
            className="kerala-dhs-button-primary px-4"
            disabled={!inputMessage.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>💡 Ask about Kerala-specific health concerns</span>
            {isListening && (
              <Badge variant="outline" className="text-xs animate-pulse">
                <Mic className="w-3 h-3 mr-1" />
                Listening...
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span>Status:</span>
            {isOnline ? (
              <span className="text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Online
              </span>
            ) : (
              <span className="text-orange-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Offline
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}