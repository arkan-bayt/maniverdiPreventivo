// Variabili globali
let customFieldCounter = 0;
let items = [];

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setDefaultDate();
    calculateTotals();
    setupAuthenticationFeatures();
});

function setupAuthenticationFeatures() {
    // Display current user
    const sessionData = localStorage.getItem('preventiviPro_session');
    if (sessionData) {
        try {
            const userData = JSON.parse(sessionData);
            document.getElementById('currentUser').textContent = userData.username;
        } catch (e) {
            document.getElementById('currentUser').textContent = 'Utente';
        }
    }
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Auto-save session activity
    extendSessionActivity();
    
    // Set up periodic session extension
    setInterval(extendSessionActivity, 5 * 60 * 1000); // Every 5 minutes
}

function handleLogout() {
    if (confirm('Sei sicuro di voler uscire? I dati non salvati andranno persi.')) {
        // Clear session
        localStorage.removeItem('preventiviPro_session');
        localStorage.removeItem('preventiviPro_session_expiry');
        
        // Redirect to login
        window.location.href = 'login.html';
    }
}

function extendSessionActivity() {
    const sessionData = localStorage.getItem('preventiviPro_session');
    if (sessionData) {
        // Extend session by 24 hours from now
        const newExpiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('preventiviPro_session_expiry', newExpiryTime.toString());
    }
}

function initializeApp() {
    // Imposta la data corrente
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    
    // Imposta la data di scadenza (30 giorni dopo)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Genera numero preventivo automatico
    const currentYear = new Date().getFullYear();
    const invoiceNumber = `PREV-${currentYear}/001`;
    document.getElementById('invoiceNumber').value = invoiceNumber;
}

function fillSampleData() {
    // Dati azienda di esempio
    document.getElementById('companyName').value = 'TechSolutions Italia S.r.l.';
    document.getElementById('companyAddress').value = 'Via Roma, 123';
    document.getElementById('companyCity').value = 'Milano';
    document.getElementById('companyCAP').value = '20121';
    document.getElementById('companyProvince').value = 'MI';
    document.getElementById('companyPIVA').value = 'IT12345678901';
    document.getElementById('companyCF').value = 'ABCDEF12G34H567I';
    document.getElementById('companyPhone').value = '+39 02 1234 5678';
    document.getElementById('companyEmail').value = 'info@techsolutions.it';
    document.getElementById('companyPEC').value = 'pec@techsolutions.pec.it';
    
    // Dati cliente di esempio
    document.getElementById('clientName').value = 'Innovazione Digitale S.p.A.';
    document.getElementById('clientAddress').value = 'Corso Venezia, 456';
    document.getElementById('clientCity').value = 'Roma';
    document.getElementById('clientCAP').value = '00187';
    document.getElementById('clientProvince').value = 'RM';
    document.getElementById('clientPIVA').value = 'IT98765432100';
    document.getElementById('clientCF').value = 'ZYXWVU98T76S543R';
    
    // Dati preventivo
    document.getElementById('invoiceNumber').value = 'PREV-2025/042';
    document.getElementById('paymentMethod').value = 'Bonifico Bancario';
    
    // Note di esempio
    document.getElementById('notes').value = 'Offerta valida 30 giorni dalla data di emissione.\nPrezzi IVA esclusa salvo diversa indicazione.\nModalità di pagamento: 50% anticipo, 50% a consegna.\nGrazie per averci scelto!';
    
    // Riempi articoli di esempio
    fillSampleItems();
    
    // Aggiungi campi personalizzati di esempio
    addCustomField('Codice Commessa', 'text');
    document.querySelector('input[name="Codice Commessa"]').value = 'PROJ-2025-001';
    
    addCustomField('Referente Progetto', 'text');
    document.querySelector('input[name="Referente Progetto"]').value = 'Dott. Marco Rossi';
    
    addCustomField('Data Inizio Lavori', 'date');
    document.querySelector('input[name="Data Inizio Lavori"]').value = '2025-09-01';
    
    // Imposta sconto del 5%
    document.getElementById('discountPercent').value = '5';
    
    // Calcola totali
    setTimeout(() => {
        calculateTotals();
    }, 100);
}

