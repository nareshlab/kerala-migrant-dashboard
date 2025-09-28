import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, Brain, Heart, Wind, Activity } from 'lucide-react';

interface RiskPredictionDashboardProps {
  userId: string;
}

export function RiskPredictionDashboard({ userId }: RiskPredictionDashboardProps) {
  // Mock AI prediction data
  const predictions = [
    {
      condition: 'Respiratory Issues',
      risk: 75,
      icon: Wind,
      factors: ['Air Quality', 'Work Environment', 'Smoking History'],
      recommendations: ['Use protective mask', 'Regular check-ups', 'Avoid dusty areas']
    },
    {
      condition: 'Cardiovascular Disease',
      risk: 45,
      icon: Heart,
      factors: ['Blood Pressure', 'Family History', 'Diet'],
      recommendations: ['Regular exercise', 'Healthy diet', 'Stress management']
    },
    {
      condition: 'Heat Stroke',
      risk: 85,
      icon: Activity,
      factors: ['Temperature', 'Hydration', 'Work Hours'],
      recommendations: ['Frequent water breaks', 'Avoid midday work', 'Seek shade']
    }
  ];

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-600 bg-red-100';
    if (risk >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return 'High Risk';
    if (risk >= 40) return 'Moderate Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2>AI Health Risk Predictions</h2>
      </div>

      {predictions.some(p => p.risk >= 70) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-700">
            High risk conditions detected. Please consult a healthcare provider immediately.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {predictions.map((prediction) => {
          const Icon = prediction.icon;
          return (
            <Card key={prediction.condition}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    {prediction.condition}
                  </CardTitle>
                  <Badge className={getRiskColor(prediction.risk)}>
                    {getRiskLevel(prediction.risk)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Risk Score</span>
                    <span>{prediction.risk}%</span>
                  </div>
                  <Progress value={prediction.risk} className="h-2" />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Risk Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Recommendations:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">AI Model Information</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Predictions are based on environmental data, work conditions, medical history, 
            and similar demographic patterns. Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}