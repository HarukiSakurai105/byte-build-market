import React, { useState } from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const hasClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith('pk_') && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: translate('error'),
        description: translate('pleaseEnterEmailAndPassword'),
        variant: 'destructive',
      });
      return;
    }
    
    // This is just a placeholder - will be replaced with actual authentication later
    toast({
      title: translate('success'),
      description: translate('loginSuccessful'),
    });
    
    // Redirect to home page
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  // Simple form when Clerk is not configured
  if (!hasClerkKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tech-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {translate('login')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                {translate('email')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={translate('emailPlaceholder')}
                  className="bg-gray-700 border-gray-600 text-gray-200 pl-10"
                />
                <Mail className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                {translate('password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={translate('passwordPlaceholder')}
                  className="bg-gray-700 border-gray-600 text-gray-200 pl-10 pr-10"
                />
                <Lock className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-tech-blue hover:bg-blue-700 text-white">
              {translate('login')}
            </Button>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-center text-gray-400 text-sm">
                {translate('noAccount')}{' '}
                <Link to="/signup" className="text-tech-blue hover:text-blue-400">
                  {translate('signUp')}
                </Link>
              </div>
              
              <Link to="/database-settings" className="flex items-center text-tech-blue hover:text-blue-400 text-sm">
                <Database className="h-4 w-4 mr-1" />
                {translate('serverSettings')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Use Clerk's SignIn component when configured
  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {translate('login')}
        </h2>
        <div className="flex justify-center">
          <ClerkSignIn 
            routing="path" 
            path="/login"
            signUpUrl="/signup"
            appearance={{
              elements: {
                formButtonPrimary: "bg-tech-blue hover:bg-blue-700 text-white",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-gray-700 hover:bg-gray-600",
                formFieldInput: "bg-gray-700 border-gray-600 text-gray-200",
                formFieldLabel: "text-gray-300",
                footerActionText: "text-gray-300",
                footerActionLink: "text-tech-blue hover:text-blue-400",
              }
            }}
          />
        </div>
        
        <div className="flex justify-center mt-4">
          <Link to="/database-settings" className="flex items-center text-tech-blue hover:text-blue-400 text-sm">
            <Database className="h-4 w-4 mr-1" />
            {translate('serverSettings')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
