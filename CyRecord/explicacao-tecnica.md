# Explicação Técnica - Injeção de Scripts e Conversão para Cypress

Este documento explica detalhadamente como funciona a injeção de scripts e a conversão para código Cypress no projeto Artur QA.

---

## 1. Processo de Injeção de Scripts

### Passo 1: Background Script (background.js)

```javascript
// Este listener é acionado quando o ícone da extensão é clicado na barra do navegador
chrome.action.onClicked.addListener((tab) => {
  // Injeta o script 'injectPanel.js' na aba atual
  chrome.scripting.executeScript({
    target: { tabId: tab.id }, // Define a aba de destino como a aba clicada
    files: ['injectPanel.js'] // Especifica o arquivo de script a ser injetado
  });
});
```

**O que acontece:**
1. Usuário clica no ícone da extensão
2. O `background.js` detecta o clique
3. Usa a API `chrome.scripting.executeScript()` para injetar o `injectPanel.js` na página atual
4. O Chrome executa o script injetado no contexto da página web

### Passo 2: Painel Flutuante (injectPanel.js)

```javascript
// Verifica se o painel já foi injetado para evitar duplicação
if (!window.cypressRecorderPanelInjected) {
    window.cypressRecorderPanelInjected = true;
    
    // Cria o elemento principal do painel
    const panel = document.createElement('div');
    // ... configuração do painel ...
    
    // Adiciona o painel ao corpo da página
    document.body.appendChild(panel);
}
```

**O que acontece:**
1. O script verifica se já foi injetado (evita duplicação)
2. Cria um painel HTML dinamicamente
3. Adiciona o painel ao DOM da página
4. Configura event listeners para os botões

### Passo 3: Content Script (content.js)

```javascript
// Listener para capturar eventos de clique em qualquer elemento da página
document.addEventListener('click', function (event) {
  // Gera um seletor único para o elemento clicado
  const selector = getSelector(event.target);
  // Registra a ação de clique
  recordAction('click', selector);
}, true); // true = captura na fase de captura (bubble)

// Listener para capturar eventos de input em campos de texto
document.addEventListener('input', function (event) {
  // Gera um seletor único para o elemento de input
  const selector = getSelector(event.target);
  // Obtém o valor digitado no campo
  const value = event.target.value;
  // Registra a ação de input com o valor
  recordAction('input', selector, value);
}, true);
```

**O que acontece:**
1. O content script é injetado na página
2. Adiciona listeners globais para eventos de `click` e `input`
3. Captura todas as interações do usuário
4. Chama `recordAction()` para cada ação capturada

---

## 2. Processo de Conversão para Código Cypress

### Passo 1: Geração de Seletores (getSelector)

```javascript
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
  if (text && text.length > 0 && text.length < 50 && (!element.className || (typeof element.className === 'string' && !element.className.trim()))) {
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
```

**Exemplos de conversão:**
- Elemento com data-cy: `<button data-cy="submit-button">` → `[data-cy="submit-button"]`
- Elemento com ID: `<button id="submit">` → `#submit`
- Elemento com name: `<input name="email">` → `[name="email"]`
- Elemento com texto: `<button>Login</button>` → `cy.contains('Login')`
- Elemento com classes: `<div class="btn primary">` → `.btn.primary`
- Elemento simples: `<span>` → `span`

**Lógica para usar `contains`:**
- Elemento tem texto visível (textContent)
- Texto tem entre 1 e 50 caracteres
- Elemento não tem classes CSS específicas
- Não tem data-cy, id ou name
- **Robustez:** Agora o código só usa `.trim()` se `className` for string, evitando erros em SVGs ou elementos especiais.

### Passo 2: Registro de Ações (recordAction)

```javascript
// Função para registrar uma ação do usuário (clique ou input)
function recordAction(actionType, selector, value = '', useContains = false, containsText = '') {
  // Se não estiver gravando, ignora a ação
  if (!isRecording) return;
  // Adiciona a ação ao array de ações
  actions.push({ actionType, selector, value, useContains, containsText });
  // Gera o código Cypress baseado nas ações gravadas
  const code = generateCypressCode(actions);
  // Envia o código atualizado para o popup da extensão
  chrome.runtime.sendMessage({ type: "updateCode", code });
}
```

**O que acontece:**
1. Verifica se a gravação está ativa
2. Armazena a ação no array `actions`
3. Chama `generateCypressCode()` para converter
4. Envia o código atualizado via mensagem

### Passo 3: Conversão para Cypress (generateCypressCode)

```javascript
// Função para converter as ações gravadas em código Cypress
function generateCypressCode(actions) {
  return actions.map(action => {
    // Gera código Cypress para ação de clique
    if (action.actionType === 'click') {
      if (action.useContains) {
        return `cy.contains('${action.containsText}').click();`;
      } else {
        return `cy.get('${action.selector}').click();`;
      }
    } 
    // Gera código Cypress para ação de input
    else if (action.actionType === 'input') {
      if (action.useContains) {
        return `cy.contains('${action.containsText}').type('${action.value}');`;
      } else {
        return `cy.get('${action.selector}').type('${action.value}');`;
      }
    }
    return '';
  }).join('\n'); // Junta todas as linhas com quebra de linha
}
```

**Exemplos de conversão:**

**Ação do usuário:**
1. Clica no botão com ID "login"
2. Digita "usuario@email.com" no campo com name "email"
3. Clica no botão com texto "Entrar"
4. Digita "senha123" no campo com name "password"

**Código Cypress gerado:**
```javascript
cy.get('#login').click();
cy.get('[name="email"]').type('usuario@email.com');
cy.contains('Entrar').click();
cy.get('[name="password"]').type('senha123');
```

---

## 3. Fluxo Completo

1. **Injeção**: Background script injeta o painel na página
2. **Captura**: Content script monitora eventos do usuário
3. **Seleção**: Cada elemento é convertido em um seletor CSS
4. **Armazenamento**: Ações são guardadas em um array
5. **Conversão**: Array é transformado em comandos Cypress
6. **Exibição**: Código é mostrado no painel em tempo real
7. **Download**: Usuário pode baixar o arquivo final
8. **Limpeza**: Ao exportar, a tela é limpa automaticamente

---

## 4. Vantagens desta Abordagem

- **Tempo real**: O código é gerado conforme o usuário interage
- **Seletores inteligentes**: Prioriza data-cy, IDs, names, texto, classes
- **Flexibilidade**: Funciona em qualquer site
- **Simplicidade**: Interface amigável para não-programadores
- **Acessibilidade**: Tooltip customizado, botões com contraste e feedback visual
- **Fluxo de gravação aprimorado**: Botões de iniciar, parar e reiniciar gravação

---

## 5. Arquitetura da Extensão

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Background    │    │   Content       │    │   Inject Panel  │
│     Script      │    │     Script      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Injetar Panel  │    │  Capturar       │    │  Interface      │
│  na Página      │    │  Eventos        │    │  do Usuário     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │  Gerar Código Cypress   │
                    │  e Exibir no Painel     │
                    └─────────────────────────┘
```

---

## 6. Detalhes Técnicos Importantes

### Comunicação entre Scripts
- **Background ↔ Content**: Via `chrome.scripting.executeScript()`
- **Content ↔ Panel**: Via `chrome.runtime.sendMessage()`
- **Panel ↔ Background**: Via `chrome.runtime.onMessage`

### Contextos de Execução
- **Background**: Executa em contexto da extensão
- **Content**: Executa no contexto da página web
- **Panel**: Executa no contexto da página web (injetado)

### Permissões Necessárias
- `scripting`: Para injetar scripts
- `activeTab`: Para acessar a aba ativa
- `tabs`: Para comunicação entre abas
- `<all_urls>`: Para funcionar em qualquer site

---

## 7. Popup (popup.js)

O arquivo `popup.js` implementa uma interface alternativa para iniciar/parar gravação e exportar código Cypress, usando um popup tradicional de extensão Chrome.

- **Botão Iniciar Gravação:** Injeta o content.js e envia mensagem para começar a gravar.
- **Botão Parar Gravação:** Solicita o código Cypress gerado e exibe no textarea.
- **Botão Baixar Código:** Permite baixar o código gerado como arquivo .js.
- **Comentários detalhados** foram adicionados linha a linha para facilitar o entendimento.

---

## 8. Exportação e Limpeza

- Ao clicar em "Exportar Código Cypress" no painel, todas as ações e o código são limpos automaticamente, preparando para uma nova gravação.
- O botão de exportação só fica habilitado quando a gravação está parada e há ações gravadas.

---

Esta arquitetura permite que qualquer pessoa, mesmo sem conhecimento técnico, gere testes automatizados profissionais apenas navegando normalmente pelo site! 