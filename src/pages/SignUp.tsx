
import React, { useState } from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignUpPage = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const hasClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith('pk_') && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password) {
      toast({
        title: translate('error'),
        description: translate('pleaseEnterAllFields'),
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: translate('error'),
        description: translate('passwordsDoNotMatch'),
        variant: 'destructive',
      });
      return;
    }
    
    // This is just a placeholder - will be replaced with actual signup logic later
    toast({
      title: translate('success'),
      description: translate('signupSuccessful'),
    });
    
    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  // Simple form when Clerk is not configured
  if (!hasClerkKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tech-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {translate('signup')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                {translate('name')}
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={translate('namePlaceholder')}
                  className="bg-gray-700 border-gray-600 text-gray-200 pl-10"
                />
                <User className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
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
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                {translate('confirmPassword')}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={translate('confirmPasswordPlaceholder')}
                  className="bg-gray-700 border-gray-600 text-gray-200 pl-10 pr-10"
                />
                <Lock className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-tech-blue hover:bg-blue-700 text-white">
              {translate('signup')}
            </Button>
            
            <div className="text-center text-gray-400 text-sm">
              {translate('alreadyHaveAccount')}?{' '}
              <Link to="/login" className="text-tech-blue hover:text-blue-400">
                {translate('login')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Use Clerk's SignUp component when configured
  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {translate('signup')}
        </h2>
        <div className="flex justify-center">
          <ClerkSignUp 
            routing="path" 
            path="/signup"
            signInUrl="/login"
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
      </div>
    </div>
  );
};

export default SignUpPage;
