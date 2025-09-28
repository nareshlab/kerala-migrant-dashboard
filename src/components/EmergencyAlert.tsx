import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { AlertTriangle, Phone, MapPin, Clock, AlertCircle, Hospital, Heart, Shield, User, FileText, HeadphonesIcon, Languages } from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

interface EmergencyAlertProps {
  userLocation: string;
}

export function EmergencyAlert({ userLocation }: EmergencyAlertProps) {
  const [alertSent, setAlertSent] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const { translate } = useTranslation();

  const emergencyContacts = [
    { name: translate('Emergency Services'), number: '108', type: 'primary', description: translate('For all medical emergencies') },
    { name: translate('Kerala Police'), number: '100', type: 'police', description: translate('For security and safety issues') },
    { name: translate('Fire Services'), number: '101', type: 'fire', description: translate('For fire emergencies and rescue') },
    { name: translate('Women Helpline'), number: '1091', type: 'women', description: translate('24x7 women safety helpline') },
    { name: translate('Migrant Worker Helpline'), number: '0471-2552056', type: 'support', description: translate('Kerala Labour Department support') },
    { name: translate('Mental Health Helpline'), number: '104', type: 'mental', description: translate('Mental health crisis support') },
    { name: translate('Child Helpline'), number: '1098', type: 'child', description: translate('Child protection services') },
    { name: translate('Poison Control'), number: '011-26589391', type: 'poison', description: translate('For poisoning emergencies') }
  ];

  const healthEmergencies = [
    { condition: translate('Heart Attack'), symptoms: translate('Chest pain, shortness of breath, nausea'), action: translate('Call 108 immediately, chew aspirin if available') },
    { condition: translate('Stroke'), symptoms: translate('Face drooping, arm weakness, speech difficulty'), action: translate('Call 108 immediately, note time of symptoms') },
    { condition: translate('Severe Allergic Reaction'), symptoms: translate('Difficulty breathing, swelling, rash'), action: translate('Use EpiPen if available, call 108') },
    { condition: translate('Severe Bleeding'), symptoms: translate('Heavy bleeding that won\'t stop'), action: translate('Apply direct pressure, elevate wound, call 108') },
    { condition: translate('Unconsciousness'), symptoms: translate('Person not responding'), action: translate('Check breathing, call 108, do not move unless necessary') },
    { condition: translate('Heat Stroke'), symptoms: translate('High fever, confusion, hot dry skin'), action: translate('Move to shade, cool with water, call 108') }
  ];

  const safetyTips = [
    { icon: Shield, tip: translate('Always carry your health ID and emergency contact information') },
    { icon: Phone, tip: translate('Save emergency numbers in your phone with clear labels') },
    { icon: MapPin, tip: translate('Share your location with trusted contacts when working') },
    { icon: User, tip: translate('Inform your employer about any medical conditions') },
    { icon: Heart, tip: translate('Know the location of nearest hospital from your workplace') },
    { icon: FileText, tip: translate('Keep important medical documents easily accessible') }
  ];

  const sendEmergencyAlert = () => {
    setAlertSent(true);
    setIsEmergency(true);
    
    // Mock emergency alert
    setTimeout(() => {
      alert('Emergency alert sent to all contacts and nearby responders!');
    }, 1000);
  };

  const cancelAlert = () => {
    setIsEmergency(false);
    setAlertSent(false);
  };

  if (isEmergency) {
    return (
      <Card className="border-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <T>EMERGENCY ACTIVE</T>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-100">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <T>Emergency alert has been sent. Help is on the way.</T>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-600" />
              <span><T>Location sent:</T> {userLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-red-600" />
              <span><T>Alert sent:</T> {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={() => window.open('tel:108')}>
              <Phone className="w-4 h-4 mr-2" />
              <T>Call 108</T>
            </Button>
            <Button variant="outline" size="sm" onClick={cancelAlert}>
              <T>Cancel Alert</T>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="emergency" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emergency"><T>Emergency</T></TabsTrigger>
          <TabsTrigger value="health"><T>Health Guide</T></TabsTrigger>
          <TabsTrigger value="safety"><T>Safety Tips</T></TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <T>Emergency Services</T>
              </CardTitle>
              <p className="text-sm text-red-600">
                <T>In case of medical emergency, call immediately</T>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white min-h-[3.5rem] py-4"
                size="lg"
                onClick={sendEmergencyAlert}
              >
                <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                <div className="text-center">
                  <div className="font-bold text-lg"><T>EMERGENCY ALERT</T></div>
                  <div className="text-sm opacity-90"><T>Send location to all contacts</T></div>
                </div>
              </Button>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-red-700"><T>Emergency Contact Numbers</T></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyContacts.slice(0, 4).map((contact, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="h-auto p-3 text-left whitespace-normal flex-col items-start"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">{contact.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">{contact.description}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle><T>Call</T> {contact.name}</DialogTitle>
                          <DialogDescription>
                            {contact.description}
                            <br />
                            <T>Number:</T> {contact.number}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={() => window.open(`tel:${contact.number}`)}>
                            <Phone className="w-4 h-4 mr-2" />
                            <T>Call Now</T>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-orange-700"><T>Other Important Numbers</T></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {emergencyContacts.slice(4).map((contact, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="h-auto p-2 text-left justify-start"
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.number}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <Alert className="border-blue-200 bg-blue-50">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  <T>Emergency alert will send your location to emergency services, your emergency contact, employer, and nearby health volunteers.</T>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hospital className="w-5 h-5 text-red-600" />
                <T>Medical Emergency Guide</T>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                <T>Recognize symptoms and know what to do</T>
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthEmergencies.map((emergency, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-red-700 mb-2">{emergency.condition}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium"><T>Symptoms:</T></span> {emergency.symptoms}
                        </div>
                        <div>
                          <span className="font-medium text-green-700"><T>Action:</T></span> {emergency.action}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <Alert className="border-green-200 bg-green-50">
                <Heart className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <T>Remember: When in doubt, always call 108. It's better to be safe than sorry.</T>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <T>Safety Guidelines for Migrant Workers</T>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                <T>Essential safety tips for staying safe and healthy</T>
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <tip.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-sm">{tip.tip}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Languages className="w-5 h-5 text-purple-600" />
                  <T>Language Support</T>
                </h4>
                <Alert className="border-purple-200 bg-purple-50">
                  <HeadphonesIcon className="w-4 h-4 text-purple-600" />
                  <AlertDescription className="text-purple-700">
                    <T>Emergency services (108) provide support in multiple languages including English, Malayalam, Hindi, and Tamil. Don't hesitate to call if you need help communicating.</T>
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="space-y-3 mt-4">
                <h4 className="font-medium"><T>Important Documents to Keep</T></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Aadhaar Card</T></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Health ID Card</T></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Emergency Contact Info</T></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Blood Type Information</T></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Medical Allergies List</T></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span><T>Current Medications</T></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}