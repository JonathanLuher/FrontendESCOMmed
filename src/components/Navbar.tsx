
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, ClipboardList, LogIn, UserPlus, Info } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
              alt="ESCOMed Logo" 
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-primary">ESCOMed</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              icon={<Home size={18} />} 
              label="Inicio" 
              path="/" 
              isActive={isActive('/')} 
              onClick={() => navigate('/')} 
            />
            <NavLink 
              icon={<Calendar size={18} />} 
              label="Portal del Paciente" 
              path="/patient" 
              isActive={isActive('/patient')} 
              onClick={() => navigate('/patient')} 
            />
            <NavLink 
              icon={<Info size={18} />} 
              label="Acerca de" 
              path="/about" 
              isActive={isActive('/about')} 
              onClick={() => navigate('/about')} 
            />
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className={`flex items-center text-sm font-medium ${isActive('/login') ? 'text-primary' : 'text-gray-600 hover:text-primary'} transition-colors`}
            >
              <LogIn size={18} className="mr-1" />
              <span>Iniciar Sesión</span>
            </button>
            <button 
              onClick={() => navigate('/register')}
              className={`flex items-center text-sm font-medium ${isActive('/register') ? 'text-primary' : 'text-gray-600 hover:text-primary'} transition-colors`}
            >
              <UserPlus size={18} className="mr-1" />
              <span>Registrarse</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Helper component for navigation links
const NavLink = ({ 
  icon, 
  label, 
  path, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center text-sm font-medium ${
      isActive 
        ? 'text-primary border-b-2 border-primary' 
        : 'text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary'
    } transition-colors pb-1`}
  >
    <span className="mr-1">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Navbar;
