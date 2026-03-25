import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BlockedAccountModal from './BlockedAccountModal';

export default function BlockedAccountWrapper({ children }) {
  const { user } = useAuth();
  const [isModalClosed, setIsModalClosed] = useState(false);

  // ✅ FIX: se reouvre SEULEMENT si l'utilisateur devient bloqué
  // pas à chaque changement de route
  useEffect(() => {
    if (user?.isBlocked) {
      setIsModalClosed(false);
    }
  }, [user?.isBlocked]);

  const handleClose = () => {
    setIsModalClosed(true);
  };

  const handleUnlock = async () => {
    setIsModalClosed(true);
  };

  const shouldShowModal = user?.isBlocked && !isModalClosed;

  return (
    <>
      {children}
      {shouldShowModal && (
        <BlockedAccountModal
          user={user}
          onClose={handleClose}
          onUnlock={handleUnlock}
        />
      )}
    </>
  );
}