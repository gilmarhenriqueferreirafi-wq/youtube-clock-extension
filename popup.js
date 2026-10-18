// Elementos do DOM
const format24hCheckbox = document.getElementById('format24h');
const showSecondsCheckbox = document.getElementById('showSeconds');
const clockColorInput = document.getElementById('clockColor');
const clockSizeSelect = document.getElementById('clockSize');
const clockPositionSelect = document.getElementById('clockPosition');
const saveBtn = document.getElementById('saveBtn');

// Carregar configurações salvas
function loadSettings() {
    chrome.storage.sync.get(['format24h', 'showSeconds', 'color', 'size', 'position'], (result) => {
        if (result.format24h !== undefined) {
            format24hCheckbox.checked = result.format24h;
        }
        if (result.showSeconds !== undefined) {
            showSecondsCheckbox.checked = result.showSeconds;
        }
        if (result.color !== undefined) {
            clockColorInput.value = result.color;
        }
        if (result.size !== undefined) {
            clockSizeSelect.value = result.size;
        }
        if (result.position !== undefined) {
            clockPositionSelect.value = result.position;
        }
    });
}

// Salvar configurações
function saveSettings() {
    const settings = {
        format24h: format24hCheckbox.checked,
        showSeconds: showSecondsCheckbox.checked,
        color: clockColorInput.value,
        size: clockSizeSelect.value,
        position: clockPositionSelect.value
    };
    
    chrome.storage.sync.set(settings, () => {
        // Feedback visual
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ Salvo!';
        saveBtn.style.background = '#4CAF50';
        saveBtn.style.color = 'white';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = 'white';
            saveBtn.style.color = '#667eea';
        }, 1500);
    });
}

// Event listeners
saveBtn.addEventListener('click', saveSettings);

// Carregar configurações ao abrir o popup
document.addEventListener('DOMContentLoaded', loadSettings);