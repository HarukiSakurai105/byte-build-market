
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { translate } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempted', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {translate('login')}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="email" 
            placeholder={translate('emailPlaceholder')} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <Input 
            type="password" 
            placeholder={translate('passwordPlaceholder')} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <Button type="submit" className="w-full">
            {translate('login')}
          </Button>
        </form>
        <div className="text-center text-gray-400">
          {translate('noAccount')}{' '}
          <Link to="/signup" className="text-tech-blue hover:underline">
            {translate('signUp')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
