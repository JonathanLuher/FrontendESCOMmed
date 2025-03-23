
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <div className="inline-block mb-8 bg-primary/5 p-4 rounded-full">
            <span className="text-5xl font-bold text-primary">ESCOMed</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plataforma de servicios médicos para la comunidad IPN
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Facilitamos la gestión de servicios médicos para alumnos, docentes y personal administrativo del IPN.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="px-8"
            >
              Registrarse
            </Button>
            
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              size="lg"
              className="px-8"
            >
              Iniciar sesión
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 w-full max-w-4xl"
        >
          <h2 className="text-2xl font-semibold text-center mb-10">Nuestros servicios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Consultas médicas",
                description: "Agenda citas con médicos especialistas de manera rápida y sencilla."
              },
              {
                title: "Expedientes electrónicos",
                description: "Accede a tu historial médico desde cualquier lugar y en cualquier momento."
              },
              {
                title: "Comunicación directa",
                description: "Mantén contacto con tu médico para seguimiento de tratamientos."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
