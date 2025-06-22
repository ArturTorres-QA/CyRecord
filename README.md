# CyRecord 🎯

**Grave ações do usuário e gere testes Cypress automaticamente com inteligência artificial para seletores!**

## 📚 Documentação Completa 

### 🆕 Para Usuários Leigos (Recomendado)
- **[📖 Guia Completo do Usuário](Doc/GUIA-COMPLETO-USUARIO.md)** - Documentação detalhada e amigável
- **[⚡ Guia Rápido](Doc/GUIA-RAPIDO.md)** - Referência rápida para consulta
- **[🎯 Exemplo Prático](Doc/EXEMPLO-PRATICO.md)** - Tutorial passo a passo

### 🔧 Para Desenvolvedores
- **[📋 Documentação Técnica](explicacao-tecnica.md)** - Detalhes técnicos e arquitetura
- **[📄 Manifest](manifest-documentation.md)** - Documentação do manifest.json

---

## 🚀 O que é o CyRecord?

O CyRecord é uma extensão para o Google Chrome que grava automaticamente suas ações em uma página web (cliques, digitação, etc.) e gera comandos Cypress prontos para uso em testes automatizados. 

**Destaque especial**: O CyRecord usa inteligência artificial para escolher o melhor seletor possível para cada elemento, garantindo testes mais robustos e estáveis!

## ✨ Funcionalidades Principais

### 🎬 Gravação Automática
- **Cliques**: Captura cliques em qualquer elemento da página
- **Inputs**: Registra digitação em campos de texto
- **Asserções**: Adicione verificações com botão direito

### 🧠 Sistema de IA para Seletores
O CyRecord analisa cada elemento e escolhe o melhor seletor baseado em múltiplos critérios:

- **data-cy** (100 pontos) - Melhor prática para testes
- **ID** (95 pontos) - Identificador único
- **Atributos de teste** (90 pontos) - data-testid, data-test, etc.
- **Classes CSS específicas** (80 pontos) - Classes não genéricas
- **E muito mais...**

### 🔍 Menu de Asserções Inteligente
Quando você clica com o botão direito para adicionar uma asserção:

1. **Análise automática** do elemento com IA
2. **Pontuação de qualidade** do seletor (0-100)
3. **Explicação detalhada** de por que aquele seletor foi escolhido
4. **Botão "Ver alternativas"** para escolher entre diferentes opções

### 📊 Modal de Alternativas
Veja todas as opções de seletores disponíveis:
- **Pontuação de cada alternativa** (0-100)
- **Código Cypress gerado** para cada opção
- **Cores indicativas**: 🟢 Verde (alta qualidade), 🟠 Laranja (média), 🔴 Vermelho (baixa)

## 🛠️ Como Usar

### 1. Instalação
1. Baixe os arquivos da extensão
2. Abra o Chrome e vá para `chrome://extensions/`
3. Ative o "Modo desenvolvedor"
4. Clique em "Carregar sem compactação" e selecione a pasta do CyRecord

### 2. Gravação
1. Clique no ícone da extensão na barra de ferramentas
2. Clique em "Iniciar Gravação"
3. Navegue pela página normalmente (cliques e digitação são gravados automaticamente)

### 3. Adicionando Asserções
1. **Clique com o botão direito** em qualquer elemento
2. Escolha o tipo de asserção desejado
3. **Veja a qualidade do seletor** escolhido pela IA
4. **Clique em "Ver alternativas"** se quiser outras opções

### 4. Gerando o Código
1. Clique em "Parar Gravação"
2. O código Cypress é gerado automaticamente
3. Copie o código e use em seus testes

## 🎯 Exemplos de Uso

### Exemplo 1: Elemento com data-cy
```html
<button data-cy="submit-button">Enviar</button>
```
**IA escolhe**: `[data-cy="submit-button"]` (100 pontos)
**Código gerado**: `cy.get('[data-cy="submit-button"]').click();`

### Exemplo 2: Elemento com ID
```html
<input id="email" type="email" placeholder="Digite seu email">
```
**IA escolhe**: `#email` (95 pontos)
**Código gerado**: `cy.get('#email').type('teste@exemplo.com');`

### Exemplo 3: Elemento com classes específicas
```html
<div class="user-profile-card">
  <span class="user-name">João Silva</span>
</div>
```
**IA escolhe**: `.user-profile-card .user-name` (80 pontos)
**Código gerado**: `cy.get('.user-profile-card .user-name').should('have.text', 'João Silva');`

## 🔧 Tipos de Asserções Suportadas

