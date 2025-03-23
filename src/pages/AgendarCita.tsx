
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const AgendarCita = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [nombre, setNombre] = useState('');
  const [notas, setNotas] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre || !date || !time) {
      toast.error('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Aquí iría el código para guardar la cita
    toast.success('Cita agendada correctamente');
    
    // Redireccionar a la vista de paciente
    setTimeout(() => {
      navigate('/patient');
    }, 1500);
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
          <h1 className="text-3xl font-bold text-gray-800">Agendar Cita</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Nueva Cita Médica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Paciente</Label>
                  <Input 
                    id="nombre" 
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={es}
                        disabled={(date) => {
                          // Deshabilitar fechas pasadas y fines de semana
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const day = date.getDay();
                          return date < now || day === 0 || day === 6;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input 
                    id="hora" 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    min="09:00" 
                    max="18:00" 
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Horario de atención: 9:00 AM - 6:00 PM
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notas">Notas o Síntomas</Label>
                  <Input 
                    id="notas" 
                    placeholder="Describa brevemente el motivo de su consulta"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">Agendar Cita</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AgendarCita;
