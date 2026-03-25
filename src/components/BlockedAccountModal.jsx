import React, { useState } from "react";

const PP = {
  blue: "#003087",
  blueMid: "#0055b3",
  yellow: "#FFD700",
  yellowDark: "#F5A800",
  bg: "#f0f2f5",
  white: "#ffffff",
  red: "#cc0000",
};

export default function BlockedAccountModal({ user, onClose, onUnlock }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = async () => {
    setIsProcessing(true);
    try {
      await onUnlock();
    } catch (error) {
      console.error("Errore durante lo sblocco:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user || !user.isBlocked) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, zIndex: 9999,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    }}>
      <div style={{
        background: PP.white,
        borderRadius: 20,
        maxWidth: 360,
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,48,135,0.25)",
        overflow: "hidden"
      }}>

        {/* Header bleu */}
        <div style={{
          background: PP.blue,
          padding: "18px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              background: PP.yellow,
              borderRadius: 6, padding: "3px 8px"
            }}>
              <span style={{ color: PP.blue, fontWeight: 900, fontSize: 13 }}>postepay</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.15)",
            border: "none", borderRadius: "50%",
            width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: PP.white, fontSize: 16
          }}>✕</button>
        </div>

        {/* Icona blocco */}
        <div style={{ textAlign: "center", padding: "24px 20px 12px" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#fff0f0",
            border: `3px solid ${PP.red}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: 28
          }}>🔒</div>
          <h2 style={{ color: PP.blue, fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>
            Conto bloccato
          </h2>
          <p style={{ color: "#666", fontSize: 13, margin: 0 }}>
            Gentile <strong style={{ color: PP.blue }}>{user.nome}</strong>, il suo conto è attualmente bloccato.
          </p>
        </div>

        <div style={{ padding: "0 20px 20px" }}>

          {/* Motivo */}
          {user.motivoBlocco && (
            <div style={{
              background: "#fff5f5",
              border: `1px solid #ffcccc`,
              borderRadius: 12, padding: "12px 14px",
              marginBottom: 12
            }}>
              <p style={{ color: PP.red, fontSize: 11, fontWeight: 700, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8 }}>
                Motivo del blocco
              </p>
              <p style={{ color: "#444", fontSize: 13, margin: 0 }}>{user.motivoBlocco}</p>
            </div>
          )}

          {/* Spese sblocco */}
          <div style={{
            background: PP.blue,
            borderRadius: 12, padding: "14px 16px",
            marginBottom: 16,
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Spese di sblocco</span>
            <span style={{ color: PP.yellow, fontSize: 22, fontWeight: 900 }}>
              {user.speseSblocco?.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"}€
            </span>
          </div>

          {/* Bottone */}
          <button
            onClick={handleUnlock}
            disabled={isProcessing}
            style={{
              width: "100%",
              background: isProcessing ? "#aaa" : PP.blue,
              color: PP.white,
              border: "none", borderRadius: 12,
              padding: "14px", fontSize: 14,
              fontWeight: 700, cursor: isProcessing ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s"
            }}
          >
            {isProcessing ? (
              <>
                <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                  <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                Elaborazione...
              </>
            ) : "Ho capito"}
          </button>

          <p style={{ color: "#aaa", fontSize: 11, textAlign: "center", margin: "10px 0 0" }}>
            Una volta sbloccato, potrà accedere a tutte le funzionalità.
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}