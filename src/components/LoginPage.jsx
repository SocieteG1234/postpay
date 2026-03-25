import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserService from "../services/UserService";
import BlockedAccountModal from "./BlockedAccountModal";

const PP = {
  blue: "#003087",
  blueMid: "#0055b3",
  yellow: "#FFD700",
  yellowDark: "#F5A800",
  bg: "#f0f2f5",
  white: "#ffffff",
  red: "#cc0000",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identificativo, setIdentificativo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [activeTab, setActiveTab] = useState("carta");
  const [ricordaPack, setRicordaPack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockedUser, setBlockedUser] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        if (showPasswordPage) handlePasswordKeyPress(e.key);
        else handleIdentificativoKeyPress(e.key);
      } else if (e.key === "Backspace") {
        if (showPasswordPage) handlePasswordBackspace();
        else handleIdentificativoBackspace();
      } else if (e.key === "Enter") {
        if (showPasswordPage) { if (password.length === 6 && !isLoading) handlePasswordSubmit(); }
        else { if (identificativo.length === 8 && !isLoading) handleIdentificativoSubmit(); }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [identificativo, password, showPasswordPage, isLoading]);

  const handleIdentificativoSubmit = async () => {
    setError(""); setIsLoading(true);
    if (!identificativo) { setError("Inserire il codice identificativo"); setIsLoading(false); return; }
    if (identificativo.length !== 8) { setError("Il codice deve contenere 8 cifre"); setIsLoading(false); return; }
    const result = UserService.loginUser(identificativo);
    if (!result.success) { setError("Codice identificativo errato"); setIsLoading(false); return; }
    setShowPasswordPage(true); setIsLoading(false);
  };

  const handlePasswordSubmit = async () => {
    setError(""); setIsLoading(true);
    if (!password) { setError("Inserire il codice segreto"); setIsLoading(false); return; }
    if (password.length !== 6) { setError("Il codice segreto deve contenere esattamente 6 cifre"); setIsLoading(false); return; }
    const result = UserService.verifyLogin(identificativo, password);
    if (!result.success) { setError(result.message || "Errore di accesso"); setIsLoading(false); return; }
    const userData = result.user;
    login(userData); setIsLoading(false);
    if (userData.isBlocked) { setBlockedUser(userData); setShowBlockedModal(true); }
    else navigate("/");
  };

  const handleUnlockAccount = async () => { setShowBlockedModal(false); navigate("/"); };
  const handleBackToIdentificativo = () => { setShowPasswordPage(false); setPassword(""); setError(""); };
  const handleIdentificativoKeyPress = (num) => { if (identificativo.length < 8) { setIdentificativo(prev => prev + num); setError(""); } };
  const handleIdentificativoBackspace = () => { setIdentificativo(prev => prev.slice(0, -1)); setError(""); };
  const handlePasswordKeyPress = (num) => { if (password.length < 6) { setPassword(prev => prev + num); setError(""); } };
  const handlePasswordBackspace = () => { setPassword(prev => prev.slice(0, -1)); setError(""); };

  // ── Tastierino numerico stile Postepay ──
  const NumericKeyboard = ({ onKeyPress, onBackspace }) => {
    const keys = [["1","2","3"],["4","5","6"],["7","8","9"],["","0","⌫"]];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
        {keys.map((row, ri) =>
          row.map((key, ki) => {
            if (key === "") return <div key={`${ri}-${ki}`} />;
            const isBackspace = key === "⌫";
            return (
              <button
                key={`${ri}-${ki}`}
                onClick={() => isBackspace ? onBackspace() : onKeyPress(key)}
                disabled={isLoading}
                style={{
                  height: 58,
                  background: isBackspace ? "#eef2fa" : PP.white,
                  border: `1.5px solid ${isBackspace ? "#dde3f0" : "#dde3f0"}`,
                  borderRadius: 12,
                  fontSize: isBackspace ? 20 : 22,
                  fontWeight: 700,
                  color: isBackspace ? PP.blue : PP.blue,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.5 : 1,
                  boxShadow: "0 2px 6px rgba(0,48,135,0.07)",
                  transition: "all 0.15s",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                }}
              >
                {key}
              </button>
            );
          })
        )}
      </div>
    );
  };

  // ── Caselle input ──
  const InputBoxes = ({ value, maxLength = 8, showAsPassword = false }) => {
    const boxes = Array(maxLength).fill(null);
    // Raggruppa per 4
    const groups = [];
    for (let i = 0; i < maxLength; i += 4) groups.push(boxes.slice(i, i + 4).map((_, j) => i + j));

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {groups.map((group, gi) => (
          <div key={gi} style={{ display: "flex", gap: 6 }}>
            {group.map((index) => {
              const filled = value.length > index;
              return (
                <div key={index} style={{
                  width: 44, height: 52,
                  background: filled ? "#eef2fa" : PP.white,
                  border: `2px solid ${filled ? PP.blue : "#dde3f0"}`,
                  borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800,
                  color: filled ? PP.blue : "#ccc",
                  transition: "all 0.2s",
                  boxShadow: filled ? "0 2px 8px rgba(0,48,135,0.12)" : "none"
                }}>
                  {value[index] ? (showAsPassword ? "●" : value[index]) : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // ── Tabs ──
  const Tabs = () => (
    <div style={{
      display: "flex", gap: 8,
      background: "#eef2fa", borderRadius: 12, padding: 4,
      marginBottom: 24
    }}>
      {[
        { key: "carta", label: "Numero carta" },
        { key: "pack", label: "Numero pack" },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          disabled={isLoading}
          style={{
            flex: 1, border: "none", borderRadius: 9,
            padding: "10px 8px", fontSize: 12, fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            background: activeTab === tab.key ? PP.blue : "transparent",
            color: activeTab === tab.key ? PP.white : "#888",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
          }}
        >
          Accedi con<br />{tab.label}
        </button>
      ))}
    </div>
  );

  const sharedWrapper = (children) => (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${PP.blue} 0%, ${PP.blue} 38%, ${PP.bg} 38%)`,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      {children}
    </div>
  );

  // ══════════════════════════════════════
  // PAGINA PASSWORD
  // ══════════════════════════════════════
  if (showPasswordPage) {
    return (
      <>
        {sharedWrapper(
          <>
            {/* Header */}
            <div style={{ width: "100%", maxWidth: 420, padding: "20px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={handleBackToIdentificativo}
                disabled={isLoading}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              {/* Logo */}
              <div style={{ background: PP.yellow, borderRadius: 6, padding: "4px 12px" }}>
                <span style={{ color: PP.blue, fontWeight: 900, fontSize: 16, letterSpacing: 0.5 }}>postepay</span>
              </div>
            </div>

            {/* Titolo */}
            <div style={{ width: "100%", maxWidth: 420, padding: "24px 20px 0", textAlign: "center" }}>
              <h1 style={{ color: PP.white, fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
                Codice segreto
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0 }}>
                Inserisca le 6 cifre del suo codice segreto
              </p>
            </div>

            {/* Card bianca */}
            <div style={{
              width: "100%", maxWidth: 420,
              background: PP.white,
              borderRadius: 24, margin: "28px 16px 0",
              padding: "28px 20px 24px",
              boxShadow: "0 8px 32px rgba(0,48,135,0.15)"
            }}>
              <Tabs />

              {error && (
                <div style={{
                  background: "#fff0f0", border: `1px solid #ffcccc`,
                  borderRadius: 10, padding: "10px 14px",
                  marginBottom: 16, color: PP.red,
                  fontSize: 13, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  ⚠️ {error}
                </div>
              )}

              <p style={{ textAlign: "center", color: "#888", fontSize: 12, margin: "0 0 14px" }}>
                Codice segreto (6 cifre)
              </p>
              <InputBoxes value={password} maxLength={6} showAsPassword={true} />

              {/* Ricorda pack toggle */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#f8f9fb", borderRadius: 12, padding: "12px 16px", margin: "18px 0"
              }}>
                <span style={{ color: PP.blue, fontWeight: 700, fontSize: 13 }}>Ricorda il pack</span>
                <button
                  onClick={() => setRicordaPack(!ricordaPack)}
                  disabled={isLoading}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: ricordaPack ? PP.blue : "#dde3f0",
                    border: "none", cursor: "pointer",
                    position: "relative", transition: "background 0.2s"
                  }}
                >
                  <div style={{
                    position: "absolute", top: 3,
                    left: ricordaPack ? 23 : 3,
                    width: 18, height: 18,
                    borderRadius: "50%", background: PP.white,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    transition: "left 0.2s"
                  }}/>
                </button>
              </div>

              <NumericKeyboard onKeyPress={handlePasswordKeyPress} onBackspace={handlePasswordBackspace} />

              <button
                onClick={handlePasswordSubmit}
                disabled={isLoading || password.length !== 6}
                style={{
                  width: "100%", marginTop: 20,
                  background: isLoading || password.length !== 6 ? "#aac0e0" : PP.blue,
                  color: PP.white, border: "none", borderRadius: 14,
                  padding: "15px", fontSize: 15, fontWeight: 800,
                  cursor: isLoading || password.length !== 6 ? "not-allowed" : "pointer",
                  letterSpacing: 0.5, transition: "background 0.2s"
                }}
              >
                {isLoading ? "⏳ Accesso in corso..." : "Accedi"}
              </button>
            </div>
          </>
        )}

        {showBlockedModal && blockedUser && (
          <BlockedAccountModal
            user={blockedUser}
            onClose={() => navigate("/")}
            onUnlock={handleUnlockAccount}
          />
        )}
      </>
    );
  }

  // ══════════════════════════════════════
  // PAGINA IDENTIFICATIVO
  // ══════════════════════════════════════
  return sharedWrapper(
    <>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 420, padding: "28px 20px 0", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: PP.yellow, borderRadius: 8, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ color: PP.blue, fontWeight: 900, fontSize: 20, letterSpacing: 0.5 }}>postepay</span>
        </div>
        <h1 style={{ color: PP.white, fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
          Bentornato/a
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0 }}>
          Inserisca il suo identificativo per accedere
        </p>
      </div>

      {/* Card bianca */}
      <div style={{
        width: "100%", maxWidth: 420,
        background: PP.white,
        borderRadius: 24, margin: "28px 16px 0",
        padding: "28px 20px 24px",
        boxShadow: "0 8px 32px rgba(0,48,135,0.15)"
      }}>
        <Tabs />

        {error && (
          <div style={{
            background: "#fff0f0", border: `1px solid #ffcccc`,
            borderRadius: 10, padding: "10px 14px",
            marginBottom: 16, color: PP.red,
            fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        <p style={{ textAlign: "center", color: "#888", fontSize: 12, margin: "0 0 14px" }}>
          Codice identificativo (8 cifre)
        </p>
        <InputBoxes value={identificativo} maxLength={8} showAsPassword={false} />

        {/* Ricorda pack toggle */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#f8f9fb", borderRadius: 12, padding: "12px 16px", margin: "18px 0"
        }}>
          <span style={{ color: PP.blue, fontWeight: 700, fontSize: 13 }}>Ricorda il pack</span>
          <button
            onClick={() => setRicordaPack(!ricordaPack)}
            disabled={isLoading}
            style={{
              width: 44, height: 24, borderRadius: 12,
              background: ricordaPack ? PP.blue : "#dde3f0",
              border: "none", cursor: "pointer",
              position: "relative", transition: "background 0.2s"
            }}
          >
            <div style={{
              position: "absolute", top: 3,
              left: ricordaPack ? 23 : 3,
              width: 18, height: 18,
              borderRadius: "50%", background: PP.white,
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              transition: "left 0.2s"
            }}/>
          </button>
        </div>

        <NumericKeyboard onKeyPress={handleIdentificativoKeyPress} onBackspace={handleIdentificativoBackspace} />

        <button
          onClick={handleIdentificativoSubmit}
          disabled={isLoading || identificativo.length !== 8}
          style={{
            width: "100%", marginTop: 20,
            background: isLoading || identificativo.length !== 8 ? "#aac0e0" : PP.blue,
            color: PP.white, border: "none", borderRadius: 14,
            padding: "15px", fontSize: 15, fontWeight: 800,
            cursor: isLoading || identificativo.length !== 8 ? "not-allowed" : "pointer",
            letterSpacing: 0.5, transition: "background 0.2s"
          }}
        >
          {isLoading ? "⏳ Verifica in corso..." : "Avanti →"}
        </button>

        <p style={{ textAlign: "center", color: "#ccc", fontSize: 11, margin: "14px 0 0" }}>
          Test: <strong style={{color:"#aaa"}}>26082005</strong> · Codice: <strong style={{color:"#aaa"}}>034567</strong>
        </p>
      </div>
    </>
  );
}