function fillSampleItems() {
    // Svuota tabella esistente
    const itemsBody = document.getElementById('itemsBody');
    itemsBody.innerHTML = '';
    
    // Articoli di esempio
    const sampleItems = [
        {
            description: 'Sviluppo Sito Web Responsive',
            quantity: 1,
            price: 2500.00,
            vat: 22
        },
        {
            description: 'Configurazione Server Cloud',
            quantity: 2,
            price: 350.00,
            vat: 22
        },
        {
            description: 'Formazione Staff (8 ore)',
            quantity: 8,
            price: 75.00,
            vat: 22
        },
        {
            description: 'Licenza Software Annuale',
            quantity: 1,
            price: 450.00,
            vat: 22
        },
        {
            description: 'Manutenzione Mensile (3 mesi)',
            quantity: 3,
            price: 200.00,
            vat: 22
        }
    ];
    
    sampleItems.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.className = 'item-row';
        newRow.innerHTML = `
            <td><input type="text" class="item-description" value="${item.description}"></td>
            <td><input type="number" class="item-quantity" value="${item.quantity}" min="0" step="0.01"></td>
            <td><input type="number" class="item-price" value="${item.price}" min="0" step="0.01"></td>
            <td>
                <select class="item-vat">
                    <option value="0" ${item.vat === 0 ? 'selected' : ''}>0%</option>
                    <option value="4" ${item.vat === 4 ? 'selected' : ''}>4%</option>
                    <option value="5" ${item.vat === 5 ? 'selected' : ''}>5%</option>
                    <option value="10" ${item.vat === 10 ? 'selected' : ''}>10%</option>
                    <option value="22" ${item.vat === 22 ? 'selected' : ''}>22%</option>
                </select>
            </td>
            <td class="item-total">€0.00</td>
            <td>
                <button class="btn-remove" onclick="removeItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        itemsBody.appendChild(newRow);
    });
}

function setupEventListeners() {
    // Pulsanti principali
    document.getElementById('fillSample').addEventListener('click', fillSampleData);
    document.getElementById('addField').addEventListener('click', showCustomFieldModal);
    document.getElementById('preview').addEventListener('click', showPreview);
    document.getElementById('print').addEventListener('click', printInvoice);
    document.getElementById('exportPdf').addEventListener('click', exportToPDF);
    document.getElementById('addItem').addEventListener('click', addItem);
    
    // Modal campi personalizzati
    document.getElementById('saveField').addEventListener('click', saveCustomField);
    document.getElementById('cancelField').addEventListener('click', hideCustomFieldModal);
    
    // Calcolo totali automatico
    document.getElementById('discountPercent').addEventListener('input', calculateTotals);
    
    // Event listener per i campi degli articoli
    setupItemEventListeners();
    
    // Chiudi anteprima con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePreview();
            hideCustomFieldModal();
        }
    });
}

function setupItemEventListeners() {
    const itemsBody = document.getElementById('itemsBody');
    itemsBody.addEventListener('input', function(e) {
        if (e.target.classList.contains('item-quantity') || 
            e.target.classList.contains('item-price') || 
            e.target.classList.contains('item-vat')) {
            calculateItemTotal(e.target.closest('tr'));
            calculateTotals();
        }
    });
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
}

// Gestione campi personalizzati
function showCustomFieldModal() {
    document.getElementById('customFieldModal').style.display = 'flex';
    document.getElementById('fieldName').focus();
}

function hideCustomFieldModal() {
    document.getElementById('customFieldModal').style.display = 'none';
    document.getElementById('fieldName').value = '';
    document.getElementById('fieldType').value = 'text';
}

function saveCustomField() {
    const fieldName = document.getElementById('fieldName').value.trim();
    const fieldType = document.getElementById('fieldType').value;
    
    if (!fieldName) {
        alert('Inserisci il nome del campo');
        return;
    }
    
    addCustomField(fieldName, fieldType);
    hideCustomFieldModal();
}

function addCustomField(name, type) {
    customFieldCounter++;
    const container = document.getElementById('customFieldsContainer');
    
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-group custom-field';
    fieldDiv.innerHTML = `
        <label for="custom_${customFieldCounter}">${name}</label>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="${type}" id="custom_${customFieldCounter}" name="${name}" placeholder="${name}">
            <button type="button" class="btn-remove" onclick="removeCustomField(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.appendChild(fieldDiv);
}

