// Variáveis globais
let clockElement = null;
let clockInterval = null;
let isFullscreen = false;
let settings = {
    format24h: true,
    showSeconds: true,
    color: '#ffffff',
    size: 'medium',
    position: 'top-right'
};

// Carregar configurações salvas
function loadSettings() {
    chrome.storage.sync.get(['format24h', 'showSeconds', 'color', 'size', 'position'], (result) => {
        if (result.format24h !== undefined) settings.format24h = result.format24h;
        if (result.showSeconds !== undefined) settings.showSeconds = result.showSeconds;
        if (result.color !== undefined) settings.color = result.color;
        if (result.size !== undefined) settings.size = result.size;
        if (result.position !== undefined) settings.position = result.position;
    });
}

// Criar elemento do relógio
function createClock() {
    if (clockElement) return;
    
    clockElement = document.createElement('div');
    clockElement.id = 'youtube-floating-clock';
    clockElement.innerHTML = '00:00:00';
    
    // Aplicar configurações
    applySettings();
    
    // Adicionar ao documento
    document.body.appendChild(clockElement);
    
    // Iniciar atualização do relógio
    startClock();
    
    // Adicionar funcionalidade de arrastar
    makeDraggable(clockElement);
}

// Remover relógio
function removeClock() {
    if (clockElement) {
        if (clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }
        clockElement.remove();
        clockElement = null;
    }
}

// Atualizar relógio
function updateClock() {
    if (!clockElement) return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    if (!settings.format24h) {
        hours = hours % 12 || 12;
    }
    
    hours = hours.toString().padStart(2, '0');
    
    let timeString = `${hours}:${minutes}`;
    if (settings.showSeconds) {
        timeString += `:${seconds}`;
    }
    
    clockElement.textContent = timeString;
}

// Iniciar relógio
function startClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
}

// Aplicar configurações ao relógio
function applySettings() {
    if (!clockElement) return;
    
    clockElement.style.color = settings.color;
    
    // Tamanho
    const sizes = {
        'small': '16px',
        'medium': '24px',
        'large': '32px',
        'xlarge': '48px'
    };
    clockElement.style.fontSize = sizes[settings.size] || '24px';
    
    // Posição
    const positions = {
        'top-left': { top: '20px', left: '20px', right: 'auto', bottom: 'auto' },
        'top-right': { top: '20px', right: '20px', left: 'auto', bottom: 'auto' },
        'bottom-left': { bottom: '20px', left: '20px', right: 'auto', top: 'auto' },
        'bottom-right': { bottom: '20px', right: '20px', left: 'auto', top: 'auto' }
    };
    
    const pos = positions[settings.position] || positions['top-right'];
    Object.assign(clockElement.style, pos);
}

// Tornar elemento arrastável
function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch events para mobile
    element.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === element) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            element.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

// Detectar mudança de fullscreen
function checkFullscreen() {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    
    if (isCurrentlyFullscreen && !isFullscreen) {
        // Entrou em fullscreen
        isFullscreen = true;
        createClock();
    } else if (!isCurrentlyFullscreen && isFullscreen) {
        // Saiu do fullscreen
        isFullscreen = false;
        removeClock();
    }
}

// Observar mudanças de fullscreen
document.addEventListener('fullscreenchange', checkFullscreen);

// Verificar também o modo cinema do YouTube
function checkCinemaMode() {
    const cinemaMode = document.querySelector('ytd-watch-flexy[theater]') !== null;
    const playerContainer = document.querySelector('#movie_player');
    
    if (cinemaMode || playerContainer?.classList.contains('ytp-fullscreen')) {
        if (!isFullscreen) {
            isFullscreen = true;
            createClock();
        }
    } else if (!document.fullscreenElement && isFullscreen) {
        isFullscreen = false;
        removeClock();
    }
}

// Observar mudanças no DOM para detectar modo cinema
const observer = new MutationObserver(checkCinemaMode);
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['theater', 'class']
});

// Listener para atualizações de configurações
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        if (changes.format24h) settings.format24h = changes.format24h.newValue;
        if (changes.showSeconds) settings.showSeconds = changes.showSeconds.newValue;
        if (changes.color) settings.color = changes.color.newValue;
        if (changes.size) settings.size = changes.size.newValue;
        if (changes.position) settings.position = changes.position.newValue;
        
        if (clockElement) {
            applySettings();
        }
    }
});

// Inicializar
loadSettings();

// Verificar estado inicial
setTimeout(() => {
    checkFullscreen();
    checkCinemaMode();
}, 1000);