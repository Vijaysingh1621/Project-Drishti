
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  BarChart3, 
  AlertTriangle, 
  MessageSquare, 
  Navigation, 
  Search, 
  Users,
  Shield,
  Activity,
  Settings
} from 'lucide-react';

const menuItems = [
  { title: "Overview", url: "/", icon: BarChart3 },
  { title: "Crowd Monitor", url: "/crowd", icon: Users },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "AI Summary", url: "/summary", icon: MessageSquare },
  { title: "Dispatch", url: "/dispatch", icon: Navigation },
  { title: "Lost & Found", url: "/lost-found", icon: Search },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-700" />
          <div>
            <h2 className="font-semibold text-lg tracking-tight">Project Drishti</h2>
            <p className="text-xs text-gray-400 mt-0.5">Command Center</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Activity className="h-4 w-4" />
                  <span>System Status</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-gray-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>System Online</span>
          </div>
          <div>Last sync: {new Date().toLocaleTimeString()}</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
