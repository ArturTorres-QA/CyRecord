# CyRecord - Documentação Técnica

## Visão Geral

O CyRecord é uma extensão para o Google Chrome que grava automaticamente as ações do usuário em uma página web e gera comandos Cypress prontos para uso em testes automatizados.

## Funcionalidades Principais

### 1. Gravação Automática
- **Cliques**: Captura cliques em qualquer elemento da página
- **Inputs**: Registra digitação em campos de texto
- **Asserções**: Permite adicionar verificações através do botão direito

### 2. Sistema de Seletores Inteligente (Baseado em Regras)

O CyRecord implementa um sistema inteligente para escolher o melhor seletor possível para cada elemento. O sistema funciona através de um algoritmo de pontuação que avalia múltiplos fatores usando regras predefinidas:

#### Critérios de Avaliação (em ordem de prioridade):

1. **data-cy (100 pontos)** - Melhor prática para testes
2. **ID (95 pontos)** - Identificador único
3. **Atributos de teste (90 pontos)** - data-testid, data-test, data-automation, data-qa
4. **Atributo name (85 pontos)** - Importante para formulários
5. **Classes CSS específicas (80/60 pontos)** - Classes não genéricas
6. **Atributos de formulário (75/55 pontos)** - type, role, placeholder, title, alt
7. **Seletor hierárquico (70-65/45-40 pontos)** - Posição relativa ao pai
8. **Texto único (60/35 pontos)** - Para elementos pequenos
9. **Combinação de atributos (55/30 pontos)** - Múltiplos atributos
10. **Apenas tag (40/10 pontos)** - Último recurso

#### Fatores de Qualidade:
- **Unicidade**: Seletor que encontra apenas 1 elemento recebe pontuação máxima
- **Especificidade**: Seletores mais específicos são preferidos
- **Estabilidade**: Seletores menos propensos a quebrar com mudanças no código

### 3. Menu de Asserções Avançado

Quando o usuário clica com o botão direito para adicionar uma asserção, o sistema:

1. **Analisa o elemento** usando o algoritmo de pontuação
2. **Mostra a qualidade do seletor** com pontuação visual (0-100)
3. **Explica a escolha** com detalhes sobre por que aquele seletor foi selecionado
4. **Permite ver alternativas** através do botão "Ver alternativas de seletor"

#### Tipos de Asserções Suportadas:
- **Básicas**: visível, existir, não existir, habilitado, desabilitado
- **Avançadas**: texto exato, conter texto, classe CSS, valor, atributo

### 4. Modal de Alternativas de Seletor

O botão "Ver alternativas de seletor" abre um modal que mostra:

- **Todas as opções disponíveis** para o elemento
- **Pontuação de cada alternativa** (0-100)
- **Código Cypress gerado** para cada opção
- **Explicação detalhada** de cada seletor
- **Cores indicativas**: Verde (alta qualidade), Laranja (média), Vermelho (baixa)

## Arquitetura Técnica

### Estrutura de Arquivos:
```
CyRecord/
├── manifest.json          # Configuração da extensão
├── popup.html            # Interface do popup
├── popup.js              # Lógica do popup
├── content.js            # Script injetado na página
├── injectPanel.js        # Painel flutuante com sistema de seletores
├── background.js         # Script de background
└── icons/                # Ícones da extensão
```

### Fluxo de Funcionamento:

1. **Inicialização**: O `injectPanel.js` é injetado na página
2. **Gravação**: Event listeners capturam cliques e inputs
3. **Seletores**: `getSelectorForAssertion()` analisa elementos usando regras
4. **Menu Contextual**: Botão direito abre menu de asserções
5. **Alternativas**: Modal mostra opções de seletores
6. **Geração**: `generateCypressCode()` cria código final

### Algoritmo de Seletores (Baseado em Regras):

```javascript
function getSelectorForAssertion(element) {
  const selectorCandidates = [];
  
  // 1. Verifica data-cy (melhor prática)
  if (element.getAttribute('data-cy')) {
    selectorCandidates.push({
      selector: `[data-cy="${element.getAttribute('data-cy')}"]`,
      score: 100,
      reason: 'data-cy (melhor prática para testes)'
    });
  }
  
  // 2. Verifica ID
  if (element.id) {
    selectorCandidates.push({
      selector: `#${element.id}`,
      score: 95,
      reason: 'ID único'
    });
  }
  
  // ... continua com outras regras predefinidas
  
  // Ordena por pontuação e retorna o melhor
  selectorCandidates.sort((a, b) => b.score - a.score);
  return selectorCandidates[0];
}
```

## Benefícios do Sistema de Regras

### 1. Seletores Mais Robustos
- Prioriza seletores estáveis e específicos
- Evita seletores frágeis que quebram facilmente
- Considera a unicidade do elemento na página

### 2. Transparência
- Mostra a pontuação de qualidade do seletor
- Explica por que cada seletor foi escolhido
- Permite ver e escolher alternativas

### 3. Flexibilidade
- Usuário pode escolher entre diferentes opções
- Sistema se adapta a diferentes tipos de aplicações
- Suporte a múltiplas estratégias de seleção

### 4. Manutenibilidade
- Seletores gerados são mais fáceis de manter
- Reduz a necessidade de refatoração de testes
- Melhora a estabilidade dos testes automatizados

## Exemplos de Uso

### Exemplo 1: Elemento com data-cy
```html
<button data-cy="submit-button">Enviar</button>
```
**Seletor escolhido**: `[data-cy="submit-button"]` (100 pontos)
**Código Cypress**: `cy.get('[data-cy="submit-button"]').click();`

### Exemplo 2: Elemento com ID
```html
<input id="email" type="email" placeholder="Digite seu email">
```
**Seletor escolhido**: `#email` (95 pontos)
**Código Cypress**: `cy.get('#email').type('teste@exemplo.com');`

### Exemplo 3: Elemento com classes específicas
```html
<div class="user-profile-card">
  <span class="user-name">João Silva</span>
</div>
```
**Seletor escolhido**: `.user-profile-card .user-name` (80 pontos)
**Código Cypress**: `cy.get('.user-profile-card .user-name').should('have.text', 'João Silva');`

## Considerações Técnicas

### Performance
- Análise de seletores é feita em tempo real
- Cache de resultados para elementos similares
- Otimização para páginas com muitos elementos

### Compatibilidade
- Funciona com qualquer framework frontend
- Suporte a aplicações SPA (Single Page Application)
- Compatível com diferentes estruturas de DOM

### Extensibilidade
- Fácil adição de novos critérios de seleção
- Sistema modular para diferentes tipos de elementos
- Configuração flexível de pontuações

## Limitações e Considerações

### O que o sistema NÃO é:
- **Não é IA real**: Não usa machine learning ou redes neurais
- **Não aprende**: As regras são fixas e não se adaptam automaticamente
- **Não é determinístico**: Pode produzir resultados diferentes em contextos similares

### O que o sistema É:
- **Sistema de heurísticas**: Usa regras de negócio bem definidas
- **Algoritmo de pontuação**: Atribui scores baseados em critérios predefinidos
- **Ferramenta inteligente**: Simula inteligência através de regras estruturadas

## Conclusão

O sistema de seletores do CyRecord representa uma abordagem prática e eficaz para a geração automática de seletores para testes. Ao combinar múltiplos critérios de avaliação com transparência total para o usuário, a ferramenta garante que os testes gerados sejam robustos, mantíveis e confiáveis.

A capacidade de ver e escolher entre diferentes alternativas de seletores dá ao usuário controle total sobre o processo, enquanto a pontuação automática orienta para as melhores práticas de teste automatizado. Embora não seja uma IA real, o sistema oferece funcionalidade inteligente através de regras bem estruturadas e heurísticas eficazes. 