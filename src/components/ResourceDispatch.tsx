
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Truck, Users, Heart } from 'lucide-react';

const ResourceDispatch = () => {
  const [selectedIncident, setSelectedIncident] = useState(0);

  const activeIncidents = [
    {
      id: 1,
      type: 'Medical Emergency',
      location: 'Sector 5',
      priority: 'high',
      description: 'Person collapsed near food stalls',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      assignedTeam: 'Medical Team Alpha',
      eta: '3 mins',
      status: 'dispatched',
      icon: Heart
    },
    {
      id: 2,
      type: 'Crowd Control',
      location: 'Main Stage',
      priority: 'medium',
      description: 'Excessive crowding reported',
      coordinates: { lat: 40.7130, lng: -74.0058 },
      assignedTeam: 'Security Team Bravo',
      eta: '5 mins',
      status: 'en-route',
      icon: Users
    },
    {
      id: 3,
      type: 'Equipment Issue',
      location: 'West Gate',
      priority: 'low',
      description: 'Barrier maintenance required',
      coordinates: { lat: 40.7125, lng: -74.0065 },
      assignedTeam: 'Technical Team',
      eta: '12 mins',
      status: 'assigned',
      icon: Truck
    }
  ];

  const availableTeams = [
    { name: 'Medical Team Beta', type: 'medical', status: 'available', location: 'Base Station' },
    { name: 'Security Team Charlie', type: 'security', status: 'available', location: 'East Patrol' },
    { name: 'Fire Safety Team', type: 'fire', status: 'on-break', location: 'Station 2' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dispatched': return 'bg-blue-500 text-white';
      case 'en-route': return 'bg-orange-500 text-white';
      case 'assigned': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Resource Dispatch Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simulated Map View */}
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 p-4">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              {/* Incident Markers */}
              {activeIncidents.map((incident, index) => {
                const IconComponent = incident.icon;
                return (
                  <div
                    key={incident.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      index === 0 ? 'top-1/3 left-2/3' :
                      index === 1 ? 'top-1/2 left-1/2' :
                      'top-2/3 left-1/3'
                    }`}
                    onClick={() => setSelectedIncident(index)}
                  >
                    <div className={`p-3 rounded-full border-2 border-white shadow-lg ${
                      selectedIncident === index ? 'bg-blue-600' : 'bg-red-500'
                    }`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    {selectedIncident === index && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg border min-w-48">
                        <div className="font-medium">{incident.type}</div>
                        <div className="text-sm text-muted-foreground">{incident.location}</div>
                        <div className="text-xs mt-1">ETA: {incident.eta}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                  </marker>
                </defs>
                <path 
                  d="M 50 50 Q 150 100 200 120" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="5,5"
                  markerEnd="url(#arrowhead)"
                />
              </svg>

              <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                <div className="text-xs font-medium">Live Tracking</div>
                <div className="text-xs text-muted-foreground">Updated 2s ago</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Click on incident markers to view details. Routes shown are AI-optimized for fastest response time.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeIncidents.map((incident, index) => {
                const IconComponent = incident.icon;
                return (
                  <div 
                    key={incident.id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedIncident === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedIncident(index)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium text-sm">{incident.type}</span>
                      <Badge className={getPriorityColor(incident.priority)}>
                        {incident.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {incident.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {incident.eta}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle>Available Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableTeams.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="text-sm font-medium">{team.name}</div>
                    <div className="text-xs text-muted-foreground">{team.location}</div>
                  </div>
                  <Badge variant={team.status === 'available' ? 'default' : 'secondary'}>
                    {team.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceDispatch;
