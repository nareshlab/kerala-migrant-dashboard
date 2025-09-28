import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { IdCard, Shield, Users, MapPin, QrCode, X } from 'lucide-react';

interface HealthIDCardProps {
  user: {
    name: string;
    healthId: string;
    aadhaarNumber: string;
    bloodType: string;
    emergencyContact: string;
    employer: string;
    currentLocation: string;
  } | null;
}

export function HealthIDCard({ user }: HealthIDCardProps) {
  const [showQR, setShowQR] = useState(false);
  
  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No user selected</p>
        </CardContent>
      </Card>
    );
  }
  
  // Generate a random QR code pattern
  const generateRandomQR = () => {
    const qrData = `HEALTH_ID:${user.healthId}:${user.aadhaarNumber}:${Date.now()}`;
    return qrData;
  };

  // Simple QR code visual representation using a grid pattern
  const QRCodeVisual = () => {
    const size = 25;
    const pattern = Array(size).fill(null).map((_, i) => 
      Array(size).fill(null).map((_, j) => {
        // Create finder patterns (corners)
        if ((i < 7 && j < 7) || (i < 7 && j >= size - 7) || (i >= size - 7 && j < 7)) {
          return (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4));
        }
        // Random data pattern for the rest
        return Math.random() > 0.5;
      })
    );
    
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-lg">
        <div className="w-60 h-60 mx-auto bg-white border border-gray-200 p-4">
          <div 
            className="w-full h-full grid gap-0"
            style={{ 
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`
            }}
          >
            {pattern.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`${cell ? 'bg-black' : 'bg-white'}`}
                />
              ))
            )}
          </div>
        </div>
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm font-mono text-gray-700">Health ID: {user.healthId}</p>
          <p className="text-xs text-gray-500">Scan to verify digital health record</p>
          <p className="text-xs text-gray-400">Generated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <Badge variant="secondary" className="text-xs">
                <IdCard className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-[60px] h-[60px] p-0"
            onClick={() => setShowQR(true)}
          >
            <QrCode className="w-8 h-8 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground">Health ID</p>
              <p className="font-mono">{user.healthId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Digilocker ID</p>
              <p className="font-mono">XXXXX1234</p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Blood Type</p>
            <p className="font-medium text-red-600">{user.bloodType}</p>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-muted-foreground">Aadhaar Linked:</span>
            <span className="font-mono">****-{user.aadhaarNumber.slice(-4)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-muted-foreground">Employer:</span>
            <span>{user.employer}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="text-muted-foreground">Location:</span>
            <span>{user.currentLocation}</span>
          </div>
        </div>
        
        <div className="pt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Emergency: {user.emergencyContact}
          </p>
        </div>
      </CardContent>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Digital Health ID QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <QRCodeVisual />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This QR code contains encrypted health identification data for {user.name}
              </p>
            </div>
            <Button 
              onClick={() => setShowQR(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}