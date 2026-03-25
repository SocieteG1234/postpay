import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PP = {
  blue: "#003087",
  blueMid: "#0055b3",
  yellow: "#FFD700",
  yellowDark: "#F5A800",
  bg: "#f0f2f5",
  white: "#ffffff",
  red: "#cc0000",
};

export default function ContactPage({ user }) {
  const navigate = useNavigate();
  const [oggetto, setOggetto] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!oggetto || !messaggio) {
      alert("Compilare tutti i campi");
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  if (success) {
    return (
      <div style={{
        minHeight: "100vh", background: PP.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
      }}>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <div style={{
            width: 80, height: 80, background: "#1a9e5c", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 4px 16px rgba(26,158,92,0.3)"
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:40,height:40}}>
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: PP.blue, margin: "0 0 8px" }}>Messaggio inviato!</h2>
          <p style={{ color: "#888", fontSize: 14 }}>Il nostro team Le risponderà al più presto</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${PP.blue} 0%, ${PP.blue} 30%, ${PP.bg} 30%)`,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    }}>

      {/* Header */}
      <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div style={{ background: PP.yellow, borderRadius: 6, padding: "3px 10px" }}>
            <span style={{ color: PP.blue, fontWeight: 900, fontSize: 15 }}>postepay</span>
          </div>
        </div>
        <h1 style={{ color: PP.white, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Contattaci</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 24px" }}>
          Il nostro team è disponibile 24/7
        </p>
      </div>

      <div style={{ padding: "0 16px 40px", maxWidth: 480, margin: "0 auto" }}>

        {/* Canali di contatto */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Hai bisogno di aiuto?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                label: "Telefono", value: "+39 02 1234 5678"
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                label: "Email", value: "supporto@postepay.it"
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />,
                label: "Chat in diretta", value: "Disponibile 24/7"
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: PP.bg, borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 14
              }}>
                <div style={{
                  width: 44, height: 44, background: PP.blue, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={PP.yellow} strokeWidth="2" style={{width:20,height:20}}>
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <div style={{ color: "#888", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
                  <div style={{ color: PP.blue, fontWeight: 700, fontSize: 14 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Invia un messaggio</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ color: "#888", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                Oggetto
              </label>
              <select
                value={oggetto}
                onChange={(e) => setOggetto(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px",
                  background: PP.bg, border: `1.5px solid #dde3f0`,
                  borderRadius: 12, color: PP.blue, fontWeight: 600,
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                }}
              >
                <option value="">Selezionare un oggetto</option>
                <option value="conto">Problema con il conto</option>
                <option value="transazione">Domanda su una transazione</option>
                <option value="carta">Problema con la carta</option>
                <option value="tecnico">Problema tecnico</option>
                <option value="altro">Altro</option>
              </select>
            </div>

            <div>
              <label style={{ color: "#888", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                Messaggio
              </label>
              <textarea
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                rows={5}
                placeholder="Descriva il suo problema o la sua domanda..."
                style={{
                  width: "100%", padding: "12px 14px",
                  background: PP.bg, border: `1.5px solid #dde3f0`,
                  borderRadius: 12, color: PP.blue, fontWeight: 600,
                  fontSize: 14, outline: "none", resize: "none",
                  boxSizing: "border-box",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%", background: PP.blue, color: PP.white,
                border: "none", borderRadius: 14, padding: "15px",
                fontSize: 15, fontWeight: 800, cursor: "pointer",
                letterSpacing: 0.5
              }}
            >
              Invia messaggio →
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Domande frequenti</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Come ricaricare il mio conto?",
              "Quali sono le commissioni di transazione?",
              "Come mettere in sicurezza il mio conto?",
            ].map((q, i) => (
              <button key={i} style={{
                width: "100%", background: PP.bg, border: `1.5px solid #dde3f0`,
                borderRadius: 12, padding: "13px 16px", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ color: PP.blue, fontWeight: 600, fontSize: 13 }}>{q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16,flexShrink:0}}>
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}