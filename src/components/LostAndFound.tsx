
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Search, User, Clock, MapPin, CheckCircle, Map } from 'lucide-react';

const LostAndFound = () => {
  const [uploadedImage, setUploadedImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [foundPerson, setFoundPerson] = useState<any>(null);
  const { toast } = useToast();

  const recentMatches = [
    {
      id: 1,
      type: 'Child',
      description: 'Boy, 8 years old, blue t-shirt',
      foundLocation: 'Family Zone',
      foundTime: '14:32',
      status: 'reunited',
      confidence: 95,
      matchImage: '/placeholder-child.jpg'
    },
    {
      id: 2,
      type: 'Adult',
      description: 'Woman, red dress, looking for family',
      foundLocation: 'Information Booth',
      foundTime: '14:15',
      status: 'waiting',
      confidence: 87,
      matchImage: '/placeholder-woman.jpg'
    },
    {
      id: 3,
      type: 'Adult',
      description: 'Vijay Singh, 35 years old, wearing black jacket',
      foundLocation: 'Main Gate Security',
      foundTime: new Date().toLocaleTimeString(),
      status: 'found',
      confidence: 98,
      matchImage: '/placeholder-man.jpg'
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(true);
      setIsProcessing(true);
      
      toast({
        title: "Processing Image",
        description: "Analyzing uploaded photo for matches...",
      });

      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        setFoundPerson({
          name: 'Vijay Singh',
          location: 'Main Gate Security',
          time: new Date().toLocaleTimeString(),
          confidence: 98,
          description: '35 years old, wearing black jacket',
          coordinates: { lat: 28.6139, lng: 77.2090 } // Delhi coordinates
        });
        
        toast({
          title: "Match Found!",
          description: "Vijay Singh located at Main Gate Security",
        });
      }, 5000);
    }
  };

  const handleViewOnMap = () => {
    if (foundPerson) {
      // Simulate opening map view
      toast({
        title: "Opening Map",
        description: `Showing location: ${foundPerson.location}`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reunited': return 'bg-green-500 text-white';
      case 'waiting': return 'bg-yellow-500 text-white';
      case 'found': return 'bg-blue-500 text-white';
      case 'claimed': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Photo Search & Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {!uploadedImage ? (
              <div>
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Photo</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a photo to search for missing persons or lost items
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="outline">Choose File</Button>
                </label>
              </div>
            ) : isProcessing ? (
              <div>
                <div className="animate-spin h-12 w-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                <h3 className="text-lg font-medium mb-2">Processing...</h3>
                <p className="text-muted-foreground">
                  Analyzing image using AI vision technology
                </p>
              </div>
            ) : foundPerson ? (
              <div>
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-green-700">Person Found!</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="font-medium text-green-800">{foundPerson.name}</div>
                  <div className="text-sm text-green-700 mt-1">
                    Location: {foundPerson.location}
                  </div>
                  <div className="text-sm text-green-700">
                    Found at: {foundPerson.time}
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Confidence: {foundPerson.confidence}% match
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {foundPerson.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setUploadedImage(false);
                      setFoundPerson(null);
                    }}
                  >
                    Upload Another
                  </Button>
                  <Button onClick={handleViewOnMap} className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Check on Map
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Search</label>
            <div className="flex gap-2">
              <Input
                placeholder="Search by name, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-1" />
              Missing Persons
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Lost Items
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recent Matches
            <Badge variant="secondary" className="ml-auto">
              Live Updates
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div key={match.id} className={`border rounded-lg p-4 ${
                match.id === 3 ? 'border-blue-500 bg-blue-50 animate-pulse' : ''
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{match.type}</span>
                    <Badge className={getStatusColor(match.status)}>
                      {match.status}
                    </Badge>
                    {match.id === 3 && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {match.confidence}% match
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mb-3">
                  {match.description}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {match.foundLocation}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {match.foundTime}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {match.id === 3 && (
                      <Button size="sm" onClick={handleViewOnMap} className="flex items-center gap-1">
                        <Map className="h-3 w-3" />
                        Map
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full">
              View All Matches
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LostAndFound;
