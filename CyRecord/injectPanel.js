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
  
    // Cria o botão "Fechar" painel
    const btnClose = document.createElement('button');
    btnClose.textContent = '×'; // Símbolo X
    btnClose.style.fontSize = '22px';
    btnClose.style.background = 'transparent';
    btnClose.style.color = blue;
    btnClose.style.border = 'none';
    btnClose.style.cursor = 'pointer';
    btnClose.style.marginLeft = '10px';
    btnClose.style.fontFamily = "'Roboto', Arial, sans-serif";
    header.appendChild(btnClose);
  
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
    btnDownload.style.marginTop = '4px';
    btnDownload.style.fontFamily = "'Roboto', Arial, sans-serif";
    btnDownload.disabled = true;
    exportDiv.appendChild(btnDownload);
    panel.appendChild(exportDiv);
  
    // Adiciona o painel ao corpo da página
    document.body.appendChild(panel);
  
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
      
      // Verifica se deve usar contains baseado no texto do elemento
      const text = element.textContent?.trim();
      if (text && text.length > 0 && text.length < 50 && !element.className) {
        // Se tem texto visível e não tem classes específicas, usa contains
        return {
          selector: '',
          useContains: true,
          containsText: text
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
      }).join('\n'); // Junta todas as linhas com quebra de linha
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
  
    // Função para registrar cliques do usuário
    function recordClick(event) {
      if (!isRecording) return; // Se não estiver gravando, ignora
      const selectorInfo = getSelector(event.target);
      actions.push({ 
        actionType: 'click', 
        selector: selectorInfo.selector,
        useContains: selectorInfo.useContains,
        containsText: selectorInfo.containsText
      });
      updateOutput(); // Atualiza a exibição do código
    }
  
    // Função para registrar inputs do usuário
    function recordInput(event) {
      if (!isRecording) return; // Se não estiver gravando, ignora
  
      const selectorInfo = getSelector(event.target);
      const value = event.target.value;
  
      // Se for o mesmo campo de input, atualiza o valor em vez de criar nova ação
      if (lastInputSelector === selectorInfo.selector) {
        clearTimeout(inputTimeout);
        // Remove o input anterior desse seletor
        actions = actions.filter(a => !(a.actionType === 'input' && a.selector === selectorInfo.selector));
        // Adiciona o novo input atualizado
        actions.push({ 
          actionType: 'input', 
          selector: selectorInfo.selector, 
          value,
          useContains: selectorInfo.useContains,
          containsText: selectorInfo.containsText
        });
        updateOutput();
      } else {
        // Novo campo de input
        lastInputSelector = selectorInfo.selector;
        actions.push({ 
          actionType: 'input', 
          selector: selectorInfo.selector, 
          value,
          useContains: selectorInfo.useContains,
          containsText: selectorInfo.containsText
        });
        updateOutput();
      }
  
      // Reseta o timeout para agrupar inputs consecutivos
      clearTimeout(inputTimeout);
      inputTimeout = setTimeout(() => {
        lastInputSelector = null;
      }, 500); // 500ms de delay
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
      }
    }
  
    // Função para iniciar/parar gravação
    function toggleRecording() {
      if (!isRecording) {
        actions = [];
        isRecording = true;
        document.addEventListener('click', recordClick, true);
        document.addEventListener('input', recordInput, true);
      } else {
        isRecording = false;
        document.removeEventListener('click', recordClick, true);
        document.removeEventListener('input', recordInput, true);
      }
      updateRecordingButtons();
      updateOutput();
    }
  
    // Função para baixar o código gerado como arquivo
    function downloadCode() {
      const code = textarea.value;
      const blob = new Blob([code], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cypress-tests.js';
      a.click();
      URL.revokeObjectURL(url);
      // Limpa a janela após exportar
      actions = [];
      updateOutput();
      btnDownload.disabled = true;
    }
  
    // Associa funções aos eventos dos botões
    btnStartStop.onclick = toggleRecording;
    btnDownload.onclick = downloadCode;
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
  