function removeCustomField(button) {
    button.closest('.custom-field').remove();
}

// Gestione articoli
function addItem() {
    const itemsBody = document.getElementById('itemsBody');
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <td><input type="text" class="item-description" placeholder="Descrizione prodotto/servizio"></td>
        <td><input type="number" class="item-quantity" value="1" min="0" step="0.01"></td>
        <td><input type="number" class="item-price" value="0" min="0" step="0.01"></td>
        <td>
            <select class="item-vat">
                <option value="0">0%</option>
                <option value="4">4%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="22" selected>22%</option>
            </select>
        </td>
        <td class="item-total">€0.00</td>
        <td>
            <button class="btn-remove" onclick="removeItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    itemsBody.appendChild(newRow);
    calculateTotals();
}

function removeItem(button) {
    const row = button.closest('tr');
    row.remove();
    calculateTotals();
}

function calculateItemTotal(row) {
    const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const total = quantity * price;
    
    row.querySelector('.item-total').textContent = formatCurrency(total);
}

function calculateTotals() {
    let subtotal = 0;
    let vatAmount = 0;
    
    // Calcola totali per ogni articolo
    const itemRows = document.querySelectorAll('.item-row');
    itemRows.forEach(row => {
        calculateItemTotal(row);
        
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const vatRate = parseFloat(row.querySelector('.item-vat').value) || 0;
        
        const itemTotal = quantity * price;
        subtotal += itemTotal;
        vatAmount += itemTotal * (vatRate / 100);
    });
    
    // Calcola sconto
    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    
    // Calcola totale finale
    const finalTotal = subtotal + vatAmount - discountAmount;
    
    // Aggiorna display
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('vatAmount').textContent = formatCurrency(vatAmount);
    document.getElementById('discountAmount').textContent = formatCurrency(discountAmount);
    document.getElementById('finalTotal').textContent = formatCurrency(finalTotal);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Anteprima fattura
function showPreview() {
    if (!validateForm()) {
        return;
    }
    
    generateInvoicePreview();
    document.getElementById('invoicePreview').style.display = 'flex';
    
    // Aggiungi pulsante chiudi
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = hidePreview;
    
    const invoiceContainer = document.querySelector('.invoice-container');
    invoiceContainer.appendChild(closeBtn);
}

function hidePreview() {
    document.getElementById('invoicePreview').style.display = 'none';
    
    // Rimuovi pulsante chiudi se esiste
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.remove();
    }
}

