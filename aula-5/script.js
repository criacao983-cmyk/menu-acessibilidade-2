document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const abrirMenuBtn = document.getElementById('abrir-menu-btn');
    const opcoesMenuPanel = document.getElementById('opcoes-acessibilidade');
    
    // Controles do menu
    const fontSizeSlider = document.getElementById('font-size-slider');
    const resetFontSizeBtn = document.getElementById('reset-font-size-btn');
    const contrastePadraoBtn = document.getElementById('contraste-padrao-btn');
    const contrasteAltoBtn = document.getElementById('contraste-alto-btn');
    const contrasteEscuroBtn = document.getElementById('contraste-escuro-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const monoBtn = document.getElementById('mono-btn');
    const invertedColorsBtn = document.getElementById('inverted-colors-btn');
    const spacingBtn = document.getElementById('spacing-btn');
    const readableFontBtn = document.getElementById('readable-font-btn');
    const readingGuideBtn = document.getElementById('reading-guide-btn');
    const focusHighlightBtn = document.getElementById('focus-highlight-btn');
    const resetAllBtn = document.getElementById('reset-all-btn');

    // Estado inicial do menu
    let isMenuOpen = false;
    let readingGuideActive = false;
    let readingGuideLine = null; // Elemento da linha do guia de leitura

    // --- Funções de Acessibilidade ---

    // Toggle para o menu principal
    abrirMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        opcoesMenuPanel.classList.toggle('is-visible', isMenuOpen);
        abrirMenuBtn.setAttribute('aria-expanded', isMenuOpen);
        opcoesMenuPanel.setAttribute('aria-hidden', !isMenuOpen);
    });

    // Função para remover todas as classes de contraste
    const removeContrasteClasses = () => {
        body.classList.remove('contraste-alto', 'contraste-escuro');
        // Resetar os aria-pressed de todos os botões de contraste
        contrastePadraoBtn.setAttribute('aria-pressed', 'false');
        contrasteAltoBtn.setAttribute('aria-pressed', 'false');
        contrasteEscuroBtn.setAttribute('aria-pressed', 'false');
    };

    // Ajuste de Tamanho da Fonte
    fontSizeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        body.style.fontSize = `${value / 100}em`;
        fontSizeSlider.setAttribute('aria-valuenow', value);
    });

    resetFontSizeBtn.addEventListener('click', () => {
        body.style.fontSize = '1em'; // Tamanho da fonte padrão
        fontSizeSlider.value = 100;
        fontSizeSlider.setAttribute('aria-valuenow', 100);
    });

    // Contraste Padrão
    contrastePadraoBtn.addEventListener('click', () => {
        removeContrasteClasses();
        contrastePadraoBtn.setAttribute('aria-pressed', 'true');
    });

    // Contraste Alto
    contrasteAltoBtn.addEventListener('click', () => {
        removeContrasteClasses();
        body.classList.add('contraste-alto');
        contrasteAltoBtn.setAttribute('aria-pressed', 'true');
    });

    // Contraste Escuro
    contrasteEscuroBtn.addEventListener('click', () => {
        removeContrasteClasses();
        body.classList.add('contraste-escuro');
        contrasteEscuroBtn.setAttribute('aria-pressed', 'true');
    });

    // Modo Escuro
    darkModeBtn.addEventListener('click', () => {
        const isPressed = darkModeBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('dark-mode', !isPressed);
        darkModeBtn.setAttribute('aria-pressed', !isPressed);
    });
    
    // Monocromático
    monoBtn.addEventListener('click', () => {
        const isPressed = monoBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('monocromatico', !isPressed);
        monoBtn.setAttribute('aria-pressed', !isPressed);
    });

    // Inverter Cores
    invertedColorsBtn.addEventListener('click', () => {
        const isPressed = invertedColorsBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('cores-invertidas', !isPressed);
        invertedColorsBtn.setAttribute('aria-pressed', !isPressed);
    });

    // Aumentar Espaçamento
    spacingBtn.addEventListener('click', () => {
        const isPressed = spacingBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('maior-espacamento', !isPressed);
        spacingBtn.setAttribute('aria-pressed', !isPressed);
    });

    // Fonte Legível
    readableFontBtn.addEventListener('click', () => {
        const isPressed = readableFontBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('fonte-legivel', !isPressed);
        readableFontBtn.setAttribute('aria-pressed', !isPressed);
    });

    // Guia de Leitura
    readingGuideBtn.addEventListener('click', () => {
        readingGuideActive = !readingGuideActive;
        if (readingGuideActive) {
            readingGuideLine = document.createElement('div');
            readingGuideLine.classList.add('reading-guide-line');
            body.appendChild(readingGuideLine);
            document.addEventListener('mousemove', updateReadingGuide);
            body.classList.add('has-reading-guide');
        } else {
            if (readingGuideLine) {
                readingGuideLine.remove();
                readingGuideLine = null;
            }
            document.removeEventListener('mousemove', updateReadingGuide);
            body.classList.remove('has-reading-guide');
        }
        readingGuideBtn.setAttribute('aria-pressed', readingGuideActive);
    });

    function updateReadingGuide(e) {
        if (readingGuideLine) {
            readingGuideLine.style.top = `${e.clientY - 15}px`; // Centraliza a linha no cursor
        }
    }

    // Destacar Foco
    focusHighlightBtn.addEventListener('click', () => {
        const isPressed = focusHighlightBtn.getAttribute('aria-pressed') === 'true';
        body.classList.toggle('destacar-foco', !isPressed);
        focusHighlightBtn.setAttribute('aria-pressed', !isPressed);
    });

    // Resetar Todas as Configurações
    resetAllBtn.addEventListener('click', () => {
        // Resetar tamanho da fonte
        body.style.fontSize = '1em';
        fontSizeSlider.value = 100;
        fontSizeSlider.setAttribute('aria-valuenow', 100);

        // Remover classes de contraste
        removeContrasteClasses();
        contrastePadraoBtn.setAttribute('aria-pressed', 'true');

        // Remover outras classes do body
        body.classList.remove(
            'dark-mode',
            'monocromatico',
            'cores-invertidas',
            'maior-espacamento',
            'fonte-legivel',
            'destacar-foco',
            'has-reading-guide'
        );

        // Resetar estados dos botões
        darkModeBtn.setAttribute('aria-pressed', 'false');
        monoBtn.setAttribute('aria-pressed', 'false');
        invertedColorsBtn.setAttribute('aria-pressed', 'false');
        spacingBtn.setAttribute('aria-pressed', 'false');
        readableFontBtn.setAttribute('aria-pressed', 'false');
        focusHighlightBtn.setAttribute('aria-pressed', 'false');
        
        // Desativar guia de leitura se estiver ativo
        if (readingGuideActive) {
            readingGuideActive = false;
            if (readingGuideLine) {
                readingGuideLine.remove();
                readingGuideLine = null;
            }
            document.removeEventListener('mousemove', updateReadingGuide);
            readingGuideBtn.setAttribute('aria-pressed', 'false');
        }
    });

});