import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

export default function EnvoyerPage({ user }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [destinatario, setDestinatario] = useState("");
  const [datiDestinatario, setDatiDestinatario] = useState({
    codiceFiscale: "",
    numeroCarta: "",
    causale: ""
  });
  const [importo, setImporto] = useState("");
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (num) => {
    if (step === 1) {
      if (destinatario.length < 16) setDestinatario(prev => prev + num);
    } else if (step === 3) {
      if (importo.length < 8) setImporto(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    if (step === 1) setDestinatario(prev => prev.slice(0, -1));
    else if (step === 3) setImporto(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (step === 1 && destinatario.length > 0) setStep(2);
    else if (step === 2 && datiDestinatario.codiceFiscale && datiDestinatario.numeroCarta) setStep(3);
    else if (step === 3 && importo && parseFloat(importo) > 0) setStep(4);
  };

  const handleConfirm = () => {
    const importoInvio = parseFloat(importo);
    if (importoInvio > user.saldo) { alert("Saldo insufficiente"); return; }
    const nuovoSaldo = user.saldo - importoInvio;
    updateUser({ saldo: nuovoSaldo });
    const nuovaTransazione = {
      data: new Date().toLocaleDateString('it-IT'),
      descrizione: `Invio a ${destinatario}`,
      addebito: importo,
      accredito: ''
    };
    updateUser({ transazioni: [nuovaTransazione, ...(user.transazioni || [])] });
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  const NumericKeyboard = () => {
    const keys = [["1","2","3"],["4","5","6"],["7","8","9"],["","0","⌫"]];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
        {keys.map((row, ri) =>
          row.map((key, ki) => {
            if (key === "") return <div key={`${ri}-${ki}`} />;
            return (
              <button
                key={`${ri}-${ki}`}
                onClick={() => key === "⌫" ? handleBackspace() : handleKeyPress(key)}
                style={{
                  height: 58, background: key === "⌫" ? "#eef2fa" : PP.white,
                  border: `1.5px solid #dde3f0`, borderRadius: 12,
                  fontSize: key === "⌫" ? 20 : 22, fontWeight: 700,
                  color: PP.blue, cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,48,135,0.07)",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                }}
              >{key}</button>
            );
          })
        )}
      </div>
    );
  };

  const inputStyle = {
    width: "100%", padding: "13px 14px",
    background: PP.bg, border: `1.5px solid #dde3f0`,
    borderRadius: 12, color: PP.blue, fontWeight: 600,
    fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  };

  const labelStyle = {
    color: "#888", fontSize: 11, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: 0.5,
    display: "block", marginBottom: 6
  };

  // Indicatore step
  const StepIndicator = () => (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
      {[1,2,3,4].map(s => (
        <div key={s} style={{
          width: s === step ? 24 : 8, height: 8, borderRadius: 4,
          background: s <= step ? PP.blue : "#dde3f0",
          transition: "all 0.3s"
        }} />
      ))}
    </div>
  );

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
            margin: "0 auto 20px", boxShadow: "0 4px 16px rgba(26,158,92,0.3)"
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:40,height:40}}>
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: PP.blue, margin: "0 0 8px" }}>Invio effettuato!</h2>
          <p style={{ color: "#888", fontSize: 14 }}>{importo}€ inviato a {destinatario}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: PP.bg, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <Header showBackButton={true} onBack={handleBack} title="Inviare denaro" />

      <div style={{ padding: "88px 16px 40px", maxWidth: 480, margin: "0 auto" }}>
        <StepIndicator />

        {/* STEP 1 — Numero destinatario */}
        {step === 1 && (
          <>
            <div style={{ background: PP.white, borderRadius: 16, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
              <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>Numero del destinatario</p>
              <div style={{
                background: PP.bg, borderRadius: 12, padding: "18px",
                textAlign: "center", border: `1.5px solid ${destinatario ? PP.blue : "#dde3f0"}`
              }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: PP.blue, letterSpacing: 4, fontFamily: "monospace" }}>
                  {destinatario || "_ _ _ _ _ _ _ _"}
                </span>
              </div>
              <NumericKeyboard />
            </div>
            <button
              onClick={handleNext}
              disabled={!destinatario}
              style={{
                width: "100%", background: !destinatario ? "#aac0e0" : PP.blue,
                color: PP.white, border: "none", borderRadius: 14, padding: "15px",
                fontSize: 15, fontWeight: 800, cursor: !destinatario ? "not-allowed" : "pointer"
              }}
            >
              Avanti →
            </button>
          </>
        )}

        {/* STEP 2 — Dati destinatario */}
        {step === 2 && (
          <>
            <div style={{ background: PP.white, borderRadius: 16, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
              <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>Dati del destinatario</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Codice fiscale</label>
                  <input
                    type="text"
                    placeholder="Es. RSSMRC85M01H501Z"
                    value={datiDestinatario.codiceFiscale}
                    onChange={e => setDatiDestinatario({ ...datiDestinatario, codiceFiscale: e.target.value.toUpperCase() })}
                    style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: 1 }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Numero carta</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={datiDestinatario.numeroCarta}
                    onChange={e => {
                      const cleaned = e.target.value.replace(/\s/g, '').slice(0, 16);
                      const chunks = cleaned.match(/.{1,4}/g);
                      setDatiDestinatario({ ...datiDestinatario, numeroCarta: chunks ? chunks.join(' ') : cleaned });
                    }}
                    style={{ ...inputStyle, letterSpacing: 2, fontFamily: "monospace" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Causale</label>
                  <input
                    type="text"
                    placeholder="Es. Rimborso spese, Affitto..."
                    value={datiDestinatario.causale}
                    onChange={e => setDatiDestinatario({ ...datiDestinatario, causale: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={!datiDestinatario.codiceFiscale || !datiDestinatario.numeroCarta}
              style={{
                width: "100%",
                background: (!datiDestinatario.codiceFiscale || !datiDestinatario.numeroCarta) ? "#aac0e0" : PP.blue,
                color: PP.white, border: "none", borderRadius: 14, padding: "15px",
                fontSize: 15, fontWeight: 800,
                cursor: (!datiDestinatario.codiceFiscale || !datiDestinatario.numeroCarta) ? "not-allowed" : "pointer"
              }}
            >
              Avanti →
            </button>
          </>
        )}

        {/* STEP 3 — Importo */}
        {step === 3 && (
          <>
            <div style={{ background: PP.white, borderRadius: 16, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
              <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>Importo da inviare</p>
              <p style={{ color: "#888", fontSize: 12, margin: "0 0 16px" }}>
                Saldo disponibile: <strong style={{color: PP.blue}}>{user?.saldo?.toFixed(2) || "0.00"}€</strong>
              </p>
              <div style={{
                background: PP.bg, borderRadius: 12, padding: "20px",
                textAlign: "center", border: `1.5px solid ${importo ? PP.blue : "#dde3f0"}`
              }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: PP.blue }}>
                  {importo || "0"}€
                </span>
              </div>
              <NumericKeyboard />
            </div>
            <button
              onClick={handleNext}
              disabled={!importo || parseFloat(importo) <= 0}
              style={{
                width: "100%",
                background: (!importo || parseFloat(importo) <= 0) ? "#aac0e0" : PP.blue,
                color: PP.white, border: "none", borderRadius: 14, padding: "15px",
                fontSize: 15, fontWeight: 800,
                cursor: (!importo || parseFloat(importo) <= 0) ? "not-allowed" : "pointer"
              }}
            >
              Avanti →
            </button>
          </>
        )}

        {/* STEP 4 — Conferma */}
        {step === 4 && (
          <>
            <div style={{ background: PP.white, borderRadius: 16, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
              <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>Riepilogo bonifico</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Destinatario", value: destinatario },
                  { label: "Codice fiscale", value: datiDestinatario.codiceFiscale },
                  { label: "Numero carta", value: datiDestinatario.numeroCarta },
                  { label: "Causale", value: datiDestinatario.causale || "—" },
                  { label: "Importo", value: `${importo}€`, highlight: true },
                  { label: "Nuovo saldo", value: `${(user.saldo - parseFloat(importo)).toFixed(2)}€` },
                ].map((item, i, arr) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid #eef2fa" : "none"
                  }}>
                    <span style={{ color: "#888", fontSize: 13 }}>{item.label}</span>
                    <span style={{ color: item.highlight ? PP.blue : PP.blue, fontWeight: item.highlight ? 800 : 700, fontSize: item.highlight ? 16 : 13 }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={handleConfirm}
                style={{
                  width: "100%", background: PP.blue, color: PP.white,
                  border: "none", borderRadius: 14, padding: "15px",
                  fontSize: 15, fontWeight: 800, cursor: "pointer"
                }}
              >
                Conferma invio ✓
              </button>
              <button
                onClick={() => setStep(1)}
                style={{
                  width: "100%", background: PP.white, color: PP.blue,
                  border: `1.5px solid #dde3f0`, borderRadius: 14, padding: "15px",
                  fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}
              >
                Annulla
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}