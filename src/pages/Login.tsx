import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const checkEmailResponse = await fetch(`http://144.126.132.105:8080/paciente/email/${encodeURIComponent(email)}`);

      if (!checkEmailResponse.ok) {
        if (checkEmailResponse.status === 404) {
          toast.error('Credenciales incorrectas, intente de nuevo');
        } else {
          throw new Error(`HTTP error! status: ${checkEmailResponse.status}`);
        }
        return;
      }

      const paciente = await checkEmailResponse.json();

      if (paciente && paciente.id.toString() === password) {
        toast.success('¡Login exitoso!');
      } else {
        toast.error('Credenciales incorrectas, intente de nuevo');
      }


      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error al hacer la petición:', error);
      toast.error('Error al conectarse con la API. Intente de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <div className="flex flex-col items-center justify-center p-4 min-h-[80vh]">
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
          >
            <Card className="glass-card overflow-hidden">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="w-28 h-28 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-primary">ESCOMed</span>
                    </div>
                  </motion.div>
                </div>
                <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1"
                          required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña (ID del paciente)</Label>
                        <a
                            href="/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                      <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1"
                          required
                      />
                    </div>
                  </div>

                  <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                  >
                    {loading ? (
                        <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </span>
                    ) : "Iniciar sesión"}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                  ¿No tienes una cuenta?{' '}
                  <a href="/register" className="text-primary hover:underline transition-all">
                    Registrarse
                  </a>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </>
  );
};

export default Login;