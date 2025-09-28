import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { 
  AlertTriangle, 
  Activity, 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp, 
  Hospital, 
  Phone,
  Calendar,
  BarChart3,
  PieChart,
  Timer,
  Target,
  AlertCircle,
  CheckCircle,
  Ambulance
} from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

export function EmergencyAnalytics() {
  const { translate } = useTranslation();

  // Mock emergency analytics data
  const emergencyStats = {
    totalEmergencies: 127,
    activeEmergencies: 3,
    resolvedToday: 8,
    averageResponseTime: 4.2,
    monthlyIncrease: 12.5
  };

  const recentEmergencies = [
    {
      id: 'EMG-2024-001',
      workerName: 'Rajesh Kumar',
      workerId: 'KL-MIG-2024-001234',
      type: 'Medical Emergency',
      location: 'Kochi Construction Site',
      timestamp: '2024-01-28 14:30',
      status: 'Resolved',
      responseTime: '3.2 min',
      severity: 'High'
    },
    {
      id: 'EMG-2024-002',
      workerName: 'Priya Sharma',
      workerId: 'KL-MIG-2024-001235',
      type: 'Workplace Accident',
      location: 'Textile Factory, Thiruvananthapuram',
      timestamp: '2024-01-28 11:15',
      status: 'Active',
      responseTime: '2.8 min',
      severity: 'Critical'
    },
    {
      id: 'EMG-2024-003',
      workerName: 'Mohammed Ali',
      workerId: 'KL-MIG-2024-001236',
      type: 'Health Alert',
      location: 'Spice Gardens, Idukki',
      timestamp: '2024-01-28 09:45',
      status: 'Resolved',
      responseTime: '5.1 min',
      severity: 'Medium'
    },
    {
      id: 'EMG-2024-004',
      workerName: 'Lakshmi Devi',
      workerId: 'KL-MIG-2024-001237',
      type: 'Mental Health Crisis',
      location: 'Fish Processing Unit, Kollam',
      timestamp: '2024-01-27 16:20',
      status: 'Resolved',
      responseTime: '6.3 min',
      severity: 'High'
    }
  ];

  const emergencyTypes = [
    { type: 'Medical Emergency', count: 45, percentage: 35.4, color: 'bg-red-500' },
    { type: 'Workplace Accident', count: 32, percentage: 25.2, color: 'bg-orange-500' },
    { type: 'Health Alert', count: 28, percentage: 22.0, color: 'bg-yellow-500' },
    { type: 'Mental Health Crisis', count: 15, percentage: 11.8, color: 'bg-purple-500' },
    { type: 'Other', count: 7, percentage: 5.5, color: 'bg-gray-500' }
  ];

  const locationStats = [
    { location: 'Kochi', count: 38, trend: '+15%' },
    { location: 'Thiruvananthapuram', count: 29, trend: '+8%' },
    { location: 'Kozhikode', count: 24, trend: '+5%' },
    { location: 'Kollam', count: 19, trend: '+12%' },
    { location: 'Idukki', count: 17, trend: '+3%' }
  ];

  const responseTimeMetrics = [
    { timeRange: '0-2 min', count: 23, percentage: 18.1 },
    { timeRange: '2-5 min', count: 67, percentage: 52.8 },
    { timeRange: '5-10 min', count: 31, percentage: 24.4 },
    { timeRange: '10+ min', count: 6, percentage: 4.7 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-700 bg-red-100';
      case 'Resolved': return 'text-green-700 bg-green-100';
      case 'Pending': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            <T>Emergency Analytics Dashboard</T>
          </h1>
          <p className="text-gray-600 mt-1">
            <T>Monitor and track emergency usage by migrant workers across Kerala</T>
          </p>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Total Emergencies</T></p>
                <p className="text-2xl font-semibold text-gray-900">{emergencyStats.totalEmergencies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Active Now</T></p>
                <p className="text-2xl font-semibold text-red-600">{emergencyStats.activeEmergencies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Resolved Today</T></p>
                <p className="text-2xl font-semibold text-green-600">{emergencyStats.resolvedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Timer className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Avg Response</T></p>
                <p className="text-2xl font-semibold text-purple-600">{emergencyStats.averageResponseTime}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Monthly Growth</T></p>
                <p className="text-2xl font-semibold text-orange-600">+{emergencyStats.monthlyIncrease}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent"><T>Recent Emergencies</T></TabsTrigger>
          <TabsTrigger value="analytics"><T>Analytics</T></TabsTrigger>
          <TabsTrigger value="locations"><T>Locations</T></TabsTrigger>
          <TabsTrigger value="response"><T>Response Times</T></TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <T>Recent Emergency Alerts</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEmergencies.map((emergency) => (
                  <Card key={emergency.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{emergency.workerName}</h4>
                          <p className="text-sm text-gray-600">{emergency.workerId}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(emergency.severity)}>
                            {emergency.severity}
                          </Badge>
                          <Badge className={getStatusColor(emergency.status)}>
                            {emergency.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-700"><T>Emergency Type</T></p>
                          <p className="text-gray-600">{emergency.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-700 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <T>Location</T>
                          </p>
                          <p className="text-gray-600">{emergency.location}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-700 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <T>Time</T>
                          </p>
                          <p className="text-gray-600">{emergency.timestamp}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-700 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            <T>Response Time</T>
                          </p>
                          <p className="text-gray-600">{emergency.responseTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <T>View Details</T>
                        </Button>
                        {emergency.status === 'Active' && (
                          <Button variant="destructive" size="sm">
                            <Phone className="w-3 h-3 mr-1" />
                            <T>Contact Responder</T>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="kerala-dhs-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <T>Emergency Types Distribution</T>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${type.color}`}></div>
                        <span className="text-sm font-medium">{type.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{type.count}</span>
                        <Badge variant="secondary">{type.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <T>Weekly Emergency Trends</T>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span><T>This Week</T></span>
                    <span className="font-semibold">32 emergencies</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Last Week</T></span>
                    <span className="text-gray-600">28 emergencies</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Peak Day</T></span>
                    <span className="text-red-600">Monday (8 emergencies)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><T>Peak Hour</T></span>
                    <span className="text-orange-600">2:00 PM - 3:00 PM</span>
                  </div>
                </div>
                
                <Alert className="mt-4 border-blue-200 bg-blue-50">
                  <Target className="w-4 h-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    <T>14.3% increase in emergencies compared to last week. Consider deploying additional resources during peak hours.</T>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <T>Emergency Distribution by Location</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationStats.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="font-medium">{location.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold">{location.count}</span>
                      <Badge className={location.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {location.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <Alert className="mt-4 border-orange-200 bg-orange-50">
                <Ambulance className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  <T>Kochi and Thiruvananthapuram show highest emergency volumes. Consider increasing ambulance coverage in these areas.</T>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-indigo-600" />
                <T>Response Time Analysis</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {responseTimeMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{metric.timeRange}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">{metric.count}</span>
                      <Badge variant="secondary">{metric.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2"><T>Performance Metrics</T></h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700"><T>Average Response:</T></span>
                    <span className="font-semibold ml-2">4.2 minutes</span>
                  </div>
                  <div>
                    <span className="text-green-700"><T>Target Response:</T></span>
                    <span className="font-semibold ml-2">5.0 minutes</span>
                  </div>
                  <div>
                    <span className="text-green-700"><T>Success Rate:</T></span>
                    <span className="font-semibold ml-2">94.3%</span>
                  </div>
                  <div>
                    <span className="text-green-700"><T>Improvement:</T></span>
                    <span className="font-semibold ml-2">-8% vs last month</span>
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