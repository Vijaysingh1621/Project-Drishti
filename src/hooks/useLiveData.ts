
import { useState, useEffect } from 'react';

interface LiveMetrics {
  totalCrowd: number;
  averageSentiment: number;
  totalIncidents: number;
  responseEfficiency: number;
  activeAlerts: number;
  currentTime: string;
}

export const useLiveData = () => {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    totalCrowd: 820,
    averageSentiment: 6.8,
    totalIncidents: 7,
    responseEfficiency: 94,
    activeAlerts: 3,
    currentTime: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalCrowd: prev.totalCrowd + Math.floor(Math.random() * 20 - 10), // ±10 people
        averageSentiment: Math.max(1, Math.min(10, prev.averageSentiment + (Math.random() - 0.5) * 0.2)),
        totalIncidents: prev.totalIncidents + (Math.random() > 0.95 ? 1 : 0), // Occasional incident
        responseEfficiency: Math.max(70, Math.min(99, prev.responseEfficiency + (Math.random() - 0.5) * 2)),
        activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
        currentTime: new Date().toLocaleTimeString()
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
};
