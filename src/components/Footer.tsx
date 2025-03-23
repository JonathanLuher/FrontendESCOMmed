
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="py-6 border-t border-gray-200 mt-auto"
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ESCOMed. Todos los derechos reservados.
            </p>
          </div>
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
