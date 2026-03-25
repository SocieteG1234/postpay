import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const carte = [
    {
      numero: "9402",
      tipo: "Postepay Evolution",
      saldo: user?.saldo || 0.59,
      valuta: user?.simboloValuta || "€",
      scadenza: "12/28"
    }
  ];

  const cartaCorrente = carte[currentCardIndex];

  const quickActions = [
    {
      label: "Ricarica",
      path: "/ricarica",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}>
          <path d="M12 5v14M5 12h14"/>
        </svg>
      )
    },
    {
      label: "Invia",
      path: "/invia",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}>
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
      )
    },
    {
      label: "Movimenti",
      path: "/transazioni",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      )
    },
    {
      label: "Pagamenti",
      path: "/ricarica/bonifico",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      )
    }
  ];

  const menuItems = [
    {
      label: "La mia carta",
      path: "/carte",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      )
    },
    {
      label: "Profilo",
      path: "/profilo",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      label: "Assistenza",
      path: "/contatto",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative"
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: "#003087",
        padding: "16px 20px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            background: "#FFD700",
            borderRadius: 6,
            padding: "4px 10px"
          }}>
            <span style={{ color: "#003087", fontWeight: 900, fontSize: 15, letterSpacing: 0.5 }}>
              postepay
            </span>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: 20,
              padding: "6px 14px",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Esci
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>Benvenuto/a</p>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "2px 0 0" }}>
            {user?.nome || "Mario"} {user?.cognome || "Rossi"}
          </h1>
        </div>
      </div>

      <div style={{ padding: "0 16px 100px" }}>

        {/* ── CARTA ── */}
        <div style={{
          background: "linear-gradient(135deg, #F5A800 0%, #FFD700 50%, #FFC200 100%)",
          borderRadius: 18,
          padding: "22px 22px 20px",
          marginTop: 20,
          boxShadow: "0 8px 24px rgba(245,168,0,0.4)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.18)" }}/>
          <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(0,48,135,0.1)" }}/>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
            <div>
              <p style={{ color:"#003087", fontSize:11, fontWeight:700, margin:0, opacity:0.7, textTransform:"uppercase", letterSpacing:1 }}>
                {cartaCorrente.tipo}
              </p>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:4,
                background:"#cc0000", color:"#fff",
                fontSize:10, fontWeight:800, letterSpacing:1,
                padding:"3px 10px", borderRadius:20, marginTop:6
              }}>
                🔒 BLOCCATA
              </div>
            </div>
            <div style={{ width:36, height:28, background:"rgba(0,48,135,0.25)", borderRadius:5, border:"1px solid rgba(0,48,135,0.2)" }}/>
          </div>

          <p style={{ color:"#003087", fontSize:17, fontWeight:700, letterSpacing:3, margin:"18px 0 0", fontFamily:"monospace" }}>
            •••• •••• •••• {cartaCorrente.numero}
          </p>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:16 }}>
            <div>
              <p style={{ color:"#003087", fontSize:10, opacity:0.7, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:1 }}>Saldo disponibile</p>
              <p style={{ color:"#003087", fontSize:30, fontWeight:900, margin:0, lineHeight:1 }}>
                {cartaCorrente.saldo}<span style={{fontSize:18}}> {cartaCorrente.valuta}</span>
              </p>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ color:"#003087", fontSize:10, opacity:0.6, margin:"0 0 2px", textTransform:"uppercase" }}>Scadenza</p>
              <p style={{ color:"#003087", fontSize:14, fontWeight:700, margin:0 }}>{cartaCorrente.scadenza}</p>
            </div>
          </div>
        </div>

        {/* ── AZIONI RAPIDE ── */}
        <div style={{ marginTop:24 }}>
          <p style={{ color:"#888", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", margin:"0 0 12px 4px" }}>
            Azioni rapide
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                style={{
                  background:"#fff",
                  border:"none",
                  borderRadius:14,
                  padding:"16px 8px 12px",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  gap:8,
                  cursor:"pointer",
                  boxShadow:"0 2px 8px rgba(0,48,135,0.08)"
                }}
              >
                <div style={{
                  width:48, height:48, borderRadius:"50%",
                  background:"#003087",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  {action.icon}
                </div>
                <span style={{ color:"#003087", fontSize:10, fontWeight:700, textAlign:"center" }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── LIMITI PACK ── */}
        <div style={{
          background:"#fff", borderRadius:16, padding:"16px 18px",
          marginTop:20, boxShadow:"0 2px 8px rgba(0,48,135,0.07)"
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#FFF5CC", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p style={{ color:"#003087", fontWeight:700, fontSize:13, margin:0 }}>Formula MAX</p>
              <p style={{ color:"#888", fontSize:11, margin:0 }}>Pack 5059 5941</p>
            </div>
          </div>
          <p style={{ color:"#555", fontSize:12, margin:"0 0 10px" }}>
            Puoi ancora ricaricare <span style={{ color:"#003087", fontWeight:700 }}>5.000€</span> oggi <span style={{ color:"#aaa" }}>(10.000€/mese)</span>
          </p>
          <div style={{ background:"#eee", borderRadius:999, height:6, marginBottom:6 }}>
            <div style={{ background:"linear-gradient(90deg,#003087,#0055b3)", borderRadius:999, height:6, width:"50%" }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
            <p style={{ color:"#666", fontSize:11, margin:0 }}>
              <b style={{color:"#003087"}}>5</b> ricariche su <b style={{color:"#003087"}}>5</b> oggi
            </p>
            <button style={{ background:"#003087", color:"#fff", border:"none", borderRadius:8, padding:"6px 14px", fontSize:11, fontWeight:700, cursor:"pointer" }}>
              I miei limiti
            </button>
          </div>
        </div>

        {/* ── MENU SECONDARIO ── */}
        <div style={{ marginTop:20 }}>
          <p style={{ color:"#888", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", margin:"0 0 12px 4px" }}>
            Gestisci
          </p>
          <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,48,135,0.07)" }}>
            {menuItems.map((item, i) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width:"100%", background:"none", border:"none",
                  borderBottom: i < menuItems.length - 1 ? "1px solid #f0f0f0" : "none",
                  padding:"16px 18px", display:"flex", alignItems:"center",
                  gap:14, cursor:"pointer", textAlign:"left"
                }}
              >
                <div style={{ width:38, height:38, borderRadius:10, background:"#eef2fa", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {item.icon}
                </div>
                <span style={{ color:"#1a1a2e", fontSize:14, fontWeight:600, flex:1 }}>{item.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:480, background:"#fff",
        borderTop:"1px solid #e8e8e8", display:"flex",
        justifyContent:"space-around", padding:"10px 0 16px",
        zIndex:200, boxShadow:"0 -4px 20px rgba(0,48,135,0.08)"
      }}>
        {[
          { label:"Home", path:"/", active:true, icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { label:"Movimenti", path:"/transazioni", active:false, icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
          { label:"Carte", path:"/carte", active:false, icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
          { label:"Profilo", path:"/profilo", active:false, icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
        ].map((nav) => (
          <button
            key={nav.path}
            onClick={() => navigate(nav.path)}
            style={{
              background:"none", border:"none", display:"flex",
              flexDirection:"column", alignItems:"center", gap:3,
              cursor:"pointer", color: nav.active ? "#003087" : "#aaa", flex:1
            }}
          >
            {nav.icon}
            <span style={{ fontSize:10, fontWeight: nav.active ? 700 : 500 }}>{nav.label}</span>
            {nav.active && <div style={{ width:4, height:4, borderRadius:"50%", background:"#FFD700", marginTop:1 }}/>}
          </button>
        ))}
      </div>

    </div>
  );
}