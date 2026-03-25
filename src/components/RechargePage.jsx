import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import BlockedAccountModal from "./BlockedAccountModal";

export default function RechargePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const opzioniRicarica = [
    {
      id: 'postepay',
      titolo: 'RICARICA POSTEPAY',
      icona: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      route: '/ricarica/postepay'
    },
    {
      id: 'carta',
      titolo: 'CARTA BANCARIA',
      icona: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      route: '/ricarica/carta'
    },
    {
      id: 'bonifico',
      titolo: 'BONIFICO BANCARIO',
      icona: (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">€</span>
        </div>
      ),
      route: '/ricarica/bonifico'
    }
  ];

  const handleOptionClick = (route) => {
    if (user?.isBlocked) {
      setShowModal(true);
    } else {
      navigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header
        showBackButton={true}
        title="Ricaricare"
      />

      {/* Banner rosso */}
      <div className="bg-red-600 py-8 text-center mt-16">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold text-red-600">€</span>
        </div>
        <h1 className="text-2xl font-bold tracking-wide">RICARICA LA TUA CARTA NERA</h1>
      </div>

      {/* Opzioni di ricarica */}
      <div className="flex-1 px-6 py-8 space-y-5">
        {opzioniRicarica.map((opzione) => (
          <button
            key={opzione.id}
            onClick={() => handleOptionClick(opzione.route)}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all active:scale-95"
          >
            {opzione.icona}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">TRAMITE</div>
              <div className="text-lg font-bold tracking-wide">{opzione.titolo}</div>
            </div>
          </button>
        ))}
      </div>

      {showModal && (
        <BlockedAccountModal
          user={user}
          onClose={() => setShowModal(false)}
          onUnlock={() => setShowModal(false)}
        />
      )}
    </div>
  );
}