import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FormData {
  firstName: string;
  lastName: string;
  maternalLastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  studentId?: string;
  userType: string;
}

const USER_TYPES = [
  { value: 'student', label: 'Alumno' },
  { value: 'doctor', label: 'Médico' },
  { value: 'teacher', label: 'Docente' },
  { value: 'researcher', label: 'Investigador' },
  { value: 'admin', label: 'Personal Administrativo' }
];

const EMAIL_DOMAINS: Record<string, string> = {
  student: '@alumno.ipn.mx',
  teacher: '@ipn.mx',
  doctor: '@ipn.mx',
  researcher: '@ipn.mx',
  admin: '@ipn.mx'
};

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const validateEmail = (email: string, userType: string): boolean => {
    if (!userType || !email) return true; // Skip validation if either is not provided
    
    const requiredDomain = EMAIL_DOMAINS[userType];
    return email.endsWith(requiredDomain);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'studentId') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: numericValue });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(value === formData.confirmPassword || formData.confirmPassword === '');
      } else {
        setPasswordMatch(value === formData.password);
      }
    }
    
    if (name === 'email') {
      setEmailValid(validateEmail(value, formData.userType));
    }
  };
  
  const handleUserTypeChange = (value: string) => {
    setFormData(prev => {
      const newData = { 
        ...prev, 
        userType: value,
        studentId: value === 'student' ? prev.studentId : undefined 
      };
      
      if (prev.email) {
        setEmailValid(validateEmail(prev.email, value));
      }
      
      return newData;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (!emailValid) {
      toast.error(`El correo debe terminar con ${EMAIL_DOMAINS[formData.userType]}`);
      return;
    }
    
    if (formData.userType === 'student' && !formData.studentId) {
      toast.error('La boleta es requerida para alumnos');
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      toast.success('Registro exitoso');
      
      setFormData({
        firstName: '',
        lastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      toast.error('Error en el registro. Inténtalo de nuevo.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
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
                  <img 
                    src="/lovable-uploads/e93f8fb4-8580-46dd-b24c-cd759934e92f.png" 
                    alt="ESCOMed Logo" 
                    className="w-28 h-28 object-contain"
                  />
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
              <CardDescription>
                Ingresa tus datos para registrarte
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  variants={staggerChildrenVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="userType">Tipo de usuario</Label>
                    <Select
                      value={formData.userType}
                      onValueChange={handleUserTypeChange}
                      required
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Selecciona tu rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="firstName">Nombre(s)</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="lastName">Apellido paterno</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="maternalLastName">Apellido materno</Label>
                    <Input
                      id="maternalLastName"
                      name="maternalLastName"
                      value={formData.maternalLastName}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </motion.div>
                  
                  <AnimatePresence>
                    {formData.userType === 'student' && (
                      <motion.div
                        variants={fadeInUpVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                      >
                        <Label htmlFor="studentId">Boleta</Label>
                        <Input
                          id="studentId"
                          name="studentId"
                          value={formData.studentId || ''}
                          onChange={handleChange}
                          className="mt-1"
                          required={formData.userType === 'student'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 ${!emailValid ? 'border-red-500 focus:ring-red-500' : ''}`}
                      required
                    />
                    {!emailValid && formData.userType && (
                      <p className="text-sm text-red-500 mt-1">
                        El correo debe terminar con {EMAIL_DOMAINS[formData.userType]}
                      </p>
                    )}
                    {formData.userType && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Formato requerido: usuario{EMAIL_DOMAINS[formData.userType]}
                      </p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUpVariants}>
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 ${!passwordMatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                      required
                    />
                    {!passwordMatch && (
                      <p className="text-sm text-red-500 mt-1">
                        Las contraseñas no coinciden
                      </p>
                    )}
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading || !emailValid || !passwordMatch}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : "Registrarse"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" className="text-primary hover:underline transition-all">
                  Iniciar sesión
                </a>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
