import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  Activity, 
  Calendar, 
  TrendingUp,
  Shield,
  Heart,
  Stethoscope,
  Clock
} from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

export function EmployerDashboard() {
  const { translate } = useTranslation();

  // Mock employer data - health-related info only, no personal details
  const employees = [
    {
      id: 'EMP-001',
      workerId: 'KL-MIG-2024-001234',
      department: translate('Construction'),
      healthStatus: 'Good',
      lastCheckup: '2024-12-01',
      vaccinations: 'Up to date',
      riskLevel: 'Low',
      workDays: 25,
      sickleaveDays: 2,
      pendingCheckups: false
    },
    {
      id: 'EMP-002', 
      workerId: 'KL-MIG-2024-001235',
      department: translate('Textile'),
      healthStatus: 'Attention Needed',
      lastCheckup: '2024-10-15',
      vaccinations: 'Up to date',
      riskLevel: 'Medium',
      workDays: 22,
      sickleaveDays: 5,
      pendingCheckups: true
    },
    {
      id: 'EMP-003',
      workerId: 'KL-MIG-2024-001236', 
      department: translate('Agricultural'),
      healthStatus: 'Good',
      lastCheckup: '2024-11-20',
      vaccinations: 'Up to date',
      riskLevel: 'Low',
      workDays: 26,
      sickleaveDays: 1,
      pendingCheckups: false
    },
    {
      id: 'EMP-004',
      workerId: 'KL-MIG-2024-001237',
      department: translate('Food Processing'),
      healthStatus: 'Good',
      lastCheckup: '2024-11-28',
      vaccinations: 'Due Soon',
      riskLevel: 'Low',
      workDays: 24,
      sickleaveDays: 3,
      pendingCheckups: false
    }
  ];

  const healthStats = {
    totalEmployees: employees.length,
    healthyEmployees: employees.filter(emp => emp.healthStatus === 'Good').length,
    attentionNeeded: employees.filter(emp => emp.healthStatus === 'Attention Needed').length,
    overallHealthScore: 85,
    vaccinationCompliance: 95,
    checkupCompliance: 75
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-700';
      case 'Attention Needed': return 'bg-orange-100 text-orange-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-6 h-6 text-blue-600" />
        <h2><T>Employer Health Dashboard</T></h2>
        <Badge variant="outline"><T>Health Monitoring Only</T></Badge>
      </div>

      <Alert>
        <Shield className="w-4 h-4" />
        <AlertDescription>
          <T>This dashboard shows only health-related information to ensure employee privacy. Personal details are not accessible to employers.</T>
        </AlertDescription>
      </Alert>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground"><T>Total Employees</T></p>
                <p className="text-2xl font-medium">{healthStats.totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground"><T>Healthy Employees</T></p>
                <p className="text-2xl font-medium text-green-600">{healthStats.healthyEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground"><T>Need Attention</T></p>
                <p className="text-2xl font-medium text-orange-600">{healthStats.attentionNeeded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground"><T>Health Score</T></p>
                <p className="text-2xl font-medium text-purple-600">{healthStats.overallHealthScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview"><T>Health Overview</T></TabsTrigger>
          <TabsTrigger value="employees"><T>Employee Health</T></TabsTrigger>
          <TabsTrigger value="compliance"><T>Compliance</T></TabsTrigger>
          <TabsTrigger value="analytics"><T>Analytics</T></TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  <T>Health Status Distribution</T>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm"><T>Healthy Employees</T></span>
                    <span className="text-sm font-medium">{healthStats.healthyEmployees}/{healthStats.totalEmployees}</span>
                  </div>
                  <Progress value={(healthStats.healthyEmployees / healthStats.totalEmployees) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm"><T>Vaccination Compliance</T></span>
                    <span className="text-sm font-medium">{healthStats.vaccinationCompliance}%</span>
                  </div>
                  <Progress value={healthStats.vaccinationCompliance} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm"><T>Checkup Compliance</T></span>
                    <span className="text-sm font-medium">{healthStats.checkupCompliance}%</span>
                  </div>
                  <Progress value={healthStats.checkupCompliance} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <T>Department Health Summary</T>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Construction', 'Textile', 'Agricultural', 'Food Processing'].map((dept) => {
                  const deptEmployees = employees.filter(emp => emp.department === translate(dept));
                  const healthyCount = deptEmployees.filter(emp => emp.healthStatus === 'Good').length;
                  const percentage = deptEmployees.length > 0 ? (healthyCount / deptEmployees.length) * 100 : 0;
                  
                  return (
                    <div key={dept} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium"><T>{dept}</T></span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{healthyCount}/{deptEmployees.length}</span>
                        <Badge variant={percentage >= 80 ? "default" : "secondary"}>
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium"><T>Worker ID:</T> {employee.workerId}</span>
                        <Badge variant="outline">{employee.department}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground"><T>Health Status</T></p>
                          <Badge className={getHealthStatusColor(employee.healthStatus)}>
                            <T>{employee.healthStatus}</T>
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground"><T>Risk Level</T></p>
                          <Badge className={getRiskLevelColor(employee.riskLevel)}>
                            <T>{employee.riskLevel}</T>
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground"><T>Work Days</T></p>
                          <p className="font-medium">{employee.workDays}/30</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground"><T>Sick Leave</T></p>
                          <p className="font-medium">{employee.sickleaveDays} days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span><T>Last Checkup:</T> {new Date(employee.lastCheckup).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span><T>Vaccinations:</T> <T>{employee.vaccinations}</T></span>
                        </div>
                      </div>
                    </div>
                    
                    {employee.pendingCheckups && (
                      <div className="text-right">
                        <Badge variant="destructive">
                          <Clock className="w-3 h-3 mr-1" />
                          <T>Checkup Due</T>
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle><T>Vaccination Compliance</T></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-medium text-green-600">{healthStats.vaccinationCompliance}%</div>
                  <p className="text-sm text-muted-foreground"><T>of employees are up to date</T></p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span><T>Up to date</T></span>
                    <span>{employees.filter(emp => emp.vaccinations === 'Up to date').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Due soon</T></span>
                    <span>{employees.filter(emp => emp.vaccinations === 'Due Soon').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Overdue</T></span>
                    <span>{employees.filter(emp => emp.vaccinations === 'Overdue').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><T>Health Checkup Compliance</T></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-medium text-blue-600">{healthStats.checkupCompliance}%</div>
                  <p className="text-sm text-muted-foreground"><T>completion rate</T></p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span><T>Completed</T></span>
                    <span>{employees.filter(emp => !emp.pendingCheckups).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Pending</T></span>
                    <span>{employees.filter(emp => emp.pendingCheckups).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle><T>Health Analytics Summary</T></CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-medium text-green-600">2.1</div>
                  <p className="text-sm text-muted-foreground"><T>Average sick days per employee</T></p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-medium text-blue-600">24.3</div>
                  <p className="text-sm text-muted-foreground"><T>Average work days per employee</T></p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-medium text-purple-600">91%</div>
                  <p className="text-sm text-muted-foreground"><T>Health program participation</T></p>
                </div>
              </div>
              
              <Alert>
                <TrendingUp className="w-4 h-4" />
                <AlertDescription>
                  <T>Employee health metrics have improved by 15% compared to last quarter. Consider continuing current health initiatives.</T>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}