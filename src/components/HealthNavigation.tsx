import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Navigation, Star, Clock, Phone, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation, T } from './TranslationProvider';

interface HealthNavigationProps {
  userLocation: string;
}

export function HealthNavigation({ userLocation }: HealthNavigationProps) {
  const { translate } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceType, setServiceType] = useState('all');

  // Mock health facility data
  const healthFacilities = [
    {
      id: 1,
      name: 'Government General Hospital',
      type: 'hospital',
      distance: '0.8 km',
      rating: 4.2,
      services: ['Emergency', 'General Medicine', 'Surgery'],
      phone: '+91-xxx-xxx-xxxx',
      address: 'MG Road, Kochi',
      waitTime: '45 mins',
      available: true,
      image: 'https://images.unsplash.com/photo-1715310306143-787865a1b538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBtZWRpY2FsJTIwY2xpbmljfGVufDF8fHx8MTc1NzI0ODc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Community Health Center',
      type: 'clinic',
      distance: '1.2 km',
      rating: 4.0,
      services: ['Primary Care', 'Vaccinations', 'Health Checkups'],
      phone: '+91-xxx-xxx-xxxx',
      address: 'Fort Kochi',
      waitTime: '20 mins',
      available: true,
      image: 'https://images.unsplash.com/photo-1606309028742-4039c7b625b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd29ya2VycyUyMG1pZ3JhbnR8ZW58MXx8fHwxNzU3MjQ4NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Migrant Worker Health Post',
      type: 'specialty',
      distance: '2.1 km',
      rating: 4.5,
      services: ['Migrant Support', 'Language Assistance', 'Free Consultation'],
      phone: '+91-xxx-xxx-xxxx',
      address: 'Ernakulam',
      waitTime: '15 mins',
      available: true,
      image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaGVhbHRoJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NzI0ODc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const filteredFacilities = healthFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = serviceType === 'all' || facility.type === serviceType;
    return matchesSearch && matchesType;
  });

  const openDirections = (facilityName: string) => {
    const query = encodeURIComponent(`${facilityName}, Kerala, India`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-blue-600" />
        <h2><T>Find Healthcare Near You</T></h2>
      </div>

      {/* Embedded Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <T>Healthcare Facilities Map - Kerala</T>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2003648.2031881248!2d75.18426344179687!3d10.308670796894855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala%2C%20India!5e0!3m2!1sen!2s!4v1673616734127!5m2!1sen!2s&q=hospitals+kerala"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kerala Healthcare Facilities Map"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <T>Interactive map showing hospitals and healthcare facilities across Kerala. Click on markers for more details.</T>
          </p>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hospitals, clinics, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospitals</SelectItem>
                <SelectItem value="clinic">Clinics</SelectItem>
                <SelectItem value="specialty">Specialty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Current location: {userLocation}
          </div>
        </CardContent>
      </Card>

      {/* Facility List */}
      <div className="space-y-3">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground">{facility.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{facility.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{facility.distance}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {facility.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Wait: {facility.waitTime}
                      </div>
                      <Badge variant={facility.available ? "default" : "secondary"}>
                        {facility.available ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`tel:${facility.phone}`)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => openDirections(facility.name)}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}