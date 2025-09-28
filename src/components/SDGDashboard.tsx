import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Users, Heart, Shield, Globe } from 'lucide-react';

export function SDGDashboard() {
  // Mock SDG data for Kerala migrant workers
  const sdgProgress = [
    {
      goal: 'SDG 3: Good Health and Well-being',
      progress: 78,
      target: 85,
      indicators: ['Better Health Records', 'Disease Prevention', 'Reduced Disease Spread'],
      description: 'Better health records → reduced disease spread',
      color: '#4ade80'
    },
    {
      goal: 'SDG 10: Reduced Inequalities',
      progress: 65,
      target: 80,
      indicators: ['Equal Healthcare Access', 'Migrant Rights', 'Healthcare Equity'],
      description: 'Equal healthcare access for migrants',
      color: '#8b5cf6'
    },
    {
      goal: 'SDG 11: Sustainable Cities',
      progress: 72,
      target: 85,
      indicators: ['Healthy Communities', 'Urban Health', 'Community Wellness'],
      description: 'Healthier migrant communities = healthier cities',
      color: '#3b82f6'
    }
  ];

  const healthcareAccessData = [
    { district: 'Kochi', registered: 2840, served: 2156, percentage: 76 },
    { district: 'Thiruvananthapuram', registered: 1920, served: 1536, percentage: 80 },
    { district: 'Kozhikode', registered: 1560, served: 1092, percentage: 70 },
    { district: 'Thrissur', registered: 1340, served: 1072, percentage: 80 },
    { district: 'Kannur', registered: 980, served: 686, percentage: 70 }
  ];

  const healthOutcomes = [
    { month: 'Jan', screenings: 145, treatments: 89, emergencies: 12 },
    { month: 'Feb', screenings: 165, treatments: 98, emergencies: 8 },
    { month: 'Mar', screenings: 189, treatments: 124, emergencies: 15 },
    { month: 'Apr', screenings: 210, treatments: 142, emergencies: 9 },
    { month: 'May', screenings: 234, treatments: 156, emergencies: 11 },
    { month: 'Jun', screenings: 256, treatments: 178, emergencies: 7 }
  ];

  const diseaseDistribution = [
    { name: 'Respiratory Issues', value: 35, fill: '#ef4444' },
    { name: 'Gastrointestinal', value: 25, fill: '#f97316' },
    { name: 'Skin Conditions', value: 20, fill: '#eab308' },
    { name: 'Musculoskeletal', value: 15, fill: '#22c55e' },
    { name: 'Others', value: 5, fill: '#6b7280' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6 text-blue-600" />
        <h2>Sustainable Development Goals Dashboard</h2>
      </div>

      {/* SDG Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sdgProgress.map((sdg, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: sdg.color }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>{sdg.goal}</span>
                <Badge variant="outline">{sdg.progress}%</Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{sdg.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{sdg.progress}% / {sdg.target}%</span>
                </div>
                <Progress value={sdg.progress} className="h-2" />
              </div>
              <div className="flex flex-wrap gap-1">
                {sdg.indicators.map((indicator, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Registered</p>
                <p className="text-2xl font-medium">8,640</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Services</p>
                <p className="text-2xl font-medium">6,542</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  76% coverage
                </p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emergency Alerts</p>
                <p className="text-2xl font-medium">62</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  This month
                </p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NGO Partners</p>
                <p className="text-2xl font-medium">24</p>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Active partnerships
                </p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Healthcare Access by District */}
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Access by District</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthcareAccessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registered" fill="#94a3b8" name="Registered Workers" />
                <Bar dataKey="served" fill="#3b82f6" name="Received Services" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Outcomes Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Health Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthOutcomes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="screenings" stroke="#22c55e" name="Health Screenings" />
                  <Line type="monotone" dataKey="treatments" stroke="#3b82f6" name="Treatments" />
                  <Line type="monotone" dataKey="emergencies" stroke="#ef4444" name="Emergencies" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disease Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Common Health Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {diseaseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Impact on SDG Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Good Health & Well-being (SDG 3)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Digital health records for 8,640 workers</li>
                <li>• 34% reduction in disease transmission rates</li>
                <li>• Real-time health monitoring and alerts</li>
                <li>• Improved disease prevention and early detection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Reduced Inequalities (SDG 10)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Equal healthcare access across all districts</li>
                <li>• Multilingual support in 4 languages</li>
                <li>• Eliminated documentation barriers</li>
                <li>• 78% migrant worker healthcare coverage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sustainable Cities (SDG 11)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Healthier migrant communities in 14 cities</li>
                <li>• Reduced public health risks by 28%</li>
                <li>• Community health volunteer networks</li>
                <li>• Integrated urban health planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}