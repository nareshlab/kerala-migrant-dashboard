import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Users, Shield, IdCard, User, Lock, Mail } from 'lucide-react';
import { T } from './TranslationProvider';

export type UserRole = 'employer' | 'government' | 'migrant' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  accessLevel: string;
  migrantCount?: number;
}

interface AuthenticationComponentProps {
  onLogin: (user: User) => void;
  migrantWorkersCount: number;
}

export function AuthenticationComponent({ onLogin, migrantWorkersCount }: AuthenticationComponentProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('government');
  const [email, setEmail] = useState('gov@example.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    government: {
      icon: Shield,
      title: 'Government Dashboard',
      description: 'Access policy analytics and health surveillance data',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    employer: {
      icon: Building2,
      title: 'Employer Portal',
      description: 'Monitor employee health compliance and reports',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    migrant: {
      icon: User,
      title: 'Migrant Worker Access',
      description: 'Access your personal health records and services',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  };

  const handleLogin = async () => {
    if (!activeRole || !email || !password) return;
    
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers: Record<UserRole, User> = {
      government: {
        id: '4',
        name: 'Dr. Priya Thomas',
        email: 'gov@example.com',
        role: 'government',
        organization: 'Kerala Health Services Department',
        accessLevel: 'State-wide Health Surveillance',
        migrantCount: migrantWorkersCount
      },
      employer: {
        id: '3',
        name: 'Ravi Nair',
        email: 'employer@example.com',
        role: 'employer',
        organization: 'ABC Construction Ltd',
        accessLevel: 'Employee Health Management',
        migrantCount: 15
      },
      migrant: {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'worker@example.com',
        role: 'migrant',
        accessLevel: 'Personal Health Records',
        migrantCount: 1
      }
    };

    const user = mockUsers[activeRole];
    if (user) {
      onLogin(user);
    }
    
    setIsLoading(false);
  };

  // Update email and password based on selected role
  const updateCredentialsForRole = (role: UserRole) => {
    if (!role) return;
    switch (role) {
      case 'government':
        setEmail('gov@example.com');
        setPassword('demo123');
        break;
      case 'employer':
        setEmail('employer@example.com');
        setPassword('demo123');
        break;
      case 'migrant':
        setEmail('worker@example.com');
        setPassword('demo123');
        break;
    }
  };

  // Update credentials when role changes
  useEffect(() => {
    updateCredentialsForRole(activeRole);
  }, [activeRole]);

  const currentConfig = activeRole ? roleConfig[activeRole] : roleConfig.government;
  const IconComponent = currentConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <IdCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">
              <T>Kerala Digital Health Records</T>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            <T>Secure Access Portal for Migrant Worker Health System</T>
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Badge className="kerala-dhs-badge">
              <Users className="w-3 h-3 mr-1" />
              {migrantWorkersCount} <T>Registered Workers</T>
            </Badge>
            <Badge className="kerala-dhs-badge">
              <Shield className="w-3 h-3 mr-1" />
              <T>Secure & Compliant</T>
            </Badge>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <Tabs value={activeRole || 'government'} onValueChange={(value) => setActiveRole(value as UserRole)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
            {Object.entries(roleConfig).map(([role, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger 
                  key={role} 
                  value={role}
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-white"
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <span className="text-xs font-medium text-center leading-tight">
                    <T>{config.title.split(' ')[0]}</T><br />
                    <T>{config.title.split(' ').slice(1).join(' ')}</T>
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Login Form */}
        <Card className={`kerala-dhs-card ${currentConfig.borderColor} border-2`}>
          <CardHeader className={`${currentConfig.bgColor} rounded-t-lg`}>
            <CardTitle className="flex items-center gap-3">
              <IconComponent className={`w-6 h-6 ${currentConfig.color}`} />
              <div>
                <div className={`${currentConfig.color} font-semibold text-lg`}>
                  <T>{currentConfig.title}</T>
                </div>
                <p className="text-sm text-muted-foreground font-normal">
                  <T>{currentConfig.description}</T>
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Access Level Info */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm"><T>Access Level:</T></span>
              </div>
              <Badge variant="secondary" className="kerala-dhs-badge">
                {activeRole === 'government' ? <T>State-wide Health Surveillance</T> :
                 activeRole === 'employer' ? <T>Employee Health Management</T> :
                 <T>Personal Health Records</T>}
              </Badge>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <T>Email Address</T>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeRole === 'government' ? 'government@kerala.gov.in' :
                              activeRole === 'employer' ? 'employer@example.com' :
                              'worker@example.com'}
                  className="kerala-dhs-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <T>Password</T>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="kerala-dhs-input"
                />
              </div>

              <Button 
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
                className="w-full kerala-dhs-button-primary h-12"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <T>Signing In...</T>
                  </div>
                ) : (
                  <T>Sign In</T>
                )}
              </Button>
            </div>



            {/* Data Statistics */}
            {activeRole !== 'migrant' && (
              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold text-primary">{migrantWorkersCount}</div>
                    <div className="text-xs text-muted-foreground"><T>Total Workers</T></div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-green-600">{migrantWorkersCount - 1}</div>
                    <div className="text-xs text-muted-foreground"><T>Active Today</T></div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-orange-600">2</div>
                    <div className="text-xs text-muted-foreground"><T>Health Alerts</T></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            <T>Powered by Kerala Health Services Department • Secure • GDPR Compliant</T>
          </p>
        </div>
      </div>
    </div>
  );
}