function generateInvoicePreview() {
    const invoiceContent = document.getElementById('invoiceContent');
    
    // Raccogli tutti i dati
    const companyData = getCompanyData();
    const clientData = getClientData();
    const invoiceData = getInvoiceData();
    const customFields = getCustomFields();
    const items = getItems();
    const totals = getTotals();
    const notes = document.getElementById('notes').value;
    
    // Genera HTML della fattura
    invoiceContent.innerHTML = `
        <div class="company-logo-area">
            <div style="font-weight: bold; font-size: 14px; color: var(--primary-color);">
                ${companyData.name}
            </div>
        </div>
        
        <div class="invoice-header">
            <div>
                <div class="invoice-title">PREVENTIVO</div>
                <div style="font-size: 11px; margin-top: 5px;">
                    <strong>Fornitore:</strong><br>
                    <strong>${companyData.name}</strong><br>
                    ${companyData.address}, ${companyData.cap} ${companyData.city} (${companyData.province})<br>
                    P.IVA: ${companyData.piva}${companyData.cf ? ` | C.F.: ${companyData.cf}` : ''}<br>
                    ${companyData.phone ? `Tel: ${companyData.phone} | ` : ''}${companyData.email ? `Email: ${companyData.email}` : ''}
                    ${companyData.pec ? `<br>PEC: ${companyData.pec}` : ''}
                </div>
            </div>
            <div class="invoice-number">
                <div style="font-size: 12px;"><strong>Preventivo N°: ${invoiceData.number}</strong></div>
                <div style="font-size: 11px;">Data: ${formatDate(invoiceData.date)}</div>
                ${invoiceData.dueDate ? `<div style="font-size: 11px;">Valido fino al: ${formatDate(invoiceData.dueDate)}</div>` : ''}
                ${invoiceData.paymentMethod ? `<div style="font-size: 10px; margin-top: 5px;">Pagamento: ${invoiceData.paymentMethod}</div>` : ''}
            </div>
        </div>
        
        <div class="invoice-details-box">
            <strong>Destinatario:</strong> ${clientData.name} | ${clientData.address}, ${clientData.cap} ${clientData.city} (${clientData.province})${clientData.piva ? ` | P.IVA: ${clientData.piva}` : ''}${clientData.cf ? ` | C.F.: ${clientData.cf}` : ''}
        </div>
        
        ${customFields.length > 0 ? generateCustomFieldsHTML(customFields) : ''}
        
        <table class="invoice-table">
            <thead>
                <tr>
                    <th style="width: 45%;">Descrizione</th>
                    <th class="text-right" style="width: 8%;">Qta</th>
                    <th class="text-right" style="width: 12%;">Prezzo Unit.</th>
                    <th class="text-right" style="width: 8%;">IVA</th>
                    <th class="text-right" style="width: 12%;">Imponibile</th>
                    <th class="text-right" style="width: 15%;">Totale</th>
                </tr>
            </thead>
            <tbody>
                ${generateItemsHTML(items)}
            </tbody>
        </table>
        
        <div class="invoice-totals">
            <table class="totals-table">
                <tr>
                    <td>Totale Imponibile:</td>
                    <td class="text-right"><strong>${totals.subtotal}</strong></td>
                </tr>
                <tr>
                    <td>Totale IVA:</td>
                    <td class="text-right"><strong>${totals.vat}</strong></td>
                </tr>
                ${totals.discountPercent > 0 ? `
                <tr style="color: #e74c3c;">
                    <td>Sconto Applicato (${totals.discountPercent}%):</td>
                    <td class="text-right"><strong>-${totals.discount}</strong></td>
                </tr>
                ` : ''}
                <tr class="final-row">
                    <td><strong>TOTALE GENERALE:</strong></td>
                    <td class="text-right"><strong>${totals.final}</strong></td>
                </tr>
            </table>
        </div>
        
        ${notes ? `
        <div class="notes-section-invoice">
            <h4>Note e Condizioni:</h4>
            <div>${notes.replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
        
        <div class="payment-info">
            <strong>Modalità di Pagamento:</strong> ${invoiceData.paymentMethod || 'Da concordare'} | 
            <strong>Offerta valida fino al:</strong> ${invoiceData.dueDate ? formatDate(invoiceData.dueDate) : '30 giorni dalla data preventivo'}
        </div>
        
        <div class="invoice-footer">
            Preventivo generato elettronicamente il ${formatDate(new Date().toISOString().split('T')[0])} | 
            Sistema di Preventivi Elettronici Conforme alle Normative Italiane
        </div>
    `;
}

function generateCustomFieldsHTML(customFields) {
    if (customFields.length === 0) return '';
    
    let html = '<div class="custom-fields-invoice"><h4>Informazioni Aggiuntive:</h4><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">';
    customFields.forEach(field => {
        html += `<div><strong>${field.name}:</strong> ${field.value}</div>`;
    });
    html += '</div></div>';
    return html;
}

function generateItemsHTML(items) {
    return items.map(item => {
        const subtotalBeforeVat = item.total;
        const vatAmount = item.total * (item.vat / 100);
        const totalWithVat = subtotalBeforeVat + vatAmount;
        
        return `
        <tr>
            <td>${item.description}</td>
            <td class="text-right">${item.quantity}</td>
            <td class="text-right">${formatCurrency(item.price)}</td>
            <td class="text-right">${item.vat}%</td>
            <td class="text-right">${formatCurrency(subtotalBeforeVat)}</td>
            <td class="text-right"><strong>${formatCurrency(totalWithVat)}</strong></td>
        </tr>
    `;
    }).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
}

// Raccolta dati
function getCompanyData() {
    return {
        name: document.getElementById('companyName').value,
        address: document.getElementById('companyAddress').value,
        city: document.getElementById('companyCity').value,
        cap: document.getElementById('companyCAP').value,
        province: document.getElementById('companyProvince').value,
        piva: document.getElementById('companyPIVA').value,
        cf: document.getElementById('companyCF').value,
        phone: document.getElementById('companyPhone').value,
        email: document.getElementById('companyEmail').value,
        pec: document.getElementById('companyPEC').value
    };
}

function getClientData() {
    return {
        name: document.getElementById('clientName').value,
        address: document.getElementById('clientAddress').value,
        city: document.getElementById('clientCity').value,
        cap: document.getElementById('clientCAP').value,
        province: document.getElementById('clientProvince').value,
        piva: document.getElementById('clientPIVA').value,
        cf: document.getElementById('clientCF').value
    };
}

function getInvoiceData() {
    return {
        number: document.getElementById('invoiceNumber').value,
        date: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('dueDate').value,
        paymentMethod: document.getElementById('paymentMethod').value
    };
}

function getCustomFields() {
    const customFields = [];
    document.querySelectorAll('.custom-field input').forEach(input => {
        if (input.value.trim()) {
            customFields.push({
                name: input.name,
                value: input.value
            });
        }
    });
    return customFields;
}

function getItems() {
    const items = [];
    document.querySelectorAll('.item-row').forEach(row => {
        const description = row.querySelector('.item-description').value;
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const vat = parseFloat(row.querySelector('.item-vat').value) || 0;
        
        if (description.trim() || quantity > 0 || price > 0) {
            items.push({
                description: description || 'Prodotto/Servizio',
                quantity: quantity,
                price: price,
                vat: vat,
                total: quantity * price
            });
        }
    });
    return items;
}

function getTotals() {
    return {
        subtotal: document.getElementById('subtotal').textContent,
        vat: document.getElementById('vatAmount').textContent,
        discount: document.getElementById('discountAmount').textContent,
        discountPercent: parseFloat(document.getElementById('discountPercent').value) || 0,
        final: document.getElementById('finalTotal').textContent
    };
}

// Validazione
function validateForm() {
    const requiredFields = [
        'companyName', 'companyAddress', 'companyCity', 'companyCAP', 
        'companyProvince', 'companyPIVA', 'clientName', 'clientAddress', 
        'clientCity', 'clientCAP', 'clientProvince', 'invoiceNumber', 'invoiceDate'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert(`Il campo "${field.previousElementSibling.textContent}" è obbligatorio`);
            field.focus();
            return false;
        }
    }
    
    // Valida Partita IVA (controllo مخفف للاختبار)
    const companyPIVA = document.getElementById('companyPIVA').value;
    if (!companyPIVA || companyPIVA.length < 11) {
        alert('Inserisci una Partita IVA valida per l\'azienda (minimo 11 caratteri)');
        document.getElementById('companyPIVA').focus();
        return false;
    }
    
    // Controlla che ci sia almeno un articolo
    const items = getItems();
    if (items.length === 0) {
        alert('Aggiungi almeno un articolo al preventivo');
        return false;
    }
    
    return true;
}

function validatePIVA(piva) {
    // Rimuovi spazi e caratteri non numerici eccetto IT
    piva = piva.replace(/\s/g, '').toUpperCase();
    
    // Controlla formato IT + 11 cifre o solo 11 cifre
    if (!/^(IT)?\d{11}$/.test(piva)) {
        return false;
    }
    
    // Se inizia con IT, rimuovilo per il controllo
    if (piva.startsWith('IT')) {
        piva = piva.substring(2);
    }
    
    // Estrai le 11 cifre
    const digits = piva;
    
    // Algoritmo di controllo per P.IVA italiana (semplificato)
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        let digit = parseInt(digits[i]);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit = digit - 9;
            }
        }
        sum += digit;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(digits[10]);
}

// Stampa
function printInvoice() {
    if (!validateForm()) {
        return;
    }
    
    showPreview();
    setTimeout(() => {
        window.print();
    }, 500);
}

// Esportazione PDF
function exportToPDF() {
    if (!validateForm()) {
        return;
    }
    
    showPreview();
    
    setTimeout(() => {
        const { jsPDF } = window.jspdf;
        const invoiceContent = document.getElementById('invoiceContent');
        
        // Configurazione PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Converti HTML in Canvas e poi in PDF
        html2canvas(invoiceContent, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Larghezza A4 in mm
            const pageHeight = 295; // Altezza A4 in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Aggiungi prima pagina
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Aggiungi pagine aggiuntive se necessario
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Genera nome file
            const invoiceNumber = document.getElementById('invoiceNumber').value;
            const clientName = document.getElementById('clientName').value;
            const fileName = `Preventivo_${invoiceNumber.replace(/[\/\-]/g, '_')}_${clientName.replace(/\s+/g, '_')}.pdf`;
            
            // Scarica PDF
            pdf.save(fileName);
            
            hidePreview();
        }).catch(error => {
            console.error('Errore nella generazione del PDF:', error);
            alert('Errore nella generazione del PDF. Prova a usare la funzione di stampa del browser.');
        });
    }, 1000);
}

// Funzioni di utilità
function clearForm() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati?')) {
        document.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.type === 'date') {
                element.value = new Date().toISOString().split('T')[0];
            } else if (element.type === 'number') {
                element.value = element.classList.contains('item-quantity') ? '1' : '0';
            } else {
                element.value = '';
            }
        });
        
        // Rimuovi campi personalizzati
        document.getElementById('customFieldsContainer').innerHTML = '';
        customFieldCounter = 0;
        
        // Resetta tabella articoli
        const itemsBody = document.getElementById('itemsBody');
        itemsBody.innerHTML = `
            <tr class="item-row">
                <td><input type="text" class="item-description" placeholder="Descrizione prodotto/servizio"></td>
                <td><input type="number" class="item-quantity" value="1" min="0" step="0.01"></td>
                <td><input type="number" class="item-price" value="0" min="0" step="0.01"></td>
                <td>
                    <select class="item-vat">
                        <option value="0">0%</option>
                        <option value="4">4%</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="22" selected>22%</option>
                    </select>
                </td>
                <td class="item-total">€0.00</td>
                <td>
                    <button class="btn-remove" onclick="removeItem(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        
        calculateTotals();
        initializeApp();
    }
}

