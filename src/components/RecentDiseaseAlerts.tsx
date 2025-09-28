import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';
import { 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  MapPin, 
  Calendar,
  Bug,
  Users,
  Globe
} from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

interface DiseaseAlert {
  state: string;
  diseaseName: string;
  casesReported: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  lastUpdated: string;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  affectedDistricts: string[];
  riskToMigrants: 'Low' | 'Medium' | 'High' | 'Critical';
}

export function RecentDiseaseAlerts() {
  const { translate } = useTranslation();

  // Mock recent disease alerts data
  const recentDiseaseAlerts: DiseaseAlert[] = [
    {
      state: 'Tamil Nadu',
      diseaseName: 'Dengue Fever',
      casesReported: 156,
      severity: 'High',
      lastUpdated: '2024-01-28',
      trend: 'Increasing',
      affectedDistricts: ['Chennai', 'Coimbatore', 'Madurai'],
      riskToMigrants: 'High'
    },
    {
      state: 'Karnataka',
      diseaseName: 'H1N1 Influenza',
      casesReported: 89,
      severity: 'Medium',
      lastUpdated: '2024-01-27',
      trend: 'Stable',
      affectedDistricts: ['Bangalore', 'Mysore'],
      riskToMigrants: 'Medium'
    },
    {
      state: 'Uttar Pradesh',
      diseaseName: 'Japanese Encephalitis',
      casesReported: 45,
      severity: 'High',
      lastUpdated: '2024-01-25',
      trend: 'Increasing',
      affectedDistricts: ['Lucknow', 'Kanpur', 'Agra'],
      riskToMigrants: 'Critical'
    },
    {
      state: 'West Bengal',
      diseaseName: 'Kala-azar',
      casesReported: 32,
      severity: 'Medium',
      lastUpdated: '2024-01-24',
      trend: 'Stable',
      affectedDistricts: ['Kolkata', 'Malda'],
      riskToMigrants: 'Medium'
    },
    {
      state: 'Bihar',
      diseaseName: 'Acute Encephalitis Syndrome',
      casesReported: 28,
      severity: 'High',
      lastUpdated: '2024-01-23',
      trend: 'Increasing',
      affectedDistricts: ['Patna', 'Muzaffarpur'],
      riskToMigrants: 'High'
    },
    {
      state: 'Delhi',
      diseaseName: 'Dengue Fever',
      casesReported: 67,
      severity: 'Medium',
      lastUpdated: '2024-01-28',
      trend: 'Decreasing',
      affectedDistricts: ['New Delhi', 'South Delhi'],
      riskToMigrants: 'Medium'
    },
    {
      state: 'Rajasthan',
      diseaseName: 'Scrub Typhus',
      casesReported: 19,
      severity: 'Medium',
      lastUpdated: '2024-01-22',
      trend: 'Stable',
      affectedDistricts: ['Jaipur', 'Jodhpur'],
      riskToMigrants: 'Low'
    },
    {
      state: 'Andhra Pradesh',
      diseaseName: 'Chikungunya',
      casesReported: 73,
      severity: 'Medium',
      lastUpdated: '2024-01-26',
      trend: 'Decreasing',
      affectedDistricts: ['Visakhapatnam', 'Vijayawada'],
      riskToMigrants: 'Medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'Decreasing': return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
      case 'Stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  // Get critical and high severity alerts for summary
  const criticalAlerts = recentDiseaseAlerts.filter(alert => alert.severity === 'Critical').length;
  const highSeverityAlerts = recentDiseaseAlerts.filter(alert => alert.severity === 'High').length;
  const increasingTrends = recentDiseaseAlerts.filter(alert => alert.trend === 'Increasing').length;
  const highRiskToMigrants = recentDiseaseAlerts.filter(alert => alert.riskToMigrants === 'High' || alert.riskToMigrants === 'Critical').length;

  return (
    <div className="space-y-6">
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="w-4 h-4 text-orange-600" />
        <AlertDescription className="text-orange-700">
          <T>Recent Disease Alerts: Monitoring interstate disease outbreaks to assess risks for migrant worker populations entering Kerala.</T>
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Critical Alerts</T></p>
                <p className="text-2xl font-semibold text-red-600">{criticalAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bug className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>High Severity</T></p>
                <p className="text-2xl font-semibold text-orange-600">{highSeverityAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>Increasing Trends</T></p>
                <p className="text-2xl font-semibold text-yellow-600">{increasingTrends}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kerala-dhs-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600"><T>High Risk to Migrants</T></p>
                <p className="text-2xl font-semibold text-purple-600">{highRiskToMigrants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Disease Alerts Table */}
      <Card className="kerala-dhs-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-red-600" />
            <T>Recently Spreading Diseases by State</T>
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            <T>Real-time monitoring of disease outbreaks in migrant origin states for risk assessment</T>
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentDiseaseAlerts.map((alert, index) => (
                <Card key={index} className="kerala-dhs-card border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* State Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-800">{alert.state}</span>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>

                      {/* Disease Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bug className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-gray-900">{alert.diseaseName}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600"><T>Cases:</T></span>
                          <span className="font-semibold text-red-600">{alert.casesReported}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600"><T>Trend:</T></span>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(alert.trend)}
                            <span className="text-sm">{alert.trend}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600"><T>Risk Level:</T></span>
                          <Badge className={getRiskColor(alert.riskToMigrants)}>
                            {alert.riskToMigrants}
                          </Badge>
                        </div>
                      </div>

                      {/* Affected Areas */}
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-gray-600"><T>Affected Areas:</T></span>
                        <div className="flex flex-wrap gap-1">
                          {alert.affectedDistricts.slice(0, 2).map((district, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {district}
                            </Badge>
                          ))}
                          {alert.affectedDistricts.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{alert.affectedDistricts.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Last Updated */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
                        <Calendar className="w-3 h-3" />
                        <span><T>Updated:</T> {new Date(alert.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}