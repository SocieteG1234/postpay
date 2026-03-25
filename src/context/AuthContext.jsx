import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica la sessione al caricamento
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
          const validationResult = UserService.checkCurrentUserValidity();

          if (validationResult.valid) {
            console.log('✅ Sessione valida - Utente connesso:', validationResult.user.nome);
            setUser(validationResult.user);
          } else {
            console.log('❌ Sessione non valida - Disconnessione');
            localStorage.removeItem('currentUser');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('❌ Errore durante la verifica della sessione:', error);
        localStorage.removeItem('currentUser');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData) => {
    console.log('🔐 Accesso utente:', userData.nome);
    console.log('📊 Saldo:', userData.saldo, userData.simboloValuta);

    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    console.log('✅ Utente salvato nel contesto e localStorage');
  };

  const logout = () => {
    console.log('👋 Disconnessione di:', user?.nome || 'utente sconosciuto');
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    console.log('🔄 Aggiornamento utente:', updatedData);

    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('currentUser', JSON.stringify(newUserData));

    const users = JSON.parse(localStorage.getItem('bankUsers') || '[]');
    const userIndex = users.findIndex(u => u.codice === newUserData.codice);

    if (userIndex !== -1) {
      users[userIndex] = newUserData;
      localStorage.setItem('bankUsers', JSON.stringify(users));
      console.log('✅ Dati aggiornati in bankUsers');
    }
  };

  const refreshUser = () => {
    if (!user) return;

    const validationResult = UserService.checkCurrentUserValidity();

    if (validationResult.valid) {
      setUser(validationResult.user);
      localStorage.setItem('currentUser', JSON.stringify(validationResult.user));
      console.log('✅ Dati utente aggiornati');
    } else {
      logout();
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere utilizzato all\'interno di AuthProvider');
  }
  return context;
}

export default AuthContext;