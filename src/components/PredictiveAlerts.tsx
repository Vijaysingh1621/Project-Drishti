
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Flame, Users, Zap } from 'lucide-react';

const PredictiveAlerts = () => {
  const bottleneckPredictions = [
    {
      location: 'West Zone',
      timeToBottleneck: '18 mins',
      severity: 'high',
      expectedCrowd: 750,
      timestamp: '14:42'
    },
    {
      location: 'Main Exit',
      timeToBottleneck: '35 mins',
      severity: 'medium',
      expectedCrowd: 400,
      timestamp: '14:45'
    }
  ];

  const anomalyAlerts = [
    {
      type: 'Fire/Smoke',
      location: 'Sector 3',
      severity: 'critical',
      timestamp: '14:38',
      icon: Flame,
      description: 'Smoke detected by vision AI'
    },
    {
      type: 'Crowd Surge',
      location: 'Main Stage',
      severity: 'high',
      timestamp: '14:40',
      icon: Users,
      description: 'Unusual crowd movement pattern'
    },
    {
      type: 'Equipment Failure',
      location: 'Sound Booth',
      severity: 'medium',
      timestamp: '14:35',
      icon: Zap,
      description: 'Power anomaly detected'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Bottleneck Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottleneckPredictions.map((prediction, index) => (
              <div key={index} className="p-4 rounded-lg border border-orange-200 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-orange-800">{prediction.location}</h3>
                  <Badge className={getSeverityColor(prediction.severity)}>
                    {prediction.severity}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Time to bottleneck:</span>
                    <div className="font-bold text-orange-700">{prediction.timeToBottleneck}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected crowd:</span>
                    <div className="font-bold">{prediction.expectedCrowd} people</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Predicted at {prediction.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Anomaly Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {anomalyAlerts.map((alert, index) => {
              const IconComponent = alert.icon;
              return (
                <div key={index} className="p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-red-800">{alert.type}</h3>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">{alert.location}</div>
                    <div className="text-muted-foreground mb-2">{alert.description}</div>
                    <div className="text-xs text-muted-foreground">
                      Detected at {alert.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAlerts;
