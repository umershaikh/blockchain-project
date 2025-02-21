import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/Navigation';
import { useEffect } from 'react';
import { animationCreate } from "./utils/utils";
import { AuthProvider } from './components/AuthContext';

function App() {

  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