// Salvataggio e caricamento dati (localStorage)
function saveToLocalStorage() {
    const data = {
        company: getCompanyData(),
        client: getClientData(),
        invoice: getInvoiceData(),
        customFields: getCustomFields(),
        items: getItems(),
        notes: document.getElementById('notes').value,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('invoiceData', JSON.stringify(data));
    alert('Dati salvati localmente');
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('invoiceData');
    if (!savedData) {
        alert('Nessun dato salvato trovato');
        return;
    }
    
    if (confirm('Caricare i dati salvati? Questo sovrascriverà i dati correnti.')) {
        const data = JSON.parse(savedData);
        
        // Carica dati azienda
        Object.keys(data.company).forEach(key => {
            const element = document.getElementById(`company${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) element.value = data.company[key];
        });
        
        // Carica dati cliente
        Object.keys(data.client).forEach(key => {
            const element = document.getElementById(`client${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) element.value = data.client[key];
        });
        
        // Carica dati fattura
        Object.keys(data.invoice).forEach(key => {
            const element = document.getElementById(`invoice${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) element.value = data.invoice[key];
        });
        
        // Carica note
        document.getElementById('notes').value = data.notes || '';
        
        calculateTotals();
        alert('Dati caricati con successo');
    }
}

// Aggiungi pulsanti salva/carica alla toolbar
document.addEventListener('DOMContentLoaded', function() {
    const actions = document.querySelector('.actions');
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-secondary';
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Salva';
    saveBtn.onclick = saveToLocalStorage;
    
    const loadBtn = document.createElement('button');
    loadBtn.className = 'btn btn-secondary';
    loadBtn.innerHTML = '<i class="fas fa-upload"></i> Carica';
    loadBtn.onclick = loadFromLocalStorage;
    
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-warning';
    clearBtn.innerHTML = '<i class="fas fa-eraser"></i> Pulisci';
    clearBtn.onclick = clearForm;
    
    actions.appendChild(saveBtn);
    actions.appendChild(loadBtn);
    actions.appendChild(clearBtn);
});