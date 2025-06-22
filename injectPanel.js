// Verifica se o painel já foi injetado para evitar duplicação
if (!window.cypressRecorderPanelInjected) {
    // Marca que o painel foi injetado
    window.cypressRecorderPanelInjected = true;
  
    // Novas cores específicas
    const green = '#4CAF50'; // iniciar gravação
    const blue = '#142B43'; // reiniciar gravação, título
    const red = '#E53935'; // parar gravação
    const lightGray = '#F5F5F5'; // fundo principal
  
    // Nova paleta azul/rosé
    const rose = '#D7B0A6'; // botão principal, destaques
    const beigeRose = '#D6C3BC'; // botão reiniciar
    const offWhite = '#F7F0EA'; // fundo principal
  
    // Cria o elemento principal do painel
    const panel = document.createElement('div');
    panel.id = 'cypress-recorder-panel';
    // Estilização do painel: posição fixa no canto inferior direito
    panel.style.position = 'fixed';
    panel.style.bottom = '10px';
    panel.style.right = '10px';
    panel.style.width = '420px';
    panel.style.height = '600px';
    panel.style.minWidth = '300px';
    panel.style.minHeight = '400px';
    panel.style.maxWidth = '90vw';
    panel.style.maxHeight = '90vh';
    panel.style.background = lightGray;
    panel.style.color = blue;
    panel.style.fontFamily = "'Roboto', Arial, sans-serif";
    panel.style.fontSize = '14px';
    panel.style.zIndex = '999999'; // Garante que fique acima de outros elementos
    panel.style.borderRadius = '10px';
    panel.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column'; // Layout vertical
    panel.style.overflow = 'hidden';
    panel.style.resize = 'both'; // Permite redimensionamento nativo
    panel.style.border = '2px solid ' + blue;
  
    // Cria o cabeçalho do painel
    const header = document.createElement('div');
    header.style.padding = '14px 18px';
    header.style.background = blue;
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.overflow = 'visible';
  
    // Ícone de informação no canto esquerdo
    const infoIcon = document.createElement('span');
    infoIcon.textContent = '🛈';
    infoIcon.style.fontSize = '20px';
    infoIcon.style.cursor = 'pointer';
    infoIcon.style.position = 'relative';
    infoIcon.style.marginRight = '14px';
    infoIcon.style.color = '#fff';
    // Tooltip customizado
    const tooltip = document.createElement('div');
    tooltip.textContent = 'CyRecord é uma extensão para o navegador Google Chrome que grava automaticamente as ações do usuário em uma página web (como cliques e digitação em campos) e gera, a partir disso, comandos prontos para serem usados em testes automatizados com o framework Cypress.';
    tooltip.style.position = 'absolute';
    tooltip.style.top = '120%';
    tooltip.style.left = '0';
    tooltip.style.transform = 'none';
    tooltip.style.background = '#fff';
    tooltip.style.color = blue;
    tooltip.style.border = 'none';
    tooltip.style.padding = '7px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '11px';
    tooltip.style.fontFamily = "'Roboto', Arial, sans-serif";
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)';
    tooltip.style.whiteSpace = 'normal';
    tooltip.style.textAlign = 'left';
    tooltip.style.zIndex = '1000000';
    tooltip.style.display = 'none';
    tooltip.style.maxWidth = '260px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.lineHeight = '1.4';
    // Seta do tooltip
    const tooltipArrow = document.createElement('div');
    tooltipArrow.style.position = 'absolute';
    tooltipArrow.style.top = '-7px';
    tooltipArrow.style.left = '16px';
    tooltipArrow.style.transform = 'none';
    tooltipArrow.style.width = '0';
    tooltipArrow.style.height = '0';
    tooltipArrow.style.borderLeft = '7px solid transparent';
    tooltipArrow.style.borderRight = '7px solid transparent';
    tooltipArrow.style.borderBottom = '7px solid #fff';
    tooltip.appendChild(tooltipArrow);
    infoIcon.appendChild(tooltip);
    infoIcon.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });
    infoIcon.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    header.appendChild(infoIcon);
  
    // Container para título
    const titleContainer = document.createElement('div');
    titleContainer.style.display = 'flex';
    titleContainer.style.alignItems = 'center';
    // Título
    const title = document.createElement('div');
    title.textContent = 'CyRecord';
    title.style.fontWeight = 'bold';
    title.style.color = '#fff';
    title.style.fontFamily = "'Roboto', Arial, sans-serif";
    titleContainer.appendChild(title);
    header.appendChild(titleContainer);
  
    // Container para botões do header
    const headerButtons = document.createElement('div');
    headerButtons.style.display = 'flex';
    headerButtons.style.alignItems = 'center';
    headerButtons.style.gap = '8px';
    
    // Botão minimizar/expandir
    const btnToggleSize = document.createElement('button');
    btnToggleSize.textContent = '⬜'; // Símbolo maximizar
    btnToggleSize.style.fontSize = '16px';
    btnToggleSize.style.background = 'transparent';
    btnToggleSize.style.color = '#fff';
    btnToggleSize.style.border = '1px solid rgba(255,255,255,0.3)';
    btnToggleSize.style.borderRadius = '3px';
    btnToggleSize.style.cursor = 'pointer';
    btnToggleSize.style.padding = '4px 6px';
    btnToggleSize.style.fontFamily = "'Roboto', Arial, sans-serif";
    btnToggleSize.title = 'Maximizar/Restaurar';
    headerButtons.appendChild(btnToggleSize);
    
    // Cria o botão "Fechar" painel
    const btnClose = document.createElement('button');
    btnClose.textContent = '×'; // Símbolo X
    btnClose.style.fontSize = '22px';
    btnClose.style.background = 'transparent';
    btnClose.style.color = '#fff';
    btnClose.style.border = 'none';
    btnClose.style.cursor = 'pointer';
    btnClose.style.fontFamily = "'Roboto', Arial, sans-serif";
    headerButtons.appendChild(btnClose);
    
    header.appendChild(headerButtons);
  
    // Status da gravação
    const statusDiv = document.createElement('div');
    statusDiv.style.display = 'flex';
    statusDiv.style.justifyContent = 'center';
    statusDiv.style.alignItems = 'center';
    statusDiv.style.padding = '18px 0 10px 0';
    statusDiv.style.background = 'transparent';
    statusDiv.style.gap = '16px';
  
    // Botão iniciar/parar gravação
    const btnStartStop = document.createElement('button');
    btnStartStop.textContent = 'Iniciar Gravação';
    btnStartStop.style.background = green;
    btnStartStop.style.color = '#fff';
    btnStartStop.style.fontWeight = 'bold';
    btnStartStop.style.fontSize = '18px';
    btnStartStop.style.border = 'none';
    btnStartStop.style.borderRadius = '6px';
    btnStartStop.style.padding = '12px 32px';
    btnStartStop.style.cursor = 'pointer';
    btnStartStop.style.transition = 'background 0.2s';
    btnStartStop.style.fontFamily = "'Roboto', Arial, sans-serif";
    statusDiv.appendChild(btnStartStop);
  
    // Botão reiniciar gravação (criado mas só exibido durante gravação)
    const btnRestart = document.createElement('button');
    btnRestart.textContent = 'Reiniciar Gravação';
    btnRestart.style.background = beigeRose;
    btnRestart.style.color = blue;
    btnRestart.style.fontWeight = 'bold';
    btnRestart.style.fontSize = '18px';
    btnRestart.style.border = 'none';
    btnRestart.style.borderRadius = '6px';
    btnRestart.style.padding = '12px 32px';
    btnRestart.style.cursor = 'pointer';
    btnRestart.style.fontFamily = "'Roboto', Arial, sans-serif";
    btnRestart.style.display = 'none';
    statusDiv.appendChild(btnRestart);
    panel.appendChild(header);
    panel.appendChild(statusDiv);
  
    // Lista de passos gravados
    const stepsDiv = document.createElement('div');
    stepsDiv.style.flex = '1';
    stepsDiv.style.overflowY = 'auto';
    stepsDiv.style.background = 'transparent';
    stepsDiv.style.margin = '0 0 0 0';
    stepsDiv.style.padding = '0 18px 0 18px';
  
    const stepsTitle = document.createElement('div');
    stepsTitle.textContent = 'Ações realizadas';
    stepsTitle.style.fontWeight = 'bold';
    stepsTitle.style.margin = '10px 0 6px 0';
    stepsTitle.style.color = blue;
    stepsTitle.style.fontFamily = "'Roboto', Arial, sans-serif";
    stepsDiv.appendChild(stepsTitle);

    // Dica sobre asserções
    const assertionTip = document.createElement('div');
    assertionTip.textContent = '💡 Clique com botão direito nos elementos para adicionar asserções';
    assertionTip.style.fontSize = '11px';
    assertionTip.style.color = '#666';
    assertionTip.style.fontStyle = 'italic';
    assertionTip.style.margin = '0 0 4px 0';
    assertionTip.style.fontFamily = "'Roboto', Arial, sans-serif";
    stepsDiv.appendChild(assertionTip);
    
    // Dica sobre redimensionamento
    const resizeTip = document.createElement('div');
    resizeTip.textContent = '';
    resizeTip.style.fontSize = '10px';
    resizeTip.style.color = '#888';
    resizeTip.style.fontStyle = 'italic';
    resizeTip.style.margin = '0 0 8px 0';
    resizeTip.style.fontFamily = "'Roboto', Arial, sans-serif";
    stepsDiv.appendChild(resizeTip);
  
    const stepsList = document.createElement('ul');
    stepsList.style.listStyle = 'none';
    stepsList.style.padding = '0';
    stepsList.style.margin = '0';
    stepsDiv.appendChild(stepsList);
    panel.appendChild(stepsDiv);
  
    // Área de exportação de código
    const exportDiv = document.createElement('div');
    exportDiv.style.background = '#fff';
    exportDiv.style.padding = '12px 18px 18px 18px';
    exportDiv.style.borderTop = `2px solid ${rose}`;
    exportDiv.style.display = 'flex';
    exportDiv.style.flexDirection = 'column';
    exportDiv.style.gap = '8px';
  
    const exportLabel = document.createElement('div');
    exportLabel.textContent = 'Código Cypress gerado';
    exportLabel.style.fontWeight = 'bold';
    exportLabel.style.color = blue;
    exportLabel.style.fontFamily = "'Roboto', Arial, sans-serif";
    exportDiv.appendChild(exportLabel);
  
    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.style.width = '100%';
    textarea.style.height = '160px';
    textarea.style.background = lightGray;
    textarea.style.color = blue;
    textarea.style.border = `1px solid ${blue}`;
    textarea.style.borderRadius = '5px';
    textarea.style.padding = '8px';
    textarea.style.fontFamily = "'Roboto', Arial, sans-serif";
    textarea.style.fontSize = '13px';
    textarea.style.resize = 'none';
    exportDiv.appendChild(textarea);
  
    // Campo de nome do arquivo
    const filenameDiv = document.createElement('div');
    filenameDiv.style.display = 'flex';
    filenameDiv.style.flexDirection = 'column';
    filenameDiv.style.gap = '4px';
    filenameDiv.style.marginTop = '8px';

    const filenameLabel = document.createElement('label');
    filenameLabel.textContent = 'Nome do arquivo:';
    filenameLabel.style.fontWeight = 'bold';
    filenameLabel.style.color = blue;
    filenameLabel.style.fontSize = '13px';
    filenameLabel.style.fontFamily = "'Roboto', Arial, sans-serif";
    filenameDiv.appendChild(filenameLabel);

    const filenameInput = document.createElement('input');
    filenameInput.type = 'text';
    filenameInput.placeholder = 'Digite o nome do arquivo (ex: login-test)';
    filenameInput.style.width = '100%';
    filenameInput.style.padding = '8px 10px';
    filenameInput.style.border = `1px solid ${blue}`;
    filenameInput.style.borderRadius = '4px';
    filenameInput.style.fontSize = '13px';
    filenameInput.style.fontFamily = "'Roboto', Arial, sans-serif";
    filenameInput.style.boxSizing = 'border-box';
    
    // Listener para pressionar Enter no campo de nome do arquivo
    filenameInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && !btnDownload.disabled) {
        downloadCode();
      }
    });
    
    filenameDiv.appendChild(filenameInput);

    const filenameHint = document.createElement('small');
    filenameHint.textContent = 'Quando exportar código, será gerado um arquivo .js com o nome informado';
    filenameHint.style.color = '#666';
    filenameHint.style.fontSize = '11px';
    filenameHint.style.fontStyle = 'italic';
    filenameDiv.appendChild(filenameHint);

    exportDiv.appendChild(filenameDiv);

    const btnDownload = document.createElement('button');
    btnDownload.textContent = 'Exportar Código Cypress';
    btnDownload.style.background = blue;
    btnDownload.style.color = '#fff';
    btnDownload.style.fontWeight = 'bold';
    btnDownload.style.fontSize = '15px';
    btnDownload.style.border = 'none';
    btnDownload.style.borderRadius = '6px';
    btnDownload.style.padding = '10px 24px';
    btnDownload.style.cursor = 'pointer';
    btnDownload.style.marginTop = '8px';
    btnDownload.style.fontFamily = "'Roboto', Arial, sans-serif";
    btnDownload.disabled = true;
    exportDiv.appendChild(btnDownload);
    panel.appendChild(exportDiv);
    
    // Indicador de redimensionamento no canto inferior direito
    const resizeIndicator = document.createElement('div');
    resizeIndicator.style.position = 'absolute';
    resizeIndicator.style.bottom = '2px';
    resizeIndicator.style.right = '2px';
    resizeIndicator.style.width = '12px';
    resizeIndicator.style.height = '12px';
    resizeIndicator.style.background = `linear-gradient(
      -45deg, 
      transparent 0%, transparent 30%, 
      ${blue} 30%, ${blue} 40%, 
      transparent 40%, transparent 60%, 
      ${blue} 60%, ${blue} 70%, 
      transparent 70%
    )`;
    resizeIndicator.style.cursor = 'se-resize';
    resizeIndicator.style.opacity = '0.6';
    resizeIndicator.style.transition = 'opacity 0.2s';
    resizeIndicator.className = 'resize-handle resize-bottom-right';
    resizeIndicator.addEventListener('mouseenter', () => {
      resizeIndicator.style.opacity = '1';
    });
    resizeIndicator.addEventListener('mouseleave', () => {
      resizeIndicator.style.opacity = '0.6';
    });
    panel.appendChild(resizeIndicator);
  
    // Cria handles de redimensionamento
    const resizeHandles = [
      { position: 'top', cursor: 'n-resize' },
      { position: 'right', cursor: 'e-resize' },
      { position: 'bottom', cursor: 's-resize' },
      { position: 'left', cursor: 'w-resize' },
      { position: 'top-left', cursor: 'nw-resize' },
      { position: 'top-right', cursor: 'ne-resize' },
      { position: 'bottom-left', cursor: 'sw-resize' },
      { position: 'bottom-right', cursor: 'se-resize' }
    ];
    
    resizeHandles.forEach(handle => {
      const resizeHandle = document.createElement('div');
      resizeHandle.className = `resize-handle resize-${handle.position}`;
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.background = 'transparent';
      resizeHandle.style.cursor = handle.cursor;
      resizeHandle.style.zIndex = '1000000';
      resizeHandle.style.transition = 'background-color 0.2s';
      
      // Define posição e tamanho baseado no tipo de handle
      if (handle.position.includes('top')) {
        resizeHandle.style.top = '-5px';
        resizeHandle.style.height = '10px';
      }
      if (handle.position.includes('bottom')) {
        resizeHandle.style.bottom = '-5px';
        resizeHandle.style.height = '10px';
      }
      if (handle.position.includes('left')) {
        resizeHandle.style.left = '-5px';
        resizeHandle.style.width = '10px';
      }
      if (handle.position.includes('right')) {
        resizeHandle.style.right = '-5px';
        resizeHandle.style.width = '10px';
      }
      
      // Define dimensões para bordas simples
      if (handle.position === 'top' || handle.position === 'bottom') {
        resizeHandle.style.left = '10px';
        resizeHandle.style.right = '10px';
      }
      if (handle.position === 'left' || handle.position === 'right') {
        resizeHandle.style.top = '10px';
        resizeHandle.style.bottom = '10px';
      }
      
      // Define dimensões para cantos
      if (handle.position.includes('-')) {
        resizeHandle.style.width = '20px';
        resizeHandle.style.height = '20px';
      }
      
      // Adiciona feedback visual ao hover
      resizeHandle.addEventListener('mouseenter', () => {
        resizeHandle.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
      });
      
      resizeHandle.addEventListener('mouseleave', () => {
        resizeHandle.style.backgroundColor = 'transparent';
      });
      
      panel.appendChild(resizeHandle);
    });
    
    // Adiciona o painel ao corpo da página
    document.body.appendChild(panel);
  
    // Inicializa posição para arrastar corretamente
    panel.style.left = '';
    panel.style.top = '';
    panel.style.right = '10px';
    panel.style.bottom = '10px';
    panel.style.width = '420px';
    panel.style.height = '600px';
  
    // Variáveis para controle de redimensionamento e arrasto
    let isDragging = false, isResizing = false, resizeDirection = '';
    let offsetX = 0, offsetY = 0;
    let originalSize = { width: 420, height: 600, left: null, top: null, right: '10px', bottom: '10px' };
    let isMaximized = false;
    
    // Torna o painel arrastável pelo header
    header.style.cursor = 'move';
    header.addEventListener('mousedown', function(e) {
      // Só permite arrastar se não estiver clicando nos botões
      if (e.target === btnClose || e.target === btnToggleSize) return;
      
      isDragging = true;
      // Sempre converte para left/top ao arrastar
      const rect = panel.getBoundingClientRect();
      panel.style.left = rect.left + 'px';
      panel.style.top = rect.top + 'px';
      panel.style.right = '';
      panel.style.bottom = '';
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.body.style.userSelect = 'none';
    });
    
    // Duplo clique no header para maximizar/restaurar
    header.addEventListener('dblclick', function(e) {
      // Só funciona se não clicar nos botões
      if (e.target === btnClose || e.target === btnToggleSize) return;
      toggleMaximize();
    });
    
    // Funcionalidade de redimensionamento
    panel.addEventListener('mousedown', function(e) {
      if (e.target.classList.contains('resize-handle')) {
        isResizing = true;
        resizeDirection = e.target.className.split(' ')[1].replace('resize-', '');
        
        // Converte para posicionamento absoluto se necessário
        const rect = panel.getBoundingClientRect();
        if (panel.style.right || panel.style.bottom) {
          panel.style.left = rect.left + 'px';
          panel.style.top = rect.top + 'px';
          panel.style.right = '';
          panel.style.bottom = '';
        }
        
        panel.style.width = rect.width + 'px';
        panel.style.height = rect.height + 'px';
        
        document.body.style.userSelect = 'none';
        e.preventDefault();
        e.stopPropagation();
      }
    });
    
    // Eventos de movimento e soltura para arrastar e redimensionar
    document.addEventListener('mousemove', function(e) {
      if (isDragging && !isMaximized) {
        // Limita o painel para não sair da tela
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        newLeft = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, newTop));
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
      } else if (isResizing && !isMaximized) {
        const rect = panel.getBoundingClientRect();
        const minWidth = parseInt(panel.style.minWidth) || 300;
        const minHeight = parseInt(panel.style.minHeight) || 400;
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;
        
        let newWidth = rect.width;
        let newHeight = rect.height;
        let newLeft = rect.left;
        let newTop = rect.top;
        
        // Calcula novas dimensões baseado na direção do resize
        if (resizeDirection.includes('right')) {
          newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX - rect.left));
        }
        if (resizeDirection.includes('left')) {
          const newLeftPos = Math.max(0, e.clientX);
          newWidth = Math.max(minWidth, rect.right - newLeftPos);
          if (newWidth > minWidth) newLeft = newLeftPos;
        }
        if (resizeDirection.includes('bottom')) {
          newHeight = Math.max(minHeight, Math.min(maxHeight, e.clientY - rect.top));
        }
        if (resizeDirection.includes('top')) {
          const newTopPos = Math.max(0, e.clientY);
          newHeight = Math.max(minHeight, rect.bottom - newTopPos);
          if (newHeight > minHeight) newTop = newTopPos;
        }
        
        // Aplica as novas dimensões
        panel.style.width = newWidth + 'px';
        panel.style.height = newHeight + 'px';
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
      }
    });
    
    document.addEventListener('mouseup', function() {
      isDragging = false;
      isResizing = false;
      resizeDirection = '';
      document.body.style.userSelect = '';
    });
  
    // Variáveis para controlar o estado da gravação
    let actions = []; // Array para armazenar as ações gravadas
    let isRecording = false; // Flag para controlar se está gravando
  
    // Variáveis para controlar inputs consecutivos
    let inputTimeout; // Timeout para agrupar inputs
    let lastInputSelector = null; // Último seletor de input usado
  
    // Função para gerar um seletor CSS único para um elemento
    function getSelector(element) {
      // Prioriza data-cy se disponível (melhor prática para testes)
      if (element.getAttribute('data-cy')) {
        return {
          selector: `[data-cy="${element.getAttribute('data-cy')}"]`,
          useContains: false,
          containsText: ''
        };
      }
      
      // Prioriza ID se disponível (mais específico)
      if (element.id) {
        return {
          selector: `#${element.id}`,
          useContains: false,
          containsText: ''
        };
      }
      
      // Usa o atributo name se disponível
      if (element.name) {
        return {
          selector: `[name="${element.name}"]`,
          useContains: false,
          containsText: ''
        };
      }
      
      // Usa classes CSS se disponíveis
      if (typeof element.className === 'string' && element.className.trim()) {
        return {
          selector: '.' + element.className.trim().split(/\s+/).join('.'),
          useContains: false,
          containsText: ''
        };
      }
      
      // Verifica se deve usar contains baseado no texto do elemento
      const text = element.textContent?.trim();
      if (text && text.length > 0 && text.length < 50) {
        // Se tem texto visível, usa contains
        return {
          selector: '',
          useContains: true,
          containsText: text
        };
      }
      
      // Fallback: usa apenas o nome da tag
      return {
        selector: element.tagName.toLowerCase(),
        useContains: false,
        containsText: ''
      };
    }
  
    // Função para converter as ações gravadas em código Cypress
    function generateCypressCode(actions) {
      return actions.map(action => {
        // Gera código Cypress para ação de clique
        if (action.actionType === 'click') {
          if (action.useContains) {
            return `cy.contains('${action.containsText}').should('be.visible').click();`;
          } else {
            return `cy.get('${action.selector}').click();`;
          }
        } 
        // Gera código Cypress para ação de input
        else if (action.actionType === 'input') {
          if (action.useContains) {
            return `cy.contains('${action.containsText}').should('be.visible').type('${action.value}');`;
          } else {
            return `cy.get('${action.selector}').type('${action.value}');`;
          }
        }
        // Gera código Cypress para asserções
        else if (action.actionType === 'assert') {
          const selector = action.useContains ? 
            `cy.contains('${action.containsText}')` : 
            `cy.get('${action.selector}')`;
          
          switch (action.assertType) {
            case 'be.visible':
              return `${selector}.should('be.visible');`;
            case 'have.text':
              return `${selector}.should('have.text', '${action.expectedValue}');`;
            case 'contain.text':
              return `${selector}.should('contain.text', '${action.expectedValue}');`;
            case 'have.class':
              return `${selector}.should('have.class', '${action.expectedValue}');`;
            case 'have.attr':
              return `${selector}.should('have.attr', '${action.attrName}', '${action.expectedValue}');`;
            case 'have.value':
              return `${selector}.should('have.value', '${action.expectedValue}');`;
            case 'exist':
              return `${selector}.should('exist');`;
            case 'not.exist':
              return `${selector}.should('not.exist');`;
            case 'be.disabled':
              return `${selector}.should('be.disabled');`;
            case 'be.enabled':
              return `${selector}.should('be.enabled');`;
            default:
              return `${selector}.should('${action.assertType}');`;
          }
        }
      }).join('\n'); // Junta todas as linhas com quebra de linha
    }
  
    // Variáveis para o menu de asserções
    let assertMenu = null;
    let currentAssertElement = null;
    let closeMenuTimeout = null; // Timeout para fechar o menu

    // Função para gerar o caminho completo de um seletor (garante unicidade)
    function getFullPathSelector(el) {
      if (!(el instanceof Element)) return;
      const path = [];
      let current = el;
      while (current && current.nodeType === Node.ELEMENT_NODE) {
        let selector = current.nodeName.toLowerCase();
        if (current.id) {
          selector = '#' + current.id;
          path.unshift(selector);
          break; // Para se encontrar um ID
        }
        
        const parent = current.parentNode;
        if (!parent || parent.nodeType !== Node.ELEMENT_NODE) {
          path.unshift(selector);
          break;
        }

        // Verifica irmãos com a mesma tag
        const siblings = Array.from(parent.children).filter(child => child.nodeName === current.nodeName);
        
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += `:nth-of-type(${index})`;
        }
        
        path.unshift(selector);
        current = parent;
      }
      return path.join(' > ');
    }

    // Função para gerar seletor específico para asserções (sempre prefere CSS seletores)
    function getSelectorForAssertion(element, returnAll = false) {
      // Sistema de pontuação para avaliar a qualidade dos seletores
      const selectorCandidates = [];
      
      // 1. data-cy (melhor prática - pontuação máxima)
      if (element.getAttribute('data-cy')) {
        selectorCandidates.push({
          selector: `[data-cy="${element.getAttribute('data-cy')}"]`,
          useContains: false,
          containsText: '',
          score: 100,
          reason: 'data-cy (melhor prática para testes)'
        });
      }
      
      // 2. ID (muito específico)
      if (element.id) {
        selectorCandidates.push({
          selector: `#${element.id}`,
          useContains: false,
          containsText: '',
          score: 95,
          reason: 'ID único'
        });
      }
      
      // 3. Atributos de teste específicos
      const testAttrs = ['data-testid', 'data-test', 'data-automation', 'data-qa', 'data-test-id'];
      for (const attr of testAttrs) {
        const value = element.getAttribute(attr);
        if (value) {
          selectorCandidates.push({
            selector: `[${attr}="${value}"]`,
            useContains: false,
            containsText: '',
            score: 90,
            reason: `${attr} (atributo de teste)`
          });
        }
      }
      
      // 4. Atributo name (importante para formulários)
      if (element.name) {
        selectorCandidates.push({
          selector: `[name="${element.name}"]`,
          useContains: false,
          containsText: '',
          score: 85,
          reason: 'atributo name'
        });
      }
      
      // 5. Classes CSS inteligentes
      if (typeof element.className === 'string' && element.className.trim()) {
        const classes = element.className.trim().split(/\s+/);
        
        // Filtra classes específicas (não genéricas)
        const specificClasses = classes.filter(cls => {
          const isGeneric = cls.includes('btn') || cls.includes('form') || cls.includes('input') || 
                           cls.includes('container') || cls.includes('wrapper') || cls.length <= 2;
          return !isGeneric;
        });
        
        if (specificClasses.length > 0) {
          // Verifica se o seletor é único na página
          const selector = '.' + specificClasses.join('.');
          const matches = document.querySelectorAll(selector);
          
          selectorCandidates.push({
            selector: selector,
            useContains: false,
            containsText: '',
            score: matches.length === 1 ? 80 : 60,
            reason: `classes específicas (${matches.length} elementos encontrados)`
          });
        } else if (classes.length > 0) {
          // Usa todas as classes se não há específicas
          const selector = '.' + classes.join('.');
          const matches = document.querySelectorAll(selector);
          
          selectorCandidates.push({
            selector: selector,
            useContains: false,
            containsText: '',
            score: matches.length === 1 ? 70 : 50,
            reason: `todas as classes (${matches.length} elementos encontrados)`
          });
        }
      }
      
      // 6. Atributos de formulário e interação
      const formAttrs = ['type', 'role', 'placeholder', 'title', 'alt'];
      for (const attr of formAttrs) {
        const value = element.getAttribute(attr);
        if (value && value.length < 30) {
          const selector = `${element.tagName.toLowerCase()}[${attr}="${value}"]`;
          const matches = document.querySelectorAll(selector);
          
          selectorCandidates.push({
            selector: selector,
            useContains: false,
            containsText: '',
            score: matches.length === 1 ? 75 : 55,
            reason: `${attr}="${value}" (${matches.length} elementos encontrados)`
          });
        }
      }
      
      // 7. Seletor hierárquico (pai com ID/classe)
      const parent = element.parentElement;
      if (parent) {
        if (parent.id) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(element) + 1;
          const selector = `#${parent.id} > ${element.tagName.toLowerCase()}:nth-child(${index})`;
          const matches = document.querySelectorAll(selector);
          
          selectorCandidates.push({
            selector: selector,
            useContains: false,
            containsText: '',
            score: matches.length === 1 ? 70 : 45,
            reason: `hierárquico com pai ID (${matches.length} elementos encontrados)`
          });
        } else if (parent.className) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(element) + 1;
          const parentClass = parent.className.trim().split(/\s+/)[0];
          const selector = `.${parentClass} > ${element.tagName.toLowerCase()}:nth-child(${index})`;
          const matches = document.querySelectorAll(selector);
          
          selectorCandidates.push({
            selector: selector,
            useContains: false,
            containsText: '',
            score: matches.length === 1 ? 65 : 40,
            reason: `hierárquico com pai classe (${matches.length} elementos encontrados)`
          });
        }
      }
      
      // 8. Texto do elemento (para elementos pequenos)
      const text = element.textContent?.trim();
      if (text && text.length > 0 && text.length <= 30 && !text.includes('\n')) {
        // Verifica se o texto é único na página
        const textMatches = Array.from(document.querySelectorAll('*')).filter(el => 
          el.textContent?.trim() === text
        );
        
        selectorCandidates.push({
          selector: `${element.tagName.toLowerCase()}`,
          useContains: true,
          containsText: text,
          score: textMatches.length === 1 ? 60 : 35,
          reason: `texto único "${text}" (${textMatches.length} elementos encontrados)`
        });
      }
      
      // 9. Combinação de atributos
      const allAttrs = Array.from(element.attributes)
        .filter(attr => attr.value && attr.value.length < 50)
        .slice(0, 2);
      
      if (allAttrs.length > 0) {
        const attrSelector = allAttrs
          .map(attr => `[${attr.name}="${attr.value}"]`)
          .join('');
        const selector = `${element.tagName.toLowerCase()}${attrSelector}`;
        const matches = document.querySelectorAll(selector);
        
        selectorCandidates.push({
          selector: selector,
          useContains: false,
          containsText: '',
          score: matches.length === 1 ? 55 : 30,
          reason: `combinação de atributos (${matches.length} elementos encontrados)`
        });
      }
      
      // 10. Fallback: apenas tag
      const tagSelector = element.tagName.toLowerCase();
      const tagMatches = document.querySelectorAll(tagSelector);
      
      selectorCandidates.push({
        selector: tagSelector,
        useContains: false,
        containsText: '',
        score: tagMatches.length === 1 ? 40 : 10,
        reason: `apenas tag (${tagMatches.length} elementos encontrados)`
      });
      
      // 11. Seletor de caminho completo (fallback para garantir unicidade)
      const fullPathSelector = getFullPathSelector(element);
      if (fullPathSelector) {
        const matches = document.querySelectorAll(fullPathSelector);
        if (matches.length === 1) {
          selectorCandidates.push({
            selector: fullPathSelector,
            useContains: false,
            containsText: '',
            score: 50 - Math.floor(fullPathSelector.length / 10), // Pontuação menor para seletores longos
            reason: `caminho completo (garante unicidade)`
          });
        }
      }
      
      // Remove duplicatas e ordena por pontuação
      const uniqueCandidates = selectorCandidates.filter((candidate, index, self) => 
        index === self.findIndex(c => c.selector === candidate.selector && c.useContains === candidate.useContains)
      );
      uniqueCandidates.sort((a, b) => b.score - a.score);
      
      if (returnAll) {
        return uniqueCandidates;
      }
      
      // Retorna o melhor candidato
      const bestSelector = uniqueCandidates[0];
      
      console.log('🧠 Análise de seletores:', {
        element: element,
        candidates: selectorCandidates,
        selected: bestSelector
      });
      
      return {
        selector: bestSelector.selector,
        useContains: bestSelector.useContains,
        containsText: bestSelector.containsText,
        score: bestSelector.score,
        reason: bestSelector.reason
      };
    }

    // Função para mostrar menu de asserções
    function showAssertMenu(event, selectorInfoOverride = null) {
      event.preventDefault();
      event.stopPropagation();
      
      // Remove menu existente se houver
      if (assertMenu) {
        assertMenu.remove();
      }
      
      currentAssertElement = event.target;
      const selectorInfo = selectorInfoOverride || getSelectorForAssertion(currentAssertElement);
      
      console.log('🎯 Menu de asserção aberto para elemento:', {
        element: currentAssertElement,
        selectorInfo: selectorInfo
      });
      
      // Cria o menu de asserções
      assertMenu = document.createElement('div');
      assertMenu.id = 'cypress-assertion-menu';
      assertMenu.className = 'cypress-assertion-menu';
      assertMenu.style.position = 'fixed';
      assertMenu.style.background = '#fff';
      assertMenu.style.border = `2px solid ${blue}`;
      assertMenu.style.borderRadius = '8px';
      assertMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      assertMenu.style.zIndex = '1000001';
      assertMenu.style.padding = '8px';
      assertMenu.style.fontFamily = "'Roboto', Arial, sans-serif";
      assertMenu.style.fontSize = '13px';
      assertMenu.style.minWidth = '200px';
      
      // Posiciona o menu próximo ao cursor
      assertMenu.style.left = Math.min(event.clientX, window.innerWidth - 220) + 'px';
      assertMenu.style.top = Math.min(event.clientY, window.innerHeight - 300) + 'px';
      
      // Título do menu
      const title = document.createElement('div');
      title.textContent = '🔍 Adicionar Asserção';
      title.style.fontWeight = 'bold';
      title.style.color = blue;
      title.style.marginBottom = '4px';
      title.style.padding = '4px 0';
      assertMenu.appendChild(title);
      
      // Mostra o elemento selecionado
      const elementInfo = document.createElement('div');
      elementInfo.style.fontSize = '11px';
      elementInfo.style.color = '#666';
      elementInfo.style.padding = '6px 8px';
      elementInfo.style.borderBottom = `1px solid #eee`;
      elementInfo.style.marginBottom = '8px';
      elementInfo.style.wordBreak = 'break-all';
      elementInfo.style.background = '#f8f9fa';
      elementInfo.style.borderRadius = '4px';
      
      // Determina a cor da qualidade do seletor
      let qualityColor = '#E53935'; // Vermelho (baixa qualidade)
      let qualityText = 'Baixa';
      if (selectorInfo.score >= 80) {
        qualityColor = '#4CAF50'; // Verde (alta qualidade)
        qualityText = 'Alta';
      } else if (selectorInfo.score >= 60) {
        qualityColor = '#FF9800'; // Laranja (média qualidade)
        qualityText = 'Média';
      }
      
      if (selectorInfo.useContains) {
        elementInfo.innerHTML = `
          <div style="font-weight: bold; color: ${blue};">🎯 Elemento Selecionado:</div>
          <div style="margin-top: 2px;">📝 Texto: "${selectorInfo.containsText}"</div>
          <div style="margin-top: 2px; font-style: italic;">Código: cy.contains('${selectorInfo.containsText}')</div>
          <div style="margin-top: 4px; padding: 2px 6px; background: ${qualityColor}; color: white; border-radius: 3px; display: inline-block; font-size: 10px;">
            🧠 Qualidade: ${qualityText} (${selectorInfo.score}/100)
          </div>
          <div style="margin-top: 2px; font-size: 10px; color: #888;">💡 ${selectorInfo.reason}</div>
        `;
      } else {
        elementInfo.innerHTML = `
          <div style="font-weight: bold; color: ${blue};">🎯 Elemento Selecionado:</div>
          <div style="margin-top: 2px;">🔍 Seletor: ${selectorInfo.selector}</div>
          <div style="margin-top: 2px; font-style: italic;">Código: cy.get('${selectorInfo.selector}')</div>
          <div style="margin-top: 4px; padding: 2px 6px; background: ${qualityColor}; color: white; border-radius: 3px; display: inline-block; font-size: 10px;">
            🧠 Qualidade: ${qualityText} (${selectorInfo.score}/100)
          </div>
          <div style="margin-top: 2px; font-size: 10px; color: #888;">💡 ${selectorInfo.reason}</div>
        `;
      }
      
      assertMenu.appendChild(elementInfo);
      
      // Botão para ver alternativas de seletores
      const alternativesBtn = document.createElement('div');
      alternativesBtn.innerHTML = '🔍 Ver alternativas de seletor';
      alternativesBtn.style.padding = '6px 12px';
      alternativesBtn.style.cursor = 'pointer';
      alternativesBtn.style.borderRadius = '4px';
      alternativesBtn.style.margin = '4px 0';
      alternativesBtn.style.transition = 'background 0.2s';
      alternativesBtn.style.fontSize = '12px';
      alternativesBtn.style.color = blue;
      alternativesBtn.style.border = `1px solid ${blue}`;
      alternativesBtn.style.textAlign = 'center';
      
      alternativesBtn.addEventListener('mouseenter', () => {
        alternativesBtn.style.background = '#f0f0f0';
      });
      
      alternativesBtn.addEventListener('mouseleave', () => {
        alternativesBtn.style.background = 'transparent';
      });
      
      alternativesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSelectorAlternatives(currentAssertElement, event);
      });
      
      assertMenu.appendChild(alternativesBtn);
      
      // Separador
      const separator = document.createElement('div');
      separator.textContent = '─────────────────────';
      separator.style.padding = '4px 0';
      separator.style.textAlign = 'center';
      separator.style.color = '#ccc';
      separator.style.fontSize = '10px';
      separator.style.cursor = 'default';
      separator.style.userSelect = 'none';
      assertMenu.appendChild(separator);
      
      // Opções de asserção
      const assertOptions = [
        // Opções básicas
        { text: '👁️ Deve estar visível', type: 'be.visible' },
        { text: '✅ Deve existir', type: 'exist' },
        { text: '❌ Não deve existir', type: 'not.exist' },
        { text: '🚫 Deve estar desabilitado', type: 'be.disabled' },
        { text: '✅ Deve estar habilitado', type: 'be.enabled' },
        // Separador
        { text: '─────────────────────', type: 'separator' },
        // Opções avançadas
        { text: '📝 Deve ter texto exato', type: 'have.text', needsValue: true },
        { text: '🔍 Deve conter texto', type: 'contain.text', needsValue: true },
        { text: '🔗 Deve ter valor', type: 'have.value', needsValue: true },
      ];
      
      assertOptions.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option.text;
        
        if (option.type === 'separator') {
          // Estilo para separador
          optionDiv.style.padding = '4px 0';
          optionDiv.style.textAlign = 'center';
          optionDiv.style.color = '#ccc';
          optionDiv.style.fontSize = '10px';
          optionDiv.style.cursor = 'default';
          optionDiv.style.userSelect = 'none';
        } else {
          // Estilo para opções normais
          optionDiv.style.padding = '8px 12px';
          optionDiv.style.cursor = 'pointer';
          optionDiv.style.borderRadius = '4px';
          optionDiv.style.margin = '2px 0';
          optionDiv.style.transition = 'background 0.2s';
          
          optionDiv.addEventListener('mouseenter', () => {
            optionDiv.style.background = '#f0f0f0';
          });
          
          optionDiv.addEventListener('mouseleave', () => {
            optionDiv.style.background = 'transparent';
          });
          
          optionDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            handleAssertionClick(option, selectorInfo);
          });
        }
        
        assertMenu.appendChild(optionDiv);
      });
      
      // Adiciona o menu ao corpo da página para medir suas dimensões
      assertMenu.style.visibility = 'hidden';
      document.body.appendChild(assertMenu);
      
      const menuWidth = assertMenu.offsetWidth;
      const menuHeight = assertMenu.offsetHeight;
      
      // Calcula a posição para garantir que o menu fique dentro da tela
      let left = event.clientX;
      if (left + menuWidth > window.innerWidth - 10) {
        left = window.innerWidth - menuWidth - 10;
      }
      
      let top = event.clientY;
      if (top + menuHeight > window.innerHeight - 10) {
        top = window.innerHeight - menuHeight - 10;
      }
      
      // Garante que não saia da tela pela esquerda ou topo
      left = Math.max(10, left);
      top = Math.max(10, top);

      // Aplica a posição calculada e torna o menu visível
      assertMenu.style.left = `${left}px`;
      assertMenu.style.top = `${top}px`;
      assertMenu.style.visibility = 'visible';
      
      // Remove o menu ao clicar fora
      if (closeMenuTimeout) {
        clearTimeout(closeMenuTimeout);
      }
      closeMenuTimeout = setTimeout(() => {
        document.addEventListener('click', () => closeAssertMenu(true), { once: true });
      }, 100);
    }
    
    // Função para fechar o menu de asserções
    function closeAssertMenu(clearElement = false) {
      if (closeMenuTimeout) {
        clearTimeout(closeMenuTimeout);
        closeMenuTimeout = null;
      }

      if (assertMenu) {
        assertMenu.remove();
        assertMenu = null;
        if (clearElement) {
          currentAssertElement = null;
        }
      }
    }
    
    // Função para mostrar alternativas de seletores
    function showSelectorAlternatives(element, originalEvent) {
      // Fecha o menu atual
      closeAssertMenu();
      
      // Gera todas as alternativas de seletores
      const uniqueCandidates = getSelectorForAssertion(element, true);
      
      // Cria o modal de alternativas
      const modal = document.createElement('div');
      modal.id = 'selector-alternatives-modal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.background = 'rgba(0,0,0,0.5)';
      modal.style.zIndex = '1000002';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      
      const modalContent = document.createElement('div');
      modalContent.style.background = '#fff';
      modalContent.style.borderRadius = '8px';
      modalContent.style.padding = '20px';
      modalContent.style.maxWidth = '600px';
      modalContent.style.maxHeight = '80vh';
      modalContent.style.overflowY = 'auto';
      modalContent.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      
      // Título
      const title = document.createElement('h3');
      title.textContent = '🧠 Alternativas de Seletor';
      title.style.color = blue;
      title.style.marginBottom = '15px';
      title.style.fontFamily = "'Roboto', Arial, sans-serif";
      modalContent.appendChild(title);
      
      // Lista de alternativas
      uniqueCandidates.forEach((candidate, index) => {
        const candidateDiv = document.createElement('div');
        candidateDiv.style.border = '1px solid #ddd';
        candidateDiv.style.borderRadius = '6px';
        candidateDiv.style.padding = '12px';
        candidateDiv.style.marginBottom = '8px';
        candidateDiv.style.cursor = 'pointer';
        candidateDiv.style.transition = 'all 0.2s';
        
        // Cor baseada na pontuação
        let qualityColor = '#E53935';
        if (candidate.score >= 80) {
          qualityColor = '#4CAF50';
        } else if (candidate.score >= 60) {
          qualityColor = '#FF9800';
        }
        
        candidateDiv.style.borderLeft = `4px solid ${qualityColor}`;
        
        candidateDiv.addEventListener('mouseenter', () => {
          candidateDiv.style.background = '#f8f9fa';
        });
        
        candidateDiv.addEventListener('mouseleave', () => {
          candidateDiv.style.background = 'transparent';
        });
        
        candidateDiv.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Atualiza o seletor atual e reabre o menu de asserções
          const chosenSelectorInfo = candidate;
          modal.remove();

          const newEvent = {
            preventDefault: () => {},
            stopPropagation: () => {},
            clientX: originalEvent.clientX,
            clientY: originalEvent.clientY,
            target: element
          };
          
          showAssertMenu(newEvent, chosenSelectorInfo);
        });
        
        // Conteúdo do candidato
        const selectorText = candidate.useContains 
          ? `cy.contains('${candidate.containsText}')`
          : `cy.get('${candidate.selector}')`;
        
        candidateDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: bold; font-family: monospace; font-size: 13px;">${selectorText}</div>
            <div style="padding: 2px 6px; background: ${qualityColor}; color: white; border-radius: 3px; font-size: 11px;">
              ${candidate.score}/100
            </div>
          </div>
          <div style="font-size: 12px; color: #666;">${candidate.reason}</div>
        `;
        
        modalContent.appendChild(candidateDiv);
      });
      
      // Botão fechar
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Fechar';
      closeBtn.style.marginTop = '15px';
      closeBtn.style.padding = '8px 16px';
      closeBtn.style.background = blue;
      closeBtn.style.color = '#fff';
      closeBtn.style.border = 'none';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.fontFamily = "'Roboto', Arial, sans-serif";
      
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });
      
      modalContent.appendChild(closeBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      // Fecha ao clicar fora
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    }
    
    // Função para lidar com clique nas opções de asserção
    function handleAssertionClick(option, selectorInfo) {
      const targetElement = currentAssertElement; // Salva o elemento para o highlight

      // Fecha o menu para evitar conflitos
      closeAssertMenu();
  
      const performAssertion = (assertData) => {
        const finalAction = {
          actionType: 'assert',
          selector: selectorInfo.selector,
          useContains: selectorInfo.useContains,
          containsText: selectorInfo.containsText,
          assertType: option.type,
          attrName: assertData.attrName || null,
          expectedValue: assertData.expectedValue || ''
        };
  
        console.log('➕ Adicionando asserção:', finalAction);
          
        actions.push(finalAction);
        updateOutput();
        validateGeneratedCode();
        highlightElement(targetElement, 'asserção adicionada!');
      };
  
      if (option.needsAttr) {
        // Caso especial para atributos
        const attrName = prompt('Digite o nome do atributo (ex: id, href, data-test):');
        if (attrName !== null && attrName.trim()) {
          const attrValue = prompt(`Digite o valor esperado para o atributo "${attrName}":`, 
            targetElement.getAttribute(attrName) || '');
          if (attrValue !== null) {
            performAssertion({ attrName: attrName.trim(), expectedValue: attrValue });
          }
        }
      } else if (option.needsValue) {
        // Opções que precisam de um valor
        let defaultValue = '';
        if (option.type === 'have.text') {
          defaultValue = targetElement.textContent?.trim() || '';
        } else if (option.type === 'contain.text') {
          const fullText = targetElement.textContent?.trim() || '';
          defaultValue = fullText.length > 20 ? fullText.substring(0, 20) + '...' : fullText;
        } else if (option.type === 'have.class') {
          defaultValue = targetElement.className?.split(' ')[0] || '';
        } else if (option.type === 'have.value') {
          defaultValue = targetElement.value || targetElement.getAttribute('value') || '';
        }
          
        const value = prompt(`Digite o valor esperado para "${option.text}":`, defaultValue);
        if (value !== null) {
          performAssertion({ expectedValue: value });
        }
      } else {
        // Asserções simples que não precisam de valor (ex: 'be.visible')
        performAssertion({});
      }
    }
    
    // Função para atualizar a lista de passos
    function updateStepsList() {
      stepsList.innerHTML = '';
      if (actions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhuma ação realizada.';
        li.style.color = blue;
        stepsList.appendChild(li);
        return;
      }
      actions.forEach((action, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '4px';
        let icon = '';
        let desc = '';
        if (action.actionType === 'click') {
          icon = `🖱️`;
          desc = action.useContains ? `Click em "${action.containsText}"` : `Click em ${action.selector}`;
        } else if (action.actionType === 'input') {
          icon = `⌨️`;
          desc = action.useContains ? `Input em "${action.containsText}"` : `Input em ${action.selector}`;
          desc += `: "${action.value}"`;
        } else if (action.actionType === 'assert') {
          icon = `🔍`;
          const target = action.useContains ? `"${action.containsText}"` : action.selector;
          desc = `Assert ${target}: ${action.assertType}`;
          if (action.attrName) {
            desc += ` [${action.attrName}]`;
          }
          if (action.expectedValue) {
            desc += ` = "${action.expectedValue}"`;
          }
        }
        li.innerHTML = `<span style="font-size:18px;margin-right:8px;color:${rose}">${icon}</span> <span style="color:${blue}">${desc}</span>`;
        stepsList.appendChild(li);
      });
    }
  
    // Função para atualizar o conteúdo da área de texto e lista de passos
    function updateOutput() {
      textarea.value = generateCypressCode(actions) || '// Nenhuma código gerado.';
      updateStepsList();
      btnDownload.disabled = actions.length === 0 || isRecording;
    }
  
    // Adiciona listener de clique para gravar ações
    document.addEventListener('click', recordClick, { capture: true });

    // Adiciona listener de clique direito para mostrar o menu de asserções
    document.addEventListener('contextmenu', (event) => {
      // Ignora cliques dentro da UI da extensão para permitir o menu de contexto padrão
      const path = event.composedPath();
      const isClickOnPanel = path.some(el =>
        el.id === 'cypress-recorder-panel' ||
        el.id === 'cypress-assertion-menu' ||
        el.id === 'selector-alternatives-modal'
      );

      if (!isClickOnPanel) {
        showAssertMenu(event);
      }
    }, { capture: true });

    // Função para gravar um clique
    function recordClick(event) {
      if (!isRecording) return;
      
      // Ignora cliques dentro do painel, menu de asserção ou modal de alternativas
      // usando o caminho do evento para ser robusto contra race conditions.
      const path = event.composedPath();
      const isClickOnPanel = path.some(el => el.id === 'cypress-recorder-panel');
      const isClickOnAssertMenu = path.some(el => el.id === 'cypress-assertion-menu');
      const isClickOnAlternativesModal = path.some(el => el.id === 'selector-alternatives-modal');

      if (isClickOnPanel || isClickOnAssertMenu || isClickOnAlternativesModal) {
        return;
      }
      
      const selectorInfo = getSelector(event.target);
      const newAction = {
        actionType: 'click',
        selector: selectorInfo.selector,
        useContains: selectorInfo.useContains,
        containsText: selectorInfo.containsText
      };
      
      console.log('🖱️ Click gravado:', newAction);
      
      actions.push(newAction);
      updateOutput();
    }
    
    // Função para gravar um input
    function recordInput(event) {
      // Ignora inputs dentro do nosso painel
      if (panel.contains(event.target)) {
        return;
      }
      
      if (!isRecording) return;
      
      const selectorInfo = getSelector(event.target);
      const value = event.target.value;
      
      // Remove a última ação se for um input no mesmo elemento
      const lastAction = actions[actions.length - 1];
      if (lastAction && lastAction.actionType === 'input' && lastAction.selector === selectorInfo.selector) {
        actions.pop();
      }
      
      actions.push({
        actionType: 'input',
        selector: selectorInfo.selector,
        value: value,
        useContains: selectorInfo.useContains,
        containsText: selectorInfo.containsText
      });
      updateOutput();
    }
  
    // Função para reiniciar gravação
    function restartRecording() {
      actions = [];
      updateOutput();
      // Mantém a gravação ativa
    }
  
    // Atualizar botões conforme status
    function updateRecordingButtons() {
      if (isRecording) {
        btnStartStop.textContent = 'Parar Gravação';
        btnStartStop.style.background = red;
        btnStartStop.style.color = '#fff';
        btnStartStop.style.boxShadow = '0 2px 8px #E5393533';
        btnRestart.style.display = '';
        btnRestart.style.background = blue;
        btnRestart.style.color = '#fff';
      } else {
        btnStartStop.textContent = 'Iniciar Gravação';
        btnStartStop.style.background = green;
        btnStartStop.style.color = '#fff';
        btnStartStop.style.boxShadow = 'none';
        btnRestart.style.display = 'none';
        
        // Foca no campo de nome do arquivo quando parar a gravação
        if (actions.length > 0) {
          setTimeout(() => {
            filenameInput.focus();
          }, 100);
        }
      }
    }
  
    // Função para iniciar/parar gravação
    function toggleRecording() {
      if (!isRecording) {
        actions = [];
        isRecording = true;
        document.addEventListener('click', recordClick, true);
        document.addEventListener('input', recordInput, true);
        document.addEventListener('contextmenu', recordClick, true);
      } else {
        isRecording = false;
        document.removeEventListener('click', recordClick, true);
        document.removeEventListener('input', recordInput, true);
        document.removeEventListener('contextmenu', recordClick, true);
        // Fecha menu de asserção se estiver aberto
        closeAssertMenu(true);
      }
      updateRecordingButtons();
      updateOutput();
    }
  
    // Função para baixar o código gerado como arquivo
    function downloadCode() {
      const code = textarea.value;
      
      // Verifica se há código para baixar
      if (!code || code.trim() === '' || code.includes('// Nenhuma código gerado.')) {
        alert('Não há código para exportar. Faça uma gravação primeiro!');
        return;
      }
      
      // Obtém o nome do arquivo definido pelo usuário
      const userFilename = filenameInput.value.trim();
      
      // Define o nome do arquivo: usa o input do usuário ou um nome padrão
      let filename = userFilename || 'cypress-tests';
      
      // Remove caracteres inválidos para nomes de arquivo
      filename = filename.replace(/[<>:"/\\|?*]/g, '-');
      
      // Remove a extensão .js se o usuário digitou (para evitar duplicar)
      if (filename.endsWith('.js')) {
        filename = filename.slice(0, -3);
      }
      
      // Adiciona a extensão .js
      filename += '.js';
      
      const blob = new Blob([code], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      // Feedback visual de sucesso
      const originalText = btnDownload.textContent;
      btnDownload.textContent = '✅ Baixado com sucesso!';
      btnDownload.style.background = green;
      
      setTimeout(() => {
        btnDownload.textContent = originalText;
        btnDownload.style.background = blue;
      }, 2000);
    }
  
    // Função para maximizar/restaurar painel
    function toggleMaximize() {
      const resizeHandles = panel.querySelectorAll('.resize-handle');
      
      if (isMaximized) {
        // Restaurar tamanho original
        panel.style.width = originalSize.width + 'px';
        panel.style.height = originalSize.height + 'px';
        panel.style.left = originalSize.left || '';
        panel.style.top = originalSize.top || '';
        panel.style.right = originalSize.right || '';
        panel.style.bottom = originalSize.bottom || '';
        btnToggleSize.textContent = '⬜';
        btnToggleSize.title = 'Maximizar';
        isMaximized = false;
        
        // Reativa redimensionamento
        panel.style.resize = 'both';
        resizeHandles.forEach(handle => {
          handle.style.display = 'block';
        });
      } else {
        // Salvar tamanho atual
        const rect = panel.getBoundingClientRect();
        originalSize = {
          width: rect.width,
          height: rect.height,
          left: panel.style.left || null,
          top: panel.style.top || null,
          right: panel.style.right || null,
          bottom: panel.style.bottom || null
        };
        
        // Maximizar
        panel.style.left = '5px';
        panel.style.top = '5px';
        panel.style.right = '5px';
        panel.style.bottom = '5px';
        panel.style.width = 'auto';
        panel.style.height = 'auto';
        btnToggleSize.textContent = '⬌';
        btnToggleSize.title = 'Restaurar';
        isMaximized = true;
        
        // Desativa redimensionamento quando maximizado
        panel.style.resize = 'none';
        resizeHandles.forEach(handle => {
          handle.style.display = 'none';
        });
      }
      
      console.log('🔄 Painel ' + (isMaximized ? 'maximizado' : 'restaurado'));
    }
    
    // Associa funções aos eventos dos botões
    btnStartStop.onclick = toggleRecording;
    btnDownload.onclick = downloadCode;
    btnToggleSize.onclick = toggleMaximize;
    btnClose.onclick = () => {
      isRecording = false;
      document.removeEventListener('click', recordClick, true);
      document.removeEventListener('input', recordInput, true);
      panel.remove(); // Remove o painel da página
      window.cypressRecorderPanelInjected = false; // Permite nova injeção
    };
    btnRestart.onclick = restartRecording;
  
    // Inicializa a interface
    updateOutput();
    updateRecordingButtons();
  }
  