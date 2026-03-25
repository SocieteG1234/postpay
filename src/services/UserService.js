// ==================== SERVIZIO DI FORMATTAZIONE VALUTA ====================
export const formatCurrency = (importo, valuta = "EUR", simbolo = "€") => {
  const formattedNumber = new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(importo);

  if (valuta === "USD" || valuta === "CAD") {
    return `${simbolo}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${simbolo}`;
  }
};

// ==================== SERVIZIO DI ARCHIVIAZIONE ====================
const StorageService = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(`Chiave "${key}" non trovata`);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Errore LocalStorage set:', error);
      return false;
    }
  },

  delete(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Errore LocalStorage delete:', error);
      return false;
    }
  }
};

// ==================== DATI INIZIALI ====================
const initialUsers = [
  {
    codice: "26082005",
    password: "034567",
    nome: "Marie Silvia",
    codiceFiscale: "MRSSLV85M41F205Z",
    numeroCarta: "4539 1488 0343 6467",
    email: "marie.silvia@gmail.com",
    telefono: "+39 02 1234 5678",
    indirizzo: "Via Roma 45, 20121 Milano",
    saldo: 10000.00,
    valuta: "EUR",
    simboloValuta: "€",
    numeroContoCorrente: "IT60 X054 2811 1010 0000 0123 456",
    iban: "IT60 X054 2811 1010 0000 0123 456",
    bic: "BPPIITRRXXX",
    agenzia: "Agenzia Milano Centro - Via Cordusio 2, 20123 Milano",
    dataApertura: "07/02/2026",
    stato: "bloccato",
    isBlocked: true,
    motivoBlocco: "Il suo conto è stato temporaneamente sospeso per una verifica di sicurezza.",
    speseSblocco: 1300,

    transazioni: [
      { data: '25/03/2026', descrizione: 'Deposito bancario', addebito: '', accredito: '10000.00' },
      { data: '28/12/2025', descrizione: 'Bonifico Notaio - Successione', addebito: '', accredito: '1500000.00' },
      { data: '27/12/2025', descrizione: 'Bonifico in entrata', addebito: '', accredito: '250000.00' },
      { data: '26/12/2025', descrizione: 'Commissioni di gestione conto', addebito: '45.00', accredito: '' },
      { data: '24/12/2025', descrizione: 'Acquisto Gioielleria Bulgari', addebito: '8500.00', accredito: '' },
      { data: '22/12/2025', descrizione: 'Ristorante Il Luogo di Aimo e Nadia', addebito: '320.75', accredito: '' },
    ],
    estrattiConto: [
      { mese: 'marzo', anno: '2026', dataGenerazione: '25/03/2026' },
      { mese: 'dicembre', anno: '2025', dataGenerazione: '31/12/2025' },
      { mese: 'novembre', anno: '2025', dataGenerazione: '30/11/2025' }
    ],
    bonifici: [
      { data: '20/12/2025', beneficiario: 'Enel Energia', importo: -85.50, stato: 'Effettuato' },
      { data: '18/12/2025', beneficiario: 'Giulia Bianchi', importo: -200.00, stato: 'Effettuato' },
      { data: '15/12/2025', beneficiario: 'Affitto', importo: -950.00, stato: 'Effettuato' },
    ],
    depositi: [
      { tipo: 'Deposito bancario', data: '25/03/2026', importo: 10000.00, icona: '💵' },
      { tipo: 'Deposito assegno', data: '15/12/2025', importo: 1250.00, icona: '📝' },
      { tipo: 'Deposito contante', data: '10/12/2025', importo: 500.00, icona: '💵' },
    ],
    scoperto: [
      { id: 1, data: '28/12/2025', importo: -250, durata: 3, commissioni: 7.5 },
      { id: 2, data: '24/12/2025', importo: -180, durata: 5, commissioni: 9.0 },
      { id: 3, data: '20/12/2025', importo: -320, durata: 2, commissioni: 6.4 },
      { id: 4, data: '15/12/2025', importo: -150, durata: 4, commissioni: 6.0 },
      { id: 5, data: '10/12/2025', importo: -280, durata: 6, commissioni: 16.8 },
      { id: 6, data: '05/12/2025', importo: -200, durata: 3, commissioni: 6.0 }
    ],

    notaio: {
      nome: "NOTAIO GIOVANNI FERRARI",
      cognome: "Ferrari",
      titolo: "NOTAIO",
      indirizzo: "Via Montenapoleone 12",
      citta: "20121 MILANO",
      telefono: "02 76 00 12 34",
      email: "giovanni.ferrari@notaio-milano.it"
    }
  },
];

