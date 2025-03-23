
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="py-8 border-t border-gray-200 mt-auto bg-gradient-to-r from-primary/5 to-blue-50"
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ESCOMed</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tu salud, nuestra prioridad. Sistema Web Médico para la comunidad del IPN.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Acerca de nosotros
                </a>
              </li>
              <li>
                <a href="/login" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a href="/register" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Consultas médicas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Expedientes electrónicos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Seguimiento de tratamientos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Programas de prevención
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Av. Juan de Dios Bátiz S/N, Nueva Industrial Vallejo, 07738 Ciudad de México, CDMX
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-gray-600">
                  (55) 5729-6000
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-gray-600">
                  contacto@escomed.ipn.mx
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} ESCOMed. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
