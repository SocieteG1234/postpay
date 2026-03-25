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

export default function TransactionsPage({ user }) {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("tutte");

  const transazioni = user?.transazioni || [];

  const filtrateTransazioni = transazioni.filter((t) => {
    if (filtro === "addebito") return t.addebito && t.addebito !== "";
    if (filtro === "accredito") return t.accredito && t.accredito !== "";
    return true;
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: PP.bg,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      maxWidth: 480, margin: "0 auto"
    }}>

      {/* Header */}
      <div style={{
        background: PP.blue,
        padding: "16px 20px 20px",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none", borderRadius: "50%",
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: PP.white
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
        <h1 style={{ color: PP.white, fontSize: 20, fontWeight: 700, margin: 0 }}>Movimenti</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "2px 0 0" }}>
          Storico delle transazioni
        </p>
      </div>

      <div style={{ padding: "16px 16px 80px" }}>

        {/* Filtri */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 20,
          background: PP.white, borderRadius: 12, padding: 4,
          boxShadow: "0 2px 8px rgba(0,48,135,0.07)"
        }}>
          {[
            { key: "tutte", label: "Tutti" },
            { key: "addebito", label: "Addebiti" },
            { key: "accredito", label: "Accrediti" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              style={{
                flex: 1, border: "none", borderRadius: 9,
                padding: "9px 8px", fontSize: 12, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s",
                background: filtro === f.key ? PP.blue : "transparent",
                color: filtro === f.key ? PP.white : "#888",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        {filtrateTransazioni.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: PP.white, borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,48,135,0.07)"
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p style={{ color: PP.blue, fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>
              Nessun movimento
            </p>
            <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>
              Non ci sono transazioni da visualizzare
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtrateTransazioni.map((transazione, index) => {
              const isAddebito = transazione.addebito && transazione.addebito !== "";
              return (
                <div key={index} style={{
                  background: PP.white,
                  borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,48,135,0.06)",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  {/* Icona */}
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                    background: isAddebito ? "#fff0f0" : "#f0fff4",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      stroke={isAddebito ? PP.red : "#16a34a"}
                      style={{width:18,height:18}}>
                      {isAddebito
                        ? <path d="M12 19V5M5 12l7-7 7 7"/>
                        : <path d="M12 5v14M5 12l7 7 7-7"/>
                      }
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#1a1a2e", fontWeight: 600, fontSize: 13, margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {transazione.descrizione}
                    </p>
                    <p style={{ color: "#aaa", fontSize: 11, margin: 0 }}>{transazione.data}</p>
                  </div>

                  {/* Importo */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{
                      color: isAddebito ? PP.red : "#16a34a",
                      fontWeight: 800, fontSize: 15
                    }}>
                      {isAddebito ? "−" : "+"}{isAddebito ? transazione.addebito : transazione.accredito} {user?.simboloValuta || "€"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}