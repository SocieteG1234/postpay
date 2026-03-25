import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserService from './services/UserService';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TransactionsPage from './components/TransactionsPage';
import RechargePage from './components/RechargePage';
import RechargeCarte from './components/RechargeCarte';
import RechargeVirement from './components/RechargeVirement';
import EnvoyerPage from './components/EnvoyerPage';
import ProfilPage from './components/ProfilPage';
import CartesPage from './components/CartesPage';
import ContactPage from './components/ContactPage';
import BlockedAccountWrapper from './components/BlockedAccountWrapper';

// Componente di protezione delle route
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    console.log('🚀 Inizializzazione applicazione...');
    UserService.initializeUsers();
  }, []);

  const handleLogout = () => {
    logout();
    console.log('👋 Disconnessione effettuata');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Route di accesso */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Route home (pagina principale dopo l'accesso) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <HomePage user={user} onLogout={handleLogout} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          }
        />

        {/* Route RICARICA */}
        <Route
          path="/ricarica"
          element={
            <ProtectedRoute>
              <RechargePage user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ricarica/carta"
          element={
            <ProtectedRoute>
              <RechargeCarte user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ricarica/bonifico"
          element={
            <ProtectedRoute>
              <RechargeVirement user={user} />
            </ProtectedRoute>
          }
        />

        {/* Route TRANSAZIONI */}
        <Route
          path="/transazioni"
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <TransactionsPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          }
        />

        {/* Route INVIA */}
        <Route
          path="/invia"
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <EnvoyerPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          }
        />

        {/* Route PROFILO */}
        <Route
          path="/profilo"
          element={
            <ProtectedRoute>
              <ProfilPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Route CARTE */}
        <Route
          path="/carte"
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <CartesPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          }
        />

        {/* Route CONTATTO */}
        <Route
          path="/contatto"
          element={
            <ProtectedRoute>
              <ContactPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Route predefinita - reindirizza al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;