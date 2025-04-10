
import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const { translate } = useLanguage();
  const hasClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith('pk_') && 
                       import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';

  // Display a placeholder signup UI when Clerk is not configured
  if (!hasClerkKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tech-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {translate('signup')}
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-gray-300 text-center">
                {translate('authConfigRequired')}
              </p>
              <p className="text-sm text-gray-400 text-center">
                Set the VITE_CLERK_PUBLISHABLE_KEY environment variable with a valid key from the Clerk dashboard.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button disabled className="bg-tech-blue hover:bg-blue-700 text-white">
                {translate('signup')}
              </Button>
              <div className="text-center text-gray-400 text-sm">
                {translate('alreadyHaveAccount')}?{' '}
                <Link to="/login" className="text-tech-blue hover:text-blue-400">
                  {translate('login')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
