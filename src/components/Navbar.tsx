
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
                alt="ESCOMed Logo" 
                className="h-12 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary">ESCOMed</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <div className={`${navigationMenuTriggerStyle()} ${isActive('/') ? 'bg-accent' : ''}`}>
                        Inicio
                      </div>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                              href="#"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Servicios Médicos
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Explora todos los servicios médicos disponibles para la comunidad IPN.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">Consultas</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Agenda una consulta con nuestros médicos.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">Especialidades</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Conoce las especialidades disponibles.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about">
                      <div className={`${navigationMenuTriggerStyle()} ${isActive('/about') ? 'bg-accent' : ''}`}>
                        Acerca de
                      </div>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md ${isActive('/') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleMenu}
              >
                Inicio
              </Link>
              
              <div className="relative">
                <button 
                  className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Servicios</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 pt-2 space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
                    Consultas
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
                    Especialidades
                  </a>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md ${isActive('/about') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleMenu}
              >
                Acerca de
              </Link>
              
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Button variant="outline" asChild className="w-full justify-center">
                    <Link to="/login" onClick={toggleMenu}>Iniciar Sesión</Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link to="/register" onClick={toggleMenu}>Registrarse</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </header>
  );
};

export default Navbar;
