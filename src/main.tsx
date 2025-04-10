
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Get Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a valid key
const hasValidClerkKey = PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith('pk_') && PUBLISHABLE_KEY !== 'pk_test_placeholder';

if (!hasValidClerkKey) {
  console.warn("Missing valid Clerk Publishable Key. To enable authentication, please set the VITE_CLERK_PUBLISHABLE_KEY environment variable with a valid key from https://dashboard.clerk.com/. Authentication features will be limited until this is configured.");
}

// For development: if no valid key is provided, use a fake one that lets the app render
// but authentication won't work correctly
const developmentKey = 'pk_test_Y2xlcmsuY29tIGRldmVsb3BtZW50IGtleQ';

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={hasValidClerkKey ? PUBLISHABLE_KEY : developmentKey}>
    <App />
  </ClerkProvider>
);
