
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Footer from '@/components/Footer';

const ProximasCitas = () => {
  const navigate = useNavigate();

  // Datos simulados de la próxima cita
  const cita = {
    doctor: 'Dr. Juan Pérez',
    cedula_profesional: '02123331',
    fecha: '2024-11-10',
    hora: '10:30 AM',
    notas: 'Seguimiento a infección en vías respiratorias'
  };

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
          <h1 className="text-3xl font-bold text-gray-800">Próximas Citas</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-orange-500" />
                Detalles de tu Próxima Cita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                A continuación se muestran los detalles de tu próxima cita en el servicio médico de la escuela:
              </p>
              
              <div className="bg-orange-50 p-4 rounded-lg mb-6 border border-orange-100">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium text-orange-700">
                    {cita.fecha} - {cita.hora}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-gray-700">
                    {cita.doctor} - Cédula: {cita.cedula_profesional}
                  </span>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">{cita.notas}</span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campo</TableHead>
                    <TableHead>Detalle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Doctor</TableCell>
                    <TableCell>{cita.doctor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cédula profesional</TableCell>
                    <TableCell>{cita.cedula_profesional}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fecha</TableCell>
                    <TableCell>{cita.fecha}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hora</TableCell>
                    <TableCell>{cita.hora}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Notas</TableCell>
                    <TableCell>{cita.notas}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

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

export default ProximasCitas;
