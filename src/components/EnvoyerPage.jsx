import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

export default function EnvoyerPage({ user }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [destinatario, setDestinatario] = useState("");
  const [importo, setImporto] = useState("");
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (num) => {
    if (step === 1) {
      if (destinatario.length < 16) setDestinatario(prev => prev + num);
    } else if (step === 2) {
      if (importo.length < 8) setImporto(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    if (step === 1) setDestinatario(prev => prev.slice(0, -1));
    else if (step === 2) setImporto(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (step === 1 && destinatario.length > 0) setStep(2);
    else if (step === 2 && importo && parseFloat(importo) > 0) setStep(3);
  };

  const handleConfirm = () => {
    const importoInvio = parseFloat(importo);

    if (importoInvio > user.saldo) {
      alert("Saldo insufficiente");
      return;
    }

    const nuovoSaldo = user.saldo - importoInvio;
    updateUser({ saldo: nuovoSaldo });

    const nuovaTransazione = {
      data: new Date().toLocaleDateString('it-IT'),
      descrizione: `Invio a ${destinatario}`,
      addebito: importo,
      accredito: ''
    };

    const nuoveTransazioni = [nuovaTransazione, ...(user.transazioni || [])];
    updateUser({ transazioni: nuoveTransazioni });

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  const NumericKeyboard = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', '⌫']
    ];

    return (
      <div className="mt-6 px-2">
        <div className="grid grid-cols-3 gap-3">
          {keys.map((row, rowIndex) =>
            row.map((key, keyIndex) => {
              if (key === '') return <div key={`${rowIndex}-${keyIndex}`} className="h-16"></div>;
              return (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  onClick={() => key === '⌫' ? handleBackspace() : handleKeyPress(key)}
                  className="h-16 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-3xl text-white active:scale-95 transition-all duration-150"
                >
                  {key}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Invio effettuato!</h2>
          <p className="text-gray-400">{importo} {user?.simboloValuta || '€'} inviato a {destinatario}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        showBackButton={true}
        onBack={handleBack}
        title="Inviare denaro"
      />

      {/* Step 1: Destinatario */}
      {step === 1 && (
        <div className="px-6 py-8 pt-24">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Numero del destinatario</h2>

            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 text-center mb-6">
              <div className="text-3xl font-bold text-white tracking-wider">
                {destinatario || "_ _ _ _ _ _ _ _ _ _ _ _"}
              </div>
            </div>

            <NumericKeyboard />

            <button
              onClick={handleNext}
              disabled={!destinatario}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition"
            >
              Avanti
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Importo */}
      {step === 2 && (
        <div className="px-6 py-8 pt-24">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Importo da inviare</h2>
            <p className="text-gray-400 mb-6">Saldo disponibile: {user?.saldo || 0} {user?.simboloValuta || '€'}</p>

            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 text-center mb-6">
              <div className="text-5xl font-bold text-white mb-2">
                {importo || "0"} {user?.simboloValuta || '€'}
              </div>
            </div>

            <NumericKeyboard />

            <button
              onClick={handleNext}
              disabled={!importo || parseFloat(importo) <= 0}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition"
            >
              Avanti
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Conferma */}
      {step === 3 && (
        <div className="px-6 py-8 pt-24">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Conferma invio</h2>

            <div className="bg-gray-900 rounded-xl p-6 mb-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Destinatario</span>
                <span className="text-white font-semibold">{destinatario}</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex justify-between">
                <span className="text-gray-400">Importo</span>
                <span className="text-white font-semibold">{importo} {user?.simboloValuta || '€'}</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nuovo saldo</span>
                <span className="text-white font-semibold">
                  {(user.saldo - parseFloat(importo)).toFixed(2)} {user?.simboloValuta || '€'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
              >
                Conferma invio
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}