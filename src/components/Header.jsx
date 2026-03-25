import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({
  showBackButton = false,
  onBack = null,
  showPowerButton = false,
  onPower = null,
  title = null
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-black py-3 md:py-4 px-4 md:px-6 flex items-center justify-between border-b border-gray-800 z-50">
      {/* Sinistra - Pulsante indietro OPPURE Toggle */}
      <div className="flex items-center gap-2 md:gap-3">
        {showBackButton ? (
          <button onClick={handleBack} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <>
            <button className="w-10 h-6 md:w-12 md:h-7 bg-white rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 md:w-5 md:h-5 bg-black rounded-full"></div>
            </button>
            <button className="hidden sm:block">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Centro - Logo OPPURE Titolo */}
      <div className="flex-1 flex justify-center">
        {title ? (
          <h1 className="text-xl font-bold text-white">{title}</h1>
        ) : (
          // ✅ Spazio riservato per il logo - da aggiungere tu stesso
          <div className="h-10 w-32 flex items-center justify-center">
            {/* Inserisci qui il tuo logo: <img src="/images/logo.png" alt="Logo" className="h-10 w-auto object-contain" /> */}
            <span className="text-white font-bold text-xl tracking-widest">LOGO</span>
          </div>
        )}
      </div>

      {/* Destra - Pulsante spegnimento OPPURE spazio vuoto */}
      <div className="w-6 md:w-7">
        {showPowerButton && onPower && (
          <button onClick={onPower} className="text-white">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}