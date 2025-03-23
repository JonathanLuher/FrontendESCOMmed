
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Home, Calendar, ClipboardList, LogIn, UserPlus, Settings, Info } from "lucide-react";
import { motion } from 'framer-motion';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const getIsActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar-wrapper">
      <Sidebar
        collapsible="icon"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant="inset"
      >
        <SidebarHeader>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-2"
          >
            <img 
              src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
              alt="ESCOMed Logo" 
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-primary">ESCOMed</span>
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={getIsActive('/')} 
                    onClick={() => navigate('/')}
                    tooltip="Inicio"
                  >
                    <Home />
                    <span>Inicio</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={getIsActive('/patient')} 
                    onClick={() => navigate('/patient')}
                    tooltip="Portal del Paciente"
                  >
                    <Calendar />
                    <span>Portal del Paciente</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={getIsActive('/about')} 
                    onClick={() => navigate('/about')}
                    tooltip="Acerca de"
                  >
                    <Info />
                    <span>Acerca de</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Usuario</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={getIsActive('/login')} 
                    onClick={() => navigate('/login')}
                    tooltip="Iniciar Sesión"
                  >
                    <LogIn />
                    <span>Iniciar Sesión</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={getIsActive('/register')} 
                    onClick={() => navigate('/register')}
                    tooltip="Registrarse"
                  >
                    <UserPlus />
                    <span>Registrarse</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-2 text-sm text-muted-foreground">
            <p className="text-center">ESCOMed © {new Date().getFullYear()}</p>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <style jsx>{`
        .sidebar-wrapper {
          position: relative;
          z-index: 50;
        }
      `}</style>
    </div>
  );
};

export default AppSidebar;
