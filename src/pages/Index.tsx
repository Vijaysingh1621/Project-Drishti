
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CrowdHeatmap from '@/components/CrowdHeatmap';
import PredictiveAlerts from '@/components/PredictiveAlerts';
import SituationalSummary from '@/components/SituationalSummary';
import ResourceDispatch from '@/components/ResourceDispatch';
import LostAndFound from '@/components/LostAndFound';
import MetricsChart from '@/components/MetricsChart';
import LiveMetrics from '@/components/LiveMetrics';
import { 
  BarChart3, 
  AlertTriangle, 
  MessageSquare, 
  Navigation, 
  Search, 
  Users 
} from 'lucide-react';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-white/80 backdrop-blur flex items-center px-6 gap-4 shadow-sm">
            <SidebarTrigger />
            <div className="flex-1">
              <DashboardHeader />
            </div>
          </header>
          <main className="flex-1 p-8">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 gap-2">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="crowd" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Crowd</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Summary</span>
                </TabsTrigger>
                <TabsTrigger value="dispatch" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  <span className="hidden sm:inline">Dispatch</span>
                </TabsTrigger>
                <TabsTrigger value="lost-found" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Lost & Found</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <LiveMetrics />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MetricsChart />
                  <CrowdHeatmap />
                </div>
              </TabsContent>

              <TabsContent value="crowd" className="space-y-6">
                <CrowdHeatmap />
                <MetricsChart />
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <PredictiveAlerts />
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <SituationalSummary />
              </TabsContent>

              <TabsContent value="dispatch" className="space-y-6">
                <ResourceDispatch />
              </TabsContent>

              <TabsContent value="lost-found" className="space-y-6">
                <LostAndFound />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