### Básicas
- 👁️ **Deve estar visível** - `cy.get('selector').should('be.visible')`
- ✅ **Deve existir** - `cy.get('selector').should('exist')`
- ❌ **Não deve existir** - `cy.get('selector').should('not.exist')`
- 🚫 **Deve estar desabilitado** - `cy.get('selector').should('be.disabled')`
- ✅ **Deve estar habilitado** - `cy.get('selector').should('be.enabled')`

### Avançadas
- 📝 **Deve ter texto exato** - `cy.get('selector').should('have.text', 'valor')`
- 🔍 **Deve conter texto** - `cy.get('selector').should('contain.text', 'valor')`
- 🎨 **Deve ter classe CSS** - `cy.get('selector').should('have.class', 'classe')`
- 🔗 **Deve ter valor** - `cy.get('selector').should('have.value', 'valor')`
- 🏷️ **Deve ter atributo** - `cy.get('selector').should('have.attr', 'atributo', 'valor')`

## 🧠 Como a IA Funciona

O sistema de inteligência artificial do CyRecord avalia múltiplos fatores para escolher o melhor seletor:

### Critérios de Avaliação:
1. **data-cy** (100 pontos) - Melhor prática para testes
2. **ID** (95 pontos) - Identificador único
3. **Atributos de teste** (90 pontos) - data-testid, data-test, data-automation, data-qa
4. **Atributo name** (85 pontos) - Importante para formulários
5. **Classes CSS específicas** (80/60 pontos) - Classes não genéricas
6. **Atributos de formulário** (75/55 pontos) - type, role, placeholder, title, alt
7. **Seletor hierárquico** (70-65/45-40 pontos) - Posição relativa ao pai
8. **Texto único** (60/35 pontos) - Para elementos pequenos
9. **Combinação de atributos** (55/30 pontos) - Múltiplos atributos
10. **Apenas tag** (40/10 pontos) - Último recurso

### Fatores de Qualidade:
- **Unicidade**: Seletor que encontra apenas 1 elemento recebe pontuação máxima
- **Especificidade**: Seletores mais específicos são preferidos
- **Estabilidade**: Seletores menos propensos a quebrar com mudanças no código

## 🎨 Interface

### Painel Flutuante
- **Posição**: Canto inferior direito da página
- **Redimensionável**: Arraste as bordas para ajustar o tamanho
- **Minimizável**: Clique no botão ⬜ para alternar tamanho

### Menu de Asserções
- **Acesso**: Clique com botão direito em qualquer elemento
- **Qualidade visual**: Pontuação colorida (0-100)
- **Alternativas**: Botão para ver outras opções de seletores

### Modal de Alternativas
- **Lista completa**: Todas as opções de seletores disponíveis
- **Pontuação**: Score de cada alternativa
- **Código**: Preview do código Cypress gerado

## 🚀 Benefícios

### Para Desenvolvedores
- **Economia de tempo**: Gera testes automaticamente
- **Qualidade**: Seletores robustos escolhidos por IA
- **Flexibilidade**: Escolha entre diferentes opções
- **Transparência**: Entenda por que cada seletor foi escolhido

### Para Testes
- **Estabilidade**: Seletores menos propensos a quebrar
- **Manutenibilidade**: Código mais fácil de manter
- **Confiabilidade**: Testes mais robustos e confiáveis
- **Padrões**: Segue melhores práticas de teste automatizado

## 📁 Estrutura do Projeto

```
CyRecord/
├── manifest.json          # Configuração da extensão
├── popup.html            # Interface do popup
├── popup.js              # Lógica do popup
├── content.js            # Script injetado na página
├── injectPanel.js        # Painel flutuante com IA
├── background.js         # Script de background
├── explicacao-tecnica.md # Documentação técnica detalhada
├── manifest-documentation.md # Documentação do manifest
├── Doc/                    # Documentação para usuários leigos
│   ├── GUIA-COMPLETO-USUARIO.md # Guia completo para usuários leigos
│   ├── GUIA-RAPIDO.md        # Guia rápido de referência
│   └── EXEMPLO-PRATICO.md    # Exemplo prático de uso
└── icons/                # Ícones da extensão
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. **Consulte a documentação** primeiro:
   - [Guia Completo do Usuário](Doc/GUIA-COMPLETO-USUARIO.md)
   - [Guia Rápido](Doc/GUIA-RAPIDO.md)
   - [Exemplo Prático](Doc/EXEMPLO-PRATICO.md)

2. **Se ainda tiver dúvidas**:
   - Abra uma issue no GitHub
   - Descreva o problema detalhadamente
   - Inclua screenshots se possível
   - Especifique o navegador e versão

---

**Desenvolvido com ❤️ para a comunidade de testes automatizados!**

🎯 **CyRecord** - Transforme suas ações em testes Cypress com inteligência artificial!
