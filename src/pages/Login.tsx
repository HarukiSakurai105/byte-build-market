
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const { translate } = useLanguage();

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
      </div>
    </div>
  );
};

export default Login;
