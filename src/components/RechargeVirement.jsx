import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PP = {
  blue: "#003087",
  blueMid: "#0055b3",
  yellow: "#FFD700",
  yellowDark: "#F5A800",
  bg: "#f0f2f5",
  white: "#ffffff",
  red: "#cc0000",
};

function InfoRow({ etichetta, valore, campo, campoCopito, onCopy }) {
  const copiato = campoCopito === campo;
  return (
    <div style={{
      background: PP.bg, borderRadius: 12, padding: "12px 14px",
      display: "flex", alignItems: "center", gap: 10
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "#888", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 4px" }}>
          {etichetta}
        </p>
        <p style={{ color: PP.blue, fontWeight: 700, fontSize: 13, margin: 0, fontFamily: "monospace", wordBreak: "break-all" }}>
          {valore}
        </p>
      </div>
      <button
        onClick={() => onCopy(campo, valore)}
        style={{
          background: copiato ? "#e8f5e9" : PP.white,
          border: `1.5px solid ${copiato ? "#16a34a" : "#dde3f0"}`,
          borderRadius: 8, padding: "6px 10px",
          cursor: "pointer", flexShrink: 0,
          display: "flex", alignItems: "center", gap: 4,
          transition: "all 0.2s"
        }}
      >
        {copiato ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
              <path d="M5 13l4 4L19 7"/>
            </svg>
            <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 700 }}>Copiato</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <span style={{ color: PP.blue, fontSize: 11, fontWeight: 700 }}>Copia</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function RechargeVirement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campoCopito, setCampoCopito] = useState(null);

  const dettagliBancari = {
    beneficiario: "CARTA NERA SAS",
    iban: "IT60 X054 2811 1010 0000 0123 456",
    bic: "BPPIITRRXXX",
    banca: "BNL - Banca Nazionale del Lavoro",
    riferimento: user?.id ? `RICARICA-${user.id}` : "RICARICA-XXXXXX",
  };

  const handleCopy = (campo, valore) => {
    navigator.clipboard.writeText(valore).then(() => {
      setCampoCopito(campo);
      setTimeout(() => setCampoCopito(null), 2000);
    });
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: PP.bg,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      maxWidth: 480, margin: "0 auto"
    }}>

      {/* Header */}
      <div style={{ background: PP.blue, padding: "16px 20px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div style={{ background: PP.yellow, borderRadius: 6, padding: "3px 8px" }}>
            <span style={{ color: PP.blue, fontWeight: 900, fontSize: 13 }}>postepay</span>
          </div>
        </div>
        <h1 style={{ color: PP.white, fontSize: 20, fontWeight: 700, margin: 0 }}>Bonifico Bancario</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "2px 0 0" }}>Ricarica tramite bonifico</p>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>

        {/* Steps */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Come effettuare il bonifico</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Copia le coordinate bancarie qui sotto",
              "Effettua un bonifico dalla tua banca",
              "Inserisci il riferimento nella causale",
              "Accredito entro 1-3 giorni lavorativi",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: PP.blue,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ color: PP.yellow, fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                </div>
                <p style={{ color: "#444", fontSize: 13, margin: "3px 0 0" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinate bancarie */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Coordinate bancarie</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <InfoRow etichetta="Beneficiario" valore={dettagliBancari.beneficiario} campo="beneficiario" campoCopito={campoCopito} onCopy={handleCopy} />
            <InfoRow etichetta="IBAN" valore={dettagliBancari.iban} campo="iban" campoCopito={campoCopito} onCopy={handleCopy} />
            <InfoRow etichetta="BIC / SWIFT" valore={dettagliBancari.bic} campo="bic" campoCopito={campoCopito} onCopy={handleCopy} />
            <InfoRow etichetta="Banca" valore={dettagliBancari.banca} campo="banca" campoCopito={campoCopito} onCopy={handleCopy} />
          </div>

          {/* Riferimento obbligatorio */}
          <div style={{
            background: "#fffbe6", border: `2px solid ${PP.yellow}`,
            borderRadius: 12, padding: "12px 14px", marginTop: 12
          }}>
            <p style={{ color: PP.yellowDark, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>
              ⚠️ Riferimento obbligatorio (causale)
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <p style={{ color: PP.blue, fontWeight: 800, fontSize: 14, margin: 0, fontFamily: "monospace" }}>
                {dettagliBancari.riferimento}
              </p>
              <button
                onClick={() => handleCopy("riferimento", dettagliBancari.riferimento)}
                style={{
                  background: campoCopito === "riferimento" ? "#e8f5e9" : PP.yellowDark,
                  border: "none", borderRadius: 8, padding: "6px 12px",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                  transition: "all 0.2s", flexShrink: 0
                }}
              >
                {campoCopito === "riferimento" ? (
                  <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 700 }}>✓ Copiato</span>
                ) : (
                  <span style={{ color: PP.white, fontSize: 11, fontWeight: 700 }}>Copia</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Avvisi */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <div style={{ background: "#eef4ff", border: "1px solid #c5d8ff", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16 }}>ℹ️</span>
            <div>
              <p style={{ color: PP.blue, fontSize: 12, fontWeight: 700, margin: "0 0 3px" }}>Tempi di elaborazione</p>
              <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Il conto viene accreditato entro 1-3 giorni lavorativi dalla ricezione del bonifico.</p>
            </div>
          </div>
          <div style={{ background: "#fff5f5", border: "1px solid #ffcccc", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <div>
              <p style={{ color: PP.red, fontSize: 12, fontWeight: 700, margin: "0 0 3px" }}>Importante</p>
              <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Senza il riferimento corretto, il bonifico non potrà essere identificato e l'elaborazione sarà ritardata.</p>
            </div>
          </div>
        </div>

        {/* Bottone torna */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%", background: PP.blue, color: PP.white,
            border: "none", borderRadius: 14, padding: "15px",
            fontSize: 14, fontWeight: 700, cursor: "pointer"
          }}
        >
          Torna alla dashboard
        </button>
      </div>
    </div>
  );
}