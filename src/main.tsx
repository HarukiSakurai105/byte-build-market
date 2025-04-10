
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

// Create our app without ClerkProvider when no valid key exists
if (!hasValidClerkKey) {
  createRoot(document.getElementById("root")!).render(<App />);
} else {
  // Only use ClerkProvider when we have a valid key
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  );
}
