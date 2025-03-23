
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, Calendar, Stethoscope, PillIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Footer from '@/components/Footer';

const HistorialClinico = () => {
  const navigate = useNavigate();

  // Datos simulados del historial clínico
  const historial = [
    {
      fecha: '2023-10-15',
      consulta: 'Consulta general',
      diagnostico: 'Infección leve en vías respiratorias',
      tratamiento: 'Antibióticos y descanso',
    },
    {
      fecha: '2023-08-30',
      consulta: 'Chequeo anual',
      diagnostico: 'Salud general adecuada',
      tratamiento: 'Ninguno',
    },
    {
      fecha: '2023-05-10',
      consulta: 'Consulta dermatológica',
      diagnostico: 'Dermatitis leve',
      tratamiento: 'Crema tópica',
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center"
        >
          <Link to="/patient" className="flex items-center text-primary hover:underline mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Volver
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Historial Clínico</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-green-500" />
                Historial Médico Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                A continuación se muestra el historial clínico detallado del paciente:
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Fecha</TableHead>
                    <TableHead>Consulta</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Tratamiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historial.map((registro, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{registro.fecha}</TableCell>
                      <TableCell>{registro.consulta}</TableCell>
                      <TableCell>{registro.diagnostico}</TableCell>
                      <TableCell>{registro.tratamiento}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Stethoscope className="mr-2 h-5 w-5 text-green-500" />
                  Resumen de Salud
                </h3>
                <p className="text-gray-600">
                  El paciente ha tenido un historial de salud generalmente bueno, con algunas 
                  afecciones menores tratadas adecuadamente. Se recomienda seguir con los chequeos 
                  anuales programados.
                </p>
                
                <h3 className="text-lg font-semibold flex items-center">
                  <PillIcon className="mr-2 h-5 w-5 text-green-500" />
                  Medicamentos Actuales
                </h3>
                <p className="text-gray-600">
                  No hay medicamentos prescritos actualmente.
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/patient')}
                >
                  Volver
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default HistorialClinico;
