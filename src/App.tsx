import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Separator } from './components/ui/separator';
import { LanguageSelector } from './components/LanguageSelector';
import { VoiceInterface } from './components/VoiceInterface';
import { HealthIDCard } from './components/HealthIDCard';
import { RiskPredictionDashboard } from './components/RiskPredictionDashboard';
import { EmergencyAlert } from './components/EmergencyAlert';
import { EmergencyAnalytics } from './components/EmergencyAnalytics';
import { HealthNavigation } from './components/HealthNavigation';
import { ChatBot } from './components/ChatBot';
import { SDGDashboard } from './components/SDGDashboard';
import { HealthRecords } from './components/HealthRecords';
import { EmployerDashboard } from './components/EmployerDashboard';
import { MedicalAwareness } from './components/MedicalAwareness';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { RecentDiseaseAlerts } from './components/RecentDiseaseAlerts';
import { AuthenticationComponent, UserRole } from './components/AuthenticationComponent';
import { TranslationProvider, useTranslation, T } from './components/TranslationProvider';
import { AccessibilityButton } from './components/AccessibilityButton';
import keralaHealthLogo from 'figma:asset/f43d06153a66ae62d83eb3f7da99afc72c298bf8.png';
import newKeralaLogo from 'figma:asset/f3fe876d6942cade8690d8c405fec1a40b8dcb9d.png';
import heroImage from 'figma:asset/f6784c4ae30412e15860a9a0f2ba96d5186671fc.png';
import footerImage from 'figma:asset/e00d74906f6e1fbf996b84ffdc58687bd9fea9a2.png';
import { 
  Heart, 
  MapPin, 
  MessageCircle, 
  FileText, 
  Target, 
  AlertTriangle, 
  Brain,
  Wifi,
  WifiOff,
  Users,
  Building2,
  BookOpen,
  Search,
  Facebook,
  Printer,
  Home,
  ChevronDown,
  Bot,
  X,
  Menu,
  LogOut,
  User,
  BarChart3,
  Phone,
  Shield
} from 'lucide-react';

// Hero Image Component
function HeroImageComponent() {
  return (
    <img
      src={heroImage}
      alt="Healthy Migrants, Prosperous Kerala - Kerala Health Services Campaign"
      className="w-full h-48 md:h-64 lg:h-72 xl:h-80 object-cover object-center"
    />
  );
}

function AppContent() {
  const { language, setLanguage, translate } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Close mobile menu when clicking outside or on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Mock data for multiple migrant workers
  const migrantWorkers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      healthId: 'KL-MIG-2024-001234',
      aadhaarNumber: '1234-5678-9012',
      bloodType: 'B+',
      emergencyContact: '+91-9876543210',
      employer: 'ABC Construction Ltd',
      currentLocation: 'Kochi, Kerala',
      age: 32,
      state: 'Uttar Pradesh',
      occupation: 'Construction Worker'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      healthId: 'KL-MIG-2024-001235',
      aadhaarNumber: '2345-6789-0123',
      bloodType: 'A+',
      emergencyContact: '+91-9876543211',
      employer: 'Kerala Textiles Pvt Ltd',
      currentLocation: 'Thiruvananthapuram, Kerala',
      age: 28,
      state: 'Rajasthan',
      occupation: 'Textile Worker'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      healthId: 'KL-MIG-2024-001236',
      aadhaarNumber: '3456-7890-1234',
      bloodType: 'O+',
      emergencyContact: '+91-9876543212',
      employer: 'Spice Gardens Kerala',
      currentLocation: 'Idukki, Kerala',
      age: 35,
      state: 'West Bengal',
      occupation: 'Agricultural Worker'
    },
    {
      id: '4',
      name: 'Lakshmi Devi',
      healthId: 'KL-MIG-2024-001237',
      aadhaarNumber: '4567-8901-2345',
      bloodType: 'AB+',
      emergencyContact: '+91-9876543213',
      employer: 'Fish Processing Unit',
      currentLocation: 'Kollam, Kerala',
      age: 26,
      state: 'Tamil Nadu',
      occupation: 'Food Processing'
    },
    {
      id: '5',
      name: 'Ravi Chandra',
      healthId: 'KL-MIG-2024-001238',
      aadhaarNumber: '5678-9012-3456',
      bloodType: 'B-',
      emergencyContact: '+91-9876543214',
      employer: 'Kerala Infrastructure Ltd',
      currentLocation: 'Kozhikode, Kerala',
      age: 29,
      state: 'Andhra Pradesh',
      occupation: 'Road Construction'
    },
    {
      id: '6',
      name: 'Sunita Yadav',
      healthId: 'KL-MIG-2024-001239',
      aadhaarNumber: '6789-0123-4567',
      bloodType: 'A-',
      emergencyContact: '+91-9876543215',
      employer: 'Domestic Services Co',
      currentLocation: 'Ernakulam, Kerala',
      age: 24,
      state: 'Bihar',
      occupation: 'Domestic Worker'
    }
  ];

  const getSelectedWorker = () => {
    if (!selectedPerson) return null;
    return migrantWorkers.find(worker => worker.id === selectedPerson);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('home');
    setSelectedPerson(null);
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setIsMobileMenuOpen(false); // Close mobile menu when tab changes
    // Reset selected person when navigating away from dashboard
    if (newTab !== 'dashboard') {
      setSelectedPerson(null);
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', icon: Heart, label: translate('Dashboard') },
      { id: 'records', icon: FileText, label: translate('Health Records') },
      { id: 'navigation', icon: MapPin, label: translate('Find Healthcare') },
      { id: 'emergency', icon: AlertTriangle, label: translate('Emergency') },
      { id: 'awareness', icon: BookOpen, label: translate('Medical Awareness') }
    ];

    // Add role-specific menu items
    if (currentUser?.role === 'government') {
      baseItems.push({ id: 'sdg', icon: Target, label: translate('SDG Dashboard') });
    }
    
    if (currentUser?.role === 'employer' || currentUser?.role === 'government') {
      baseItems.push({ id: 'employer', icon: Building2, label: translate('Employer Dashboard') });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Show authentication screen if not logged in
  if (!isAuthenticated) {
    return (
      <AuthenticationComponent 
        onLogin={handleLogin} 
        migrantWorkersCount={migrantWorkers.length}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header Bar */}
      <div className="kerala-dhs-top-bar">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 hidden sm:block">📅 Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector value={language} onValueChange={setLanguage} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOnline(!isOnline)}
                className="h-8 px-3 flex items-center gap-2 text-xs"
                title={isOnline ? "Switch to Offline Mode" : "Switch to Online Mode"}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-600">Offline</span>
                  </>
                )}
              </Button>
              {isAuthenticated && currentUser && (
                <div className="flex items-center gap-2">
                  <Badge className="kerala-dhs-badge text-xs">
                    <User className="w-3 h-3 mr-1" />
                    {currentUser.name}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="h-8 px-2 text-xs text-red-600 hover:text-red-700"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="kerala-dhs-main-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left Logo */}
            <div className="flex items-center">
              <img 
                src={newKeralaLogo} 
                alt="Government of Kerala" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            
            {/* Center Title */}
            <div className="text-center flex-1 mx-4 md:mx-8">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-800 mb-1">
                DIRECTORATE OF HEALTH SERVICES
              </h1>
              <p className="text-sm md:text-lg text-blue-700 font-medium hidden sm:block">
                ആരോഗ്യ വക്‍കുപ്പ് ഡയരക്ട്റെരുടെ കയിട്ടില്ലയം
              </p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                <T>Kerala Digital Health Records - Migrant Worker System</T>
              </p>
            </div>
            
            {/* Right Logo */}
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="kerala-dhs-nav text-white relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-6 lg:space-x-8 py-3">
              <button
                onClick={() => handleTabChange('home')}
                className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'home' ? 'bg-blue-600' : ''
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium"><T>Home</T></span>
              </button>
              
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'dashboard' ? 'bg-blue-600' : ''
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium"><T>Dashboard</T></span>
              </button>
              
              <button
                onClick={() => handleTabChange('records')}
                className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'records' ? 'bg-blue-600' : ''
                }`}
              >
                <span className="text-sm font-medium"><T>Health Records</T></span>
              </button>

              <button
                onClick={() => handleTabChange('navigation')}
                className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'navigation' ? 'bg-blue-600' : ''
                }`}
              >
                <span className="text-sm font-medium"><T>Find Healthcare</T></span>
              </button>

              <button
                onClick={() => handleTabChange('emergency')}
                className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'emergency' ? 'bg-blue-600' : ''
                }`}
              >
                <span className="text-sm font-medium"><T>Emergency</T></span>
              </button>

              {currentUser?.role === 'government' && (
                <button
                  onClick={() => handleTabChange('sdg')}
                  className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap hidden lg:block ${
                    activeTab === 'sdg' ? 'bg-blue-600' : ''
                  }`}
                >
                  <span className="text-sm font-medium"><T>SDG Dashboard</T></span>
                </button>
              )}

              {(currentUser?.role === 'employer' || currentUser?.role === 'government') && (
                <button
                  onClick={() => handleTabChange('employer')}
                  className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap hidden xl:block ${
                    activeTab === 'employer' ? 'bg-blue-600' : ''
                  }`}
                >
                  <span className="text-sm font-medium"><T>Employer Dashboard</T></span>
                </button>
              )}

              <button
                onClick={() => handleTabChange('awareness')}
                className={`px-2 md:px-3 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap ${
                  activeTab === 'awareness' ? 'bg-blue-600' : ''
                }`}
              >
                <span className="text-sm font-medium"><T>Medical Awareness</T></span>
              </button>
            </div>

            {/* Mobile Navigation - Hamburger Menu */}
            <div className="flex md:hidden items-center py-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
                <span className="text-sm font-medium"><T>Menu</T></span>
              </button>
            </div>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 ml-2">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-2 space-y-1 border-t border-blue-600/30">
              {/* Home - First Menu Item */}
              <button
                onClick={() => handleTabChange('home')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-600 transition-colors ${
                  activeTab === 'home' ? 'bg-blue-600 font-medium' : ''
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm"><T>Home</T></span>
              </button>
              
              {/* Other Menu Items */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-600 transition-colors ${
                    activeTab === item.id ? 'bg-blue-600 font-medium' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="container mx-auto p-6 space-y-6">
              {!isOnline && (
                <Alert className="border-orange-200 bg-orange-50">
                  <WifiOff className="w-4 h-4" />
                  <AlertDescription>
                    <T>You're currently offline. Some features may be limited. Data will sync when connection is restored.</T>
                  </AlertDescription>
                </Alert>
              )}

              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div className="relative w-full overflow-hidden rounded-lg kerala-dhs-card">
                    <HeroImageComponent />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 md:p-8">
                      <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                          
                        </h2>
                        <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
                          
                        </p>

                      </div>
                    </div>
                  </div>

                  {/* Welcome Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="kerala-dhs-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 kerala-dhs-accent">
                          <Heart className="w-6 h-6" />
                          <T>Welcome to Kerala Digital Health Records</T>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          <T>A comprehensive digital health platform designed specifically for migrant workers in Kerala. Access your health records, find healthcare facilities, and get AI-powered health insights in your preferred language.</T>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="kerala-dhs-badge">
                            <T>Multilingual Support</T>
                          </Badge>
                          <Badge className="kerala-dhs-badge">
                            <T>AI Health Assistant</T>
                          </Badge>
                          <Badge className="kerala-dhs-badge">
                            <T>Emergency Alerts</T>
                          </Badge>
                        </div>
                        <Button 
                          className="kerala-dhs-button-primary"
                          onClick={() => handleTabChange('dashboard')}
                        >
                          <T>Access Health Dashboard</T>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="kerala-dhs-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 kerala-dhs-accent">
                          <AlertTriangle className="w-6 h-6" />
                          <T>Quick Actions</T>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleTabChange('emergency')}
                        >
                          <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                          <T>Emergency Alert</T>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleTabChange('navigation')}
                        >
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                          <T>Find Nearest Hospital</T>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setShowChatbot(true)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                          <T>Health Assistant</T>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleTabChange('records')}
                        >
                          <FileText className="w-4 h-4 mr-2 text-purple-600" />
                          <T>View Health Records</T>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="kerala-dhs-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          <T>For Migrant Workers</T>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          <T>Portable health records that move with you across Kerala. Access healthcare services with your Aadhaar-linked digital health ID.</T>
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="kerala-dhs-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <T>AI-Powered Insights</T>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          <T>Get personalized health risk predictions and preventive care recommendations based on your health data and local disease patterns.</T>
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="kerala-dhs-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-green-600" />
                          <T>SDG Monitoring</T>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          <T>Contributing to Kerala's Sustainable Development Goals by ensuring equitable healthcare access for all migrant workers.</T>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Recent Disease Alerts - Available for All User Types */}
                  <div className="mb-8">
                    <RecentDiseaseAlerts />
                  </div>

                  {!selectedPerson ? (
                    // List view - showing all migrant workers
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <T>Registered Migrant Workers</T>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            <T>Click on any worker to view their detailed health profile</T>
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {migrantWorkers
                              .filter(worker => {
                                // Filter based on user role and access
                                if (currentUser?.role === 'migrant') {
                                  return worker.id === '1'; // Only show their own record
                                }
                                if (currentUser?.role === 'employer') {
                                  return worker.employer === currentUser.organization || worker.employer === 'ABC Construction Ltd';
                                }
                                return true; // Government can see all
                              })
                              .map((worker) => (
                              <Card 
                                key={worker.id}
                                className="cursor-pointer kerala-dhs-card border-l-4 border-l-primary"
                                onClick={() => setSelectedPerson(worker.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-medium">{worker.name}</h3>
                                      <Badge variant="secondary">{worker.bloodType}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      <T>ID:</T> {worker.healthId}
                                    </p>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                      <p>👤 <T>{worker.occupation}</T></p>
                                      <p>🏢 {worker.employer}</p>
                                      <p>📍 {worker.currentLocation}</p>
                                      <p>🏠 <T>From</T> {worker.state}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="kerala-dhs-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-primary" />
                              <T>System Overview</T>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm"><T>Total Workers</T></span>
                                <Badge variant="secondary">{currentUser?.migrantCount || migrantWorkers.length}</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm"><T>Active Today</T></span>
                                <Badge variant="default">{(currentUser?.migrantCount || migrantWorkers.length) - 1}</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm"><T>Health Alerts</T></span>
                                <Badge variant="destructive">2</Badge>
                              </div>
                              {currentUser?.organization && (
                                <div className="pt-2 border-t">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm"><T>Organization</T></span>
                                    <span className="text-xs text-muted-foreground">{currentUser.organization}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm"><T>Access Level</T></span>
                                    <Badge className="kerala-dhs-badge text-xs">{currentUser.accessLevel}</Badge>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="kerala-dhs-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary" />
                              <T>Location Distribution</T>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Kochi</span>
                                <span>2</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Thiruvananthapuram</span>
                                <span>1</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Kozhikode</span>
                                <span>1</span>
                              </div>
                              <div className="flex justify-between">
                                <span><T>Others</T></span>
                                <span>2</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="kerala-dhs-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                              <T>Recent Alerts</T>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span><T>High BP detected</T> - Rajesh K.</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span><T>Missed checkup</T> - Priya S.</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span><T>Vaccination complete</T> - Ali M.</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Analytics Section - Only for Government Users */}
                      {currentUser?.role === 'government' && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <DashboardAnalytics />
                        </div>
                      )}
                    </div>
                  ) : (
                    // Detail view - showing selected person's details
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedPerson(null)}
                          className="mb-4"
                        >
                          <T>Back to List</T>
                        </Button>
                        <h2 className="text-xl font-medium mb-4">
                          {getSelectedWorker()?.name} <T>Health Profile</T>
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                          <HealthIDCard user={getSelectedWorker()} />
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-600" />
                                <T>AI Health Insights</T>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <RiskPredictionDashboard userId={getSelectedWorker()?.healthId || ''} />
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="space-y-6">
                          <VoiceInterface language={language} />
                          <EmergencyAlert userLocation={getSelectedWorker()?.currentLocation || ''} />
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <T>Quick Access</T>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <Button 
                                variant="outline" 
                                className="w-full justify-start"
                                onClick={() => handleTabChange('records')}
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                <T>View Health Records</T>
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start"
                                onClick={() => handleTabChange('navigation')}
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                <T>Find Healthcare</T>
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start"
                                onClick={() => setShowChatbot(true)}
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                <T>Health Assistant</T>
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'records' && <HealthRecords />}
              {activeTab === 'navigation' && <HealthNavigation userLocation={getSelectedWorker()?.currentLocation || 'Kerala, India'} />}
              {activeTab === 'emergency' && (
                currentUser?.role === 'government' ? (
                  <EmergencyAnalytics />
                ) : (
                  <div className="max-w-md mx-auto">
                    <EmergencyAlert userLocation={getSelectedWorker()?.currentLocation || 'Kerala, India'} />
                  </div>
                )
              )}

              {activeTab === 'sdg' && currentUser?.role === 'government' && <SDGDashboard />}
              {activeTab === 'employer' && (currentUser?.role === 'employer' || currentUser?.role === 'government') && <EmployerDashboard />}
              {activeTab === 'awareness' && <MedicalAwareness />}
        </div>
      </main>

      {/* Accessibility Button */}
      <AccessibilityButton />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Emergency Button - Only for Migrant Users */}
        {currentUser?.role === 'migrant' && (
          <Button
            onClick={() => handleTabChange('emergency')}
            className="w-16 h-16 rounded-full emergency-floating-button border-none flex items-center justify-center group"
            title="Emergency Alert"
          >
            <AlertTriangle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </Button>
        )}
        
        {/* AI Assistant Button */}
        <Button
          onClick={() => setShowChatbot(true)}
          className="w-16 h-16 rounded-full kerala-dhs-floating-button border-none flex items-center justify-center group"
          title="Health Assistant"
        >
          <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>

      {/* AI Assistant Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b kerala-dhs-header rounded-t-lg flex-shrink-0">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-white" />
                <h2 className="text-lg font-medium text-white">
                  <T>Kerala Health Assistant</T>
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatbot(false)}
                className="text-white hover:bg-blue-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ChatBot language={language} isOnline={isOnline} />
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="kerala-dhs-footer mt-auto">
        {/* Helpful Features Section for Migrant Workers */}
        {currentUser?.role === 'migrant' && (
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-8">
            <div className="container mx-auto px-4">
              <h3 className="text-white text-lg font-medium mb-6 text-center">
                <T>Essential Resources for Migrant Workers</T>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Emergency Services */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium"><T>Emergency</T></h4>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><T>Ambulance:</T> 108</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><T>Emergency:</T> 112</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><T>Police:</T> 100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><T>Women Helpline:</T> 1091</span>
                    </div>
                  </div>
                </div>

                {/* Health Services */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium"><T>Health Services</T></h4>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <button 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                      onClick={() => handleTabChange('navigation')}
                    >
                      <MapPin className="w-4 h-4" />
                      <span><T>Find Nearest Hospital</T></span>
                    </button>
                    <button 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                      onClick={() => handleTabChange('records')}
                    >
                      <FileText className="w-4 h-4" />
                      <span><T>Health Records</T></span>
                    </button>
                    <button 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                      onClick={() => setShowChatbot(true)}
                    >
                      <Bot className="w-4 h-4" />
                      <span><T>AI Health Assistant</T></span>
                    </button>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><T>Health Helpline:</T> 104</span>
                    </div>
                  </div>
                </div>

                {/* Language Support */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium"><T>Language Support</T></h4>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span><T>Hindi Support Available</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌏</span>
                      <span><T>Malayalam Translation</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span><T>English Support</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📱</span>
                      <span><T>Voice Commands</T></span>
                    </div>
                  </div>
                </div>

                {/* Important Links */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium"><T>Quick Links</T></h4>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <button 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                      onClick={() => handleTabChange('awareness')}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span><T>Medical Awareness</T></span>
                    </button>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span><T>Labor Department</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span><T>Worker Rights</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span><T>Community Support</T></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => window.open('tel:108')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <T>Emergency 108</T>
                </Button>
                
                <Button
                  onClick={() => handleTabChange('navigation')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <T>Find Hospital</T>
                </Button>
                
                <Button
                  onClick={() => setShowChatbot(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <T>Health Assistant</T>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Original Footer Image */}
        <div className="w-full">
          <img 
            src={footerImage} 
            alt="Contact Information - Directorate of Health Services, Kerala" 
            className="w-full h-auto object-cover"
          />
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}