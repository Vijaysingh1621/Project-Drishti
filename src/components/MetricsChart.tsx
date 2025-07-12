
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { useLiveData } from '@/hooks/useLiveData';

const MetricsChart = () => {
  const liveMetrics = useLiveData();
  const [hourlyData, setHourlyData] = useState([
    { time: '10:00', crowd: 150, sentiment: 8.5, incidents: 0 },
    { time: '11:00', crowd: 250, sentiment: 8.2, incidents: 1 },
    { time: '12:00', crowd: 400, sentiment: 7.8, incidents: 0 },
    { time: '13:00', crowd: 580, sentiment: 7.5, incidents: 2 },
    { time: '14:00', crowd: 750, sentiment: 7.2, incidents: 1 },
    { time: '15:00', crowd: 820, sentiment: 6.8, incidents: 3 }
  ]);

  // Update the last data point with live data
  useEffect(() => {
    setHourlyData(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        crowd: liveMetrics.totalCrowd,
        sentiment: liveMetrics.averageSentiment
      };
      return updated;
    });
  }, [liveMetrics]);

  const getBarHeight = (value: number, max: number) => {
    return (value / max) * 100;
  };

  const maxCrowd = Math.max(...hourlyData.map(d => d.crowd));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Crowd Density Over Time
              <Badge variant="outline" className="ml-auto">
                Live Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-4">
              {hourlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col justify-end h-40 w-full">
                    <div 
                      className={`rounded-t-md transition-all duration-300 hover:opacity-80 ${
                        index === hourlyData.length - 1 
                          ? 'bg-gradient-to-t from-blue-500 to-purple-500 animate-pulse' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      style={{ height: `${getBarHeight(data.crowd, maxCrowd)}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-center">
                    <div className="font-medium">{data.time}</div>
                    <div className="text-muted-foreground">{data.crowd}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Real-time crowd density tracking across all zones • Last updated: {liveMetrics.currentTime}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Activity className="h-5 w-5 text-purple-600" />
            Live Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Crowd</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{liveMetrics.totalCrowd}</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Sentiment</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{liveMetrics.averageSentiment.toFixed(1)}/10</span>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Incidents</span>
              <Badge variant="outline" className="font-bold">
                {liveMetrics.totalIncidents}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response Efficiency</span>
              <div className="flex items-center gap-2 overflow-hidden break-words">
                <span className="font-bold text-lg">{Number(liveMetrics.responseEfficiency).toFixed(2)}%</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Sentiment Analysis</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Positive</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Neutral</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: '35%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Negative</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsChart;
