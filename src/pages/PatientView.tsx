
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ClipboardList, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const PatientView = () => {
  // Definimos las tarjetas con su información
  const patientCards = [
    {
      title: "Agendar Cita",
      description: "Agenda una cita médica de manera sencilla.",
      icon: <Calendar className="h-12 w-12 text-primary" />,
      path: "/agendar-cita",
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Próximas Citas",
      description: "Consulta tus citas médicas próximas.",
      icon: <Clock className="h-12 w-12 text-orange-500" />,
      path: "/proximas-citas",
      color: "from-orange-50 to-orange-100"
    },
    {
      title: "Historial Clínico",
      description: "Consulta tu historial clínico completo.",
      icon: <ClipboardList className="h-12 w-12 text-green-500" />,
      path: "/historial-clinico",
      color: "from-green-50 to-green-100"
    }
  ];

  // Variantes para las animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido a tu Portal de Paciente</h1>
          <p className="text-gray-600 mt-2">Accede a tus servicios médicos personalizados</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {patientCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Link to={card.path} className="block h-full">
                <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${card.color} border-2 hover:border-primary`}>
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="rounded-full bg-white p-4 mb-4 shadow-md">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Información importante</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Recuerda que puedes agendar consultas con hasta 2 semanas de anticipación.</li>
            <li>Para cancelar una cita, debes hacerlo con al menos 24 horas de anticipación.</li>
            <li>Tu historial clínico se actualiza después de cada consulta.</li>
            <li>Para emergencias, comunícate directamente al número de emergencias de ESCOM.</li>
          </ul>
        </motion.div>
      </div>
      
      <Footer />
    </>
  );
};

export default PatientView;
