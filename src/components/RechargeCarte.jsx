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

export default function RechargeCarte() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    importo: "",
    numeroCarta: "",
    nomeCarta: "",
    dataScadenza: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const importiPredefiniti = [50, 100, 200, 500];

  const handleImportoSelect = (importo) => {
    setFormData({ ...formData, importo: importo.toString() });
  };

  const formatNumeroCarta = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatDataScadenza = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    return cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numeroCarta') {
      setFormData({ ...formData, [name]: formatNumeroCarta(value.replace(/\s/g, '').slice(0, 16)) });
    } else if (name === 'dataScadenza') {
      setFormData({ ...formData, [name]: formatDataScadenza(value) });
    } else if (name === 'cvv') {
      setFormData({ ...formData, [name]: value.slice(0, 3) });
    } else if (name === 'importo') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!formData.importo || parseFloat(formData.importo) < 10) { setError("L'importo minimo è di 10€"); return; }
    if (formData.numeroCarta.replace(/\s/g, '').length !== 16) { setError("Numero di carta non valido"); return; }
    if (!formData.dataScadenza.match(/^\d{2}\/\d{2}$/)) { setError("Data di scadenza non valida"); return; }
    if (formData.cvv.length !== 3) { setError("CVV non valido"); return; }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      setError("Errore durante il pagamento. Riprovare.");
    } finally {
      setLoading(false);
    }
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

  return (
    <div style={{ minHeight: "100vh", background: PP.bg, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <Header showBackButton={true} title="Carta Bancaria" />

      {/* Banner */}
      <div style={{
        background: `linear-gradient(180deg, ${PP.blue} 0%, ${PP.blue} 100%)`,
        padding: "32px 20px", textAlign: "center", marginTop: 64
      }}>
        <div style={{
          width: 72, height: 72, background: PP.yellow, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px", boxShadow: "0 4px 16px rgba(0,48,135,0.3)"
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={PP.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
            <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
        </div>
        <h1 style={{ color: PP.white, fontSize: 20, fontWeight: 900, letterSpacing: 2, margin: 0 }}>CARTA BANCARIA</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "6px 0 0" }}>Ricarica istantanea con carta</p>
      </div>

      <div style={{ padding: "20px 16px 40px", maxWidth: 480, margin: "0 auto" }}>

        {/* Importo */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Importo da ricaricare</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
            {importiPredefiniti.map((importo) => (
              <button
                key={importo}
                onClick={() => handleImportoSelect(importo)}
                style={{
                  padding: "12px 0", borderRadius: 12, fontWeight: 800, fontSize: 15,
                  border: `1.5px solid ${formData.importo === importo.toString() ? PP.blue : "#dde3f0"}`,
                  background: formData.importo === importo.toString() ? PP.blue : PP.bg,
                  color: formData.importo === importo.toString() ? PP.white : PP.blue,
                  cursor: "pointer", transition: "all 0.15s"
                }}
              >
                {importo}€
              </button>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="importo"
              value={formData.importo}
              onChange={handleInputChange}
              placeholder="Importo personalizzato"
              style={inputStyle}
            />
            <span style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              color: PP.blue, fontWeight: 800, fontSize: 16
            }}>€</span>
          </div>
        </div>

        {/* Informazioni carta */}
        <div style={{ background: PP.white, borderRadius: 16, padding: "16px 18px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,48,135,0.07)" }}>
          <p style={{ color: PP.blue, fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Informazioni di pagamento</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={labelStyle}>Numero di carta</label>
              <input type="text" name="numeroCarta" value={formData.numeroCarta} onChange={handleInputChange} placeholder="1234 5678 9012 3456" style={{ ...inputStyle, letterSpacing: 2 }} />
            </div>
            <div>
              <label style={labelStyle}>Intestatario della carta</label>
              <input type="text" name="nomeCarta" value={formData.nomeCarta} onChange={handleInputChange} placeholder="MARIO ROSSI" style={{ ...inputStyle, textTransform: "uppercase" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Data di scadenza</label>
                <input type="text" name="dataScadenza" value={formData.dataScadenza} onChange={handleInputChange} placeholder="MM/AA" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>CVV</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        {/* Errore */}
        {error && (
          <div style={{
            background: "#fff0f0", border: `1px solid #ffcccc`,
            borderRadius: 12, padding: "12px 14px", marginBottom: 14,
            color: PP.red, fontSize: 13, fontWeight: 600, textAlign: "center"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Sicurezza */}
        <div style={{
          background: "#f0faf4", border: "1px solid #b6e8cc",
          borderRadius: 12, padding: "12px 14px", marginBottom: 14,
          display: "flex", alignItems: "center", gap: 10
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1a9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20,flexShrink:0}}>
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <p style={{ color: "#1a9e5c", fontSize: 12, fontWeight: 600, margin: 0 }}>
            Pagamento 100% sicuro e criptato
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#aac0e0" : PP.blue,
            color: PP.white, border: "none", borderRadius: 14,
            padding: "15px", fontSize: 15, fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}
        >
          {loading ? (
            <>
              <svg style={{ animation: "spin 1s linear infinite", width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25"/>
                <path fill="white" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Elaborazione in corso...
            </>
          ) : (
            `Paga ${formData.importo || '0'}€`
          )}
        </button>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}