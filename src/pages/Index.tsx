
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const Index = () => {
  const navigate = useNavigate();

  // Imágenes para el carrusel
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Médicos profesionales",
      title: "Atención médica profesional"
    },
    {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      alt: "Consulta médica",
      title: "Consultas especializadas"
    },
    {
      src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      alt: "Tecnología médica",
      title: "Tecnología avanzada"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        {/* Carrusel de imágenes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mb-16"
        >
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-2xl font-bold p-6">{image.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <div className="inline-block mb-8 bg-primary/5 p-4 rounded-full">
            <img 
              src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
              alt="ESCOMed Logo" 
              className="w-28 h-28 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plataforma de servicios médicos para la comunidad IPN
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Facilitamos la gestión de servicios médicos para alumnos, docentes, investigadores y personal administrativo del IPN.
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
