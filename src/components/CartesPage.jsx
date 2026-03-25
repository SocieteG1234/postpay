import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const PP = {
  blue: "#003087",
  blueMid: "#0055b3",
  yellow: "#FFD700",
  yellowDark: "#F5A800",
  bg: "#f0f2f5",
  white: "#ffffff",
  red: "#cc0000",
};

export default function CartesPage({ user }) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const actions = [
    {
      label: "Blocco temporaneo",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    },
    {
      label: "Gestisci i limiti",
      icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
    },
    {
      label: "Storico delle operazioni",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: PP.bg, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <Header showBackButton={true} title="Le mie carte" />

      <div style={{ padding: "96px 16px 40px", maxWidth: 480, margin: "0 auto" }}>

        {/* Carta */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            position: "relative", width: "100%", height: 200,
            background: `linear-gradient(135deg, ${PP.blue} 0%, ${PP.blueMid} 100%)`,
            borderRadius: 20, padding: 24, boxSizing: "border-box",
            boxShadow: "0 8px 32px rgba(0,48,135,0.3)"
          }}>

            {/* Badge ATTIVATA */}
            <div style={{
              position: "absolute", top: -12, left: 20,
              background: "#1a9e5c", color: PP.white,
              padding: "4px 12px", borderRadius: 20,
              fontSize: 11, fontWeight: 800,
              display: "flex", alignItems: "center", gap: 4
            }}>
              <svg viewBox="0 0 20 20" fill="white" style={{width:14,height:14}}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ATTIVATA
            </div>

            {/* Logo postepay */}
            <div style={{ background: PP.yellow, borderRadius: 5, padding: "2px 8px", display: "inline-block" }}>
              <span style={{ color: PP.blue, fontWeight: 900, fontSize: 12 }}>postepay</span>
            </div>

            {/* Chip */}
            <div style={{
              position: "absolute", top: 56, left: 24,
              width: 48, height: 38, background: PP.yellow, borderRadius: 6,
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, padding: 4
            }}>
              {Array(9).fill(0).map((_, i) => (
                <div key={i} style={{ background: PP.yellowDark, borderRadius: 2 }} />
              ))}
            </div>

            {/* Numero carta */}
            <div style={{
              position: "absolute", bottom: 52, left: 24, right: 24,
              fontSize: 18, fontWeight: 700, color: PP.white,
              fontFamily: "monospace", letterSpacing: 3
            }}>
              {showDetails ? (user?.numeroCarta || "**** **** **** 9401") : "**** **** **** 9401"}
            </div>

            {/* Nome e scadenza */}
            <div style={{
              position: "absolute", bottom: 20, left: 24, right: 24,
              display: "flex", justifyContent: "space-between", alignItems: "flex-end"
            }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Intestatario</div>
                <div style={{ color: PP.white, fontWeight: 700, fontSize: 13 }}>{user?.nome || "Nome Cognome"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Scade fine</div>
                <div style={{ color: PP.white, fontWeight: 700, fontSize: 13 }}>12/28</div>
              </div>
            </div>

            {/* Mastercard circles */}
            <div style={{ position: "absolute", bottom: 20, right: 24, display: "flex" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,60,60,0.85)" }} />
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,160,0,0.85)", marginLeft: -12 }} />
            </div>
          </div>

          {/* Bottone mostra/nascondi */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              width: "100%", marginTop: 12,
              background: PP.white, border: `1.5px solid #dde3f0`,
              borderRadius: 14, padding: "13px",
              color: PP.blue, fontWeight: 700, fontSize: 14,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 2px 8px rgba(0,48,135,0.06)"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
              {showDetails
                ? <><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></>
                : <><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
              }
            </svg>
            {showDetails ? "Nascondi i dettagli" : "Mostra i dettagli"}
          </button>
        </div>

        {/* Azioni */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {actions.map((action, i) => (
            <button key={i} style={{
              width: "100%", background: PP.white,
              border: `1.5px solid #dde3f0`, borderRadius: 14,
              padding: "15px 18px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,48,135,0.06)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, background: "#eef2fa", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2" style={{width:20,height:20}}>
                    {action.icon}
                  </svg>
                </div>
                <span style={{ color: PP.blue, fontWeight: 700, fontSize: 14 }}>{action.label}</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          ))}

          {/* Segnala smarrita */}
          <button style={{
            width: "100%", background: "#fff0f0",
            border: `1.5px solid #ffcccc`, borderRadius: 14,
            padding: "15px 18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={PP.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span style={{ color: PP.red, fontWeight: 800, fontSize: 14 }}>Segnala carta smarrita o rubata</span>
          </button>
        </div>

      </div>
    </div>
  );
}