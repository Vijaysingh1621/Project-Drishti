
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, Shield, AlertTriangle } from 'lucide-react';
import { useLiveData } from '@/hooks/useLiveData';

const DashboardHeader = () => {
  const metrics = useLiveData();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemStatus = {
    overall: 'operational',
    totalPersonnel: 24,
    responseTime: '2.3 min'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Project Drishti</h1>
          <p className="text-sm text-gray-500 mt-1">Situational Awareness & Command Center</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                systemStatus.overall === 'operational' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="font-medium">System Status:</span>
              <Badge variant={systemStatus.overall === 'operational' ? 'default' : 'destructive'}>
                {systemStatus.overall}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>{metrics.activeAlerts} Active Alerts</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>{systemStatus.totalPersonnel} Personnel</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Avg Response:</span>
              <Badge variant="outline">{systemStatus.responseTime}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
        <span className="font-medium">Live Time:</span>
        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{currentTime.toLocaleString()}</span>
        <span className="hidden sm:inline">|</span>
        <span className="font-medium">Event:</span>
        <span className="text-gray-700">Summer Music Festival 2024</span>
        <span className="hidden sm:inline">|</span>
        <span className="font-medium">Attendance:</span>
        <span className="text-blue-600 font-semibold">{metrics.totalCrowd.toLocaleString()}</span>
        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </div>
    </div>
  );
};

export default DashboardHeader;