// ==================== USER SERVICE ====================
const DATA_VERSION = 9;

const UserService = {
  initializeUsers() {
    const storedVersion = StorageService.get('dataVersion');
    const stored = StorageService.get('bankUsers');

    if (storedVersion != DATA_VERSION || !stored) {
      console.log('🔄 Inizializzazione dati (v' + DATA_VERSION + ')');
      StorageService.set('bankUsers', initialUsers);
      StorageService.set('dataVersion', DATA_VERSION);
      console.log('✅ Dati salvati con localStorage');

      StorageService.delete('currentUser');
      console.log('✅ Sessione eliminata - nuovo accesso richiesto');

      return initialUsers;
    }

    return stored;
  },

  verifyLogin(codice, password) {
    const users = StorageService.get('bankUsers');

    if (!users) {
      console.error('❌ Nessun utente trovato in localStorage');
      return {
        success: false,
        message: "Errore di sistema - Aggiornare la pagina"
      };
    }

    const user = users.find(u => u.codice === codice);

    if (!user) {
      console.log('❌ Utente non trovato:', codice);
      return {
        success: false,
        message: "Codice non valido"
      };
    }

    if (String(user.password) !== String(password)) {
      console.log('❌ Password errata');
      return {
        success: false,
        message: "Password errata"
      };
    }

    console.log('✅ Accesso riuscito per:', user.nome);
    return {
      success: true,
      user: { ...user }
    };
  },

  checkCurrentUserValidity() {
    try {
      const currentUser = StorageService.get('currentUser');

      if (!currentUser) {
        return { valid: false };
      }

      const users = StorageService.get('bankUsers');

      if (!users) {
        StorageService.delete('currentUser');
        return {
          valid: false,
          shouldLogout: true,
          message: "Sessione scaduta. Effettuare nuovamente l'accesso."
        };
      }

      const userStillExists = users.find(u => u.codice === currentUser.codice);

      if (!userStillExists) {
        StorageService.delete('currentUser');
        return {
          valid: false,
          shouldLogout: true,
          message: "La sessione è scaduta. Effettuare nuovamente l'accesso."
        };
      }

      return {
        valid: true,
        user: { ...userStillExists }
      };
    } catch (error) {
      console.error('❌ Errore validazione sessione:', error);
      StorageService.delete('currentUser');
      return { valid: false, shouldLogout: true };
    }
  },

  loginUser(codice) {
    const users = StorageService.get('bankUsers');

    if (!users) {
      return {
        success: false,
        message: "Errore di sistema"
      };
    }

    const user = users.find(u => u.codice === codice);

    if (user) {
      return {
        success: true,
        user: { ...user }
      };
    }

    return {
      success: false,
      message: "Codice non valido"
    };
  },

  getUserByCodice(codice) {
    const users = StorageService.get('bankUsers');
    return users ? users.find(u => u.codice === codice) || null : null;
  },

  updateUserBalance(codice, newBalance) {
    const users = StorageService.get('bankUsers');

    if (!users) return false;

    const userIndex = users.findIndex(u => u.codice === codice);

    if (userIndex !== -1) {
      users[userIndex].saldo = newBalance;
      StorageService.set('bankUsers', users);

      const currentUser = StorageService.get('currentUser');
      if (currentUser && currentUser.codice === codice) {
        currentUser.saldo = newBalance;
        StorageService.set('currentUser', currentUser);
      }

      return true;
    }

    return false;
  }
};

export default UserService;