
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';

const CrowdHeatmap = () => {
  const crowdData = [
    { zone: 'Main Stage', density: 'High', count: 500, risk: 'high' },
    { zone: 'Food Court', density: 'Medium', count: 200, risk: 'medium' },
    { zone: 'West Exit', density: 'Low', count: 80, risk: 'low' },
    { zone: 'East Entrance', density: 'Medium', count: 150, risk: 'medium' },
    { zone: 'VIP Section', density: 'Low', count: 45, risk: 'low' }
  ];

  const flowMetrics = [
    { location: 'East Exit', velocity: '2.5 m/s', direction: 'Outbound', status: 'normal' },
    { location: 'West Gate', velocity: '1.8 m/s', direction: 'Inbound', status: 'congested' },
    { location: 'Main Corridor', velocity: '3.2 m/s', direction: 'Bidirectional', status: 'normal' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/20 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/20 text-green-700 border-green-200';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5 text-blue-600" />
            Crowd Density Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crowdData.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-white/80">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    zone.risk === 'high' ? 'bg-red-500' : 
                    zone.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="font-medium">{zone.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getRiskColor(zone.risk)}>
                    {zone.count} people
                  </Badge>
                  <Badge variant="secondary">{zone.density}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Flow Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flowMetrics.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-white/80">
                <div>
                  <div className="font-medium">{flow.location}</div>
                  <div className="text-sm text-muted-foreground">{flow.direction}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{flow.velocity}</div>
                  <Badge variant={flow.status === 'normal' ? 'default' : 'destructive'}>
                    {flow.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrowdHeatmap;
