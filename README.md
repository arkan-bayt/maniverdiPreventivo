# 🧾 Generatore di Preventivi Italiani - PreventiviPro

![GitHub](https://img.shields.io/github/license/USERNAME/preventivi-generator)
![GitHub release](https://img.shields.io/github/release/USERNAME/preventivi-generator.svg)
![GitHub stars](https://img.shields.io/github/stars/USERNAME/preventivi-generator.svg)
![GitHub Pages](https://img.shields.io/github/deployments/USERNAME/preventivi-generator/github-pages)

🚀 **Applicazione web professionale per la generazione di preventivi conformi alla normativa italiana**

[🌐 **Demo Live**](https://USERNAME.github.io/preventivi-generator) | [📖 **Documentazione**](https://github.com/USERNAME/preventivi-generator/wiki) | [🐛 **Segnala Bug**](https://github.com/USERNAME/preventivi-generator/issues)

---

## 🎯 **Panoramica**

PreventiviPro è un sistema completo per la creazione di preventivi professionali conformi alla normativa italiana. Progettato per freelancer, piccole e medie imprese che necessitano di uno strumento affidabile e sicuro per la gestione delle quotazioni.

## ✨ **Caratteristiche Principali**

### 🔐 **Sistema di Autenticazione Sicuro**
- Protezione anti-brute force (3 tentativi, blocco 15 minuti)
- Sessioni sicure con scadenza automatica (24 ore)
- Logout automatico per inattività (30 minuti)
- Hash delle credenziali per maggiore sicurezza

### 📋 **Conformità Normativa Italiana**
- Campi obbligatori secondo la normativa italiana
- Validazione Partita IVA italiana con algoritmo di controllo
- Calcolo IVA automatico (0%, 4%, 5%, 10%, 22%)
- Formato data italiano (dd/mm/yyyy)
- Terminologie e struttura conformi agli standard

### 🎨 **Interfaccia Professionale**
- Design responsive per desktop, tablet e mobile
- Interfaccia utente intuitiva completamente in italiano
- Tema moderno con animazioni CSS fluide
- Icone FontAwesome per una migliore user experience

### 🔧 **Funzionalità Avanzate**
- **Campi personalizzati** dinamici per esigenze specifiche
- **Calcolo automatico** di totali, IVA e sconti in tempo reale
- **Anteprima istantanea** del preventivo formattato
- **Stampa ottimizzata** con CSS print-friendly (una pagina)
- **Esportazione PDF** di alta qualità
- **Salvataggio locale** sicuro dei dati

### 💼 **Gestione Completa dei Dati**
- **Informazioni azienda**: Ragione sociale, indirizzo, contatti, P.IVA
- **Dati cliente**: Anagrafica completa con validazione
- **Gestione prodotti/servizi**: Tabella dinamica con calcoli automatici
- **Note personalizzabili**: Condizioni e informazioni aggiuntive

---

## 🚀 **Quick Start**

### 1. **Deploy su GitHub Pages**
```bash
# Fork questo repository
git clone https://github.com/TUO-USERNAME/preventivi-generator.git
cd preventivi-generator

# Push sul tuo repository
git remote set-url origin https://github.com/TUO-USERNAME/preventivi-generator.git
git push -u origin main
```

### 2. **Configurazione GitHub Pages**
1. Vai su **Settings** → **Pages**
2. Seleziona **Deploy from a branch**
3. Scegli **main** branch e **docs** folder
4. Clicca **Save**

### 3. **Accesso Online**
Il sito sarà disponibile su: `https://TUO-USERNAME.github.io/preventivi-generator`

---

## 🔐 **Sistema di Sicurezza**

### 🛡️ **Autenticazione**
- Sistema di login professionale con interfaccia moderna
- Protezione anti-brute force (massimo 3 tentativi)
- Blocco automatico account per 15 minuti dopo tentativi falliti
- Sessioni sicure con scadenza automatica

### 🔑 **Gestione Accesso**
- **Credenziali**: Disponibili solo per utenti autorizzati
- **Sessioni**: Auto-logout dopo 30 minuti di inattività
- **Protezione**: Tutte le pagine sensibili sono protette
- **Sicurezza**: Dati crittografati localmente

### 🚨 **Privacy e Sicurezza**
- **Nessun server esterno**: Tutti i dati rimangono sul dispositivo dell'utente
- **Zero tracking**: Nessun analytics o monitoraggio
- **Conformità GDPR**: Rispetto completo della privacy
- **Backup locale**: Salvataggio opzionale nel browser

---

## 💻 **Tecnologie Utilizzate**

### **Frontend**
- **HTML5** - Struttura semantica e accessibile
- **CSS3** - Design responsive e animazioni avanzate
- **JavaScript ES6+** - Logica applicativa moderna
- **FontAwesome 6** - Iconografia professionale

### **Librerie**
- **jsPDF** - Generazione PDF client-side
- **html2canvas** - Rendering canvas per esportazione
- **Web APIs** - LocalStorage, Print API, Date API

### **Sicurezza**
- **Client-side authentication** - Sistema di login sicuro
- **Session management** - Gestione sessioni temporanee
- **Input validation** - Validazione rigorosa dei dati
- **XSS protection** - Protezione contro attacchi comuni

---

## 📁 **Struttura del Progetto**

```
preventivi-generator/
├── 📄 login.html              # Pagina di accesso (entry point)
├── 🎨 login-style.css         # Stili interfaccia login
├── ⚙️ login-script.js         # Logica autenticazione
├── 📄 index.html              # Dashboard principale (protetta)
├── 🎨 style.css               # Stili applicazione principale
├── ⚙️ script.js               # Logica gestione preventivi
├── 📖 README.md               # Documentazione progetto
├── 📦 package.json            # Configurazione e metadati
├── 📜 LICENSE                 # Licenza MIT
├── 🚫 .gitignore              # File esclusi da Git
├── 📁 .github/                # Configurazione GitHub
│   └── 📁 workflows/          # GitHub Actions
│       └── deploy.yml         # Auto-deploy Pages
└── 📁 docs/                   # Build per GitHub Pages
    └── index.html             # Entry point pubblico
```

---

## 🎮 **Come Usare**

### **1. Accesso al Sistema**
1. Apri il link del sito web
2. Inserisci le credenziali di accesso
3. Clicca "Accedi" per entrare nel sistema

### **2. Creazione Preventivo**
1. **Dati Azienda**: Compila informazioni della tua azienda
2. **Dati Cliente**: Inserisci anagrafica del cliente
3. **Prodotti/Servizi**: Aggiungi articoli con prezzi e IVA
4. **Personalizzazioni**: Usa campi custom per esigenze specifiche

### **3. Gestione e Esportazione**
1. **Anteprima**: Visualizza il preventivo formattato
2. **Modifica**: Correggi dati e calcoli automatici
3. **Stampa**: Output ottimizzato per carta A4
4. **PDF**: Esporta in formato professionale
5. **Salva**: Backup locale dei dati

---

## 🔧 **Configurazione Avanzata**

### **Personalizzazione Aliquote IVA**
```javascript
// Modifica in script.js
const vatRates = [
    { value: 0, label: '0% - Esente' },
    { value: 4, label: '4% - Ridotta' },
    { value: 5, label: '5% - Ridotta' },
    { value: 10, label: '10% - Ridotta' },
    { value: 22, label: '22% - Ordinaria' },
    { value: 25, label: '25% - Speciale' }  // Aggiunta personalizzata
];
```

### **Personalizzazione Stili**
```css
/* Modifica in style.css */
:root {
    --primary-color: #2c3e50;     /* Il tuo colore principale */
    --secondary-color: #3498db;   /* Il tuo colore secondario */
    --company-logo: url('logo.png'); /* Il tuo logo aziendale */
}
```

---

## 📱 **Compatibilità**

### **Browser Supportati**
- ✅ **Chrome** 70+
- ✅ **Firefox** 65+
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ❌ **Internet Explorer** (non supportato)

### **Dispositivi**
- 💻 **Desktop**: Esperienza completa con tutti i controlli
- 📱 **Tablet**: Layout adattivo touch-friendly
- 📱 **Mobile**: Interfaccia ottimizzata per schermi piccoli

### **Caratteristiche Responsive**
- **Breakpoint Mobile**: < 480px
- **Breakpoint Tablet**: 481px - 768px
- **Breakpoint Desktop**: > 768px

---

## 🐛 **Troubleshooting**

### **Problemi Comuni**

**🔐 Problemi di Login**
- Verifica credenziali corrette
- Controlla se l'account è bloccato (attendi 15 minuti)
- Cancella cache browser se necessario

**📄 Problemi PDF**
- Assicurati che il browser supporti download automatici
- Disabilita popup blocker per questo sito
- Prova con browser diverso se persiste

**🖨️ Problemi Stampa**
- Imposta orientamento "Ritratto"
- Attiva "Stampa sfondi" nelle opzioni
- Usa margini minimi per ottimizzare spazio

---

## 🤝 **Contributi**

Benvenuti contributi dalla community! 

### **Come Contribuire**
1. **Fork** del repository
2. **Branch** per la nuova funzionalità (`git checkout -b feature/AmazingFeature`)
3. **Commit** delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** con descrizione dettagliata

### **Tipi di Contributi Benvenuti**
- 🐛 Bug fixes
- ✨ Nuove funzionalità
- 📚 Miglioramenti documentazione
- 🌐 Traduzioni
- 🎨 Miglioramenti UI/UX
- 🔒 Enhancements di sicurezza

---

## 📄 **Licenza**

Questo progetto è rilasciato sotto **Licenza MIT**. Vedi il file [LICENSE](LICENSE) per dettagli completi.

### **Cosa Significa**
✅ **Uso commerciale**  
✅ **Modifica**  
✅ **Distribuzione**  
✅ **Uso privato**  

❌ **Nessuna garanzia**  
❌ **Nessuna responsabilità**  

---

## 🆘 **Supporto**

### **Hai Bisogno di Aiuto?**
- 📖 **Documentazione**: Leggi questo README
- 🐛 **Bug Report**: [Apri un Issue](https://github.com/USERNAME/preventivi-generator/issues)
- 💡 **Feature Request**: [Suggerisci Miglioramenti](https://github.com/USERNAME/preventivi-generator/issues)
- ❓ **Domande**: [Discussions](https://github.com/USERNAME/preventivi-generator/discussions)

### **Contatti**
- **Email**: support@preventiviPro.dev
- **Twitter**: [@PreventiviPro](https://twitter.com/preventiviPro)
- **LinkedIn**: [PreventiviPro](https://linkedin.com/company/preventiviPro)

---

## 🏆 **Riconoscimenti**

- **FontAwesome** per le icone professionali
- **jsPDF** per la generazione PDF client-side
- **html2canvas** per il rendering avanzato
- **Community GitHub** per feedback e contributi

---

## 🔄 **Changelog**

### **v1.0.0** (Corrente)
- ✅ Sistema di autenticazione sicuro
- ✅ Generazione preventivi italiani
- ✅ Calcolo automatico IVA
- ✅ Esportazione PDF professionale
- ✅ Design responsive completo
- ✅ Campi personalizzabili dinamici

### **Roadmap Future**
- 🔄 Sistema multi-utente
- 🔄 Database cloud opzionale
- 🔄 Template personalizzabili
- 🔄 Integrazione servizi di pagamento
- 🔄 App mobile nativa
- 🔄 API per integrazioni esterne

---

**⭐ Se questo progetto ti è utile, lascia una stella su GitHub!**

**💼 Sviluppato con ❤️ per semplificare la gestione preventivi delle aziende italiane**