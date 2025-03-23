
import React from 'react';
import { motion } from 'framer-motion';
import AppSidebar from './AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-b from-blue-50 to-white">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white border-b border-gray-200 shadow-sm py-4"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
                alt="ESCOMed Logo" 
                className="h-12 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary flex items-center">ESCOMed</span>
            </div>
          </div>
        </motion.header>
      </SidebarInset>
    </>
  );
};

export default Navbar;
