## Autor

Artur Torres Soares

# CyRecord

## O que é este projeto?

**CyRecord** é uma extensão para o navegador Google Chrome que grava automaticamente as ações do usuário em uma página web (como cliques e digitação em campos) e gera, a partir disso, comandos prontos para serem usados em testes automatizados com o framework Cypress.

---

## Para que serve?

- Facilita a criação de testes automatizados para sites, mesmo para quem não sabe programar.
- Permite que qualquer pessoa grave suas interações com um site e baixe um arquivo com comandos Cypress, que podem ser usados por equipes de QA (Quality Assurance) ou desenvolvedores para testar funcionalidades automaticamente.

---

## Como funciona?

### 1. Instalação

1. Baixe ou clone este repositório.
2. No Chrome, acesse `chrome://extensions/`.
3. Ative o **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.
5. O ícone da extensão aparecerá na barra do Chrome.

### 2. Usando a extensão

1. **Clique no ícone da extensão** na barra do Chrome para abrir o painel.
2. No painel, clique em **"Iniciar Gravação"**.
3. Navegue normalmente pelo site: clique em botões, preencha formulários, etc.
4. Quando terminar, volte ao painel e clique em **"Parar Gravação"**.
5. O código Cypress gerado aparecerá em uma área de texto.
6. Clique em **"Baixar Código Cypress"** para salvar o arquivo com os comandos Cypress.

### 3. O que acontece nos bastidores?

- Ao iniciar a gravação, a extensão injeta um script na página que monitora suas ações.
- Cada clique ou digitação é convertido em um comando Cypress correspondente.
- Ao parar a gravação, o código gerado é exibido e pode ser baixado.

---

## Estrutura dos Arquivos

- **manifest.json**: Arquivo de configuração da extensão (obrigatório para o Chrome).
- **background.js**: Controla a injeção do painel de gravação na página.
- **injectPanel.js**: Cria o painel flutuante na página, com botões para gravar, parar, baixar e fechar.
- **content.js**: Script que grava as ações do usuário e gera o código Cypress.
- **popup.html / popup.js**: Interface e lógica do popup da extensão (aquele que aparece ao clicar no ícone).
- **recorder.html / recorder.js**: Alternativa de interface para gravação, com funcionamento semelhante ao popup.
- **icons/**: Ícones da extensão.

---

## Principais Funcionalidades

- **Gravação de ações**: Captura cliques e digitação em tempo real.
- **Geração automática de código Cypress**: Transforma ações em comandos como `cy.get('seletor').click();` ou `cy.get('seletor').type('texto');`.
  
  Exemplos adicionais:
  - `cy.get('[data-cy="login-button"]').click();`
  - `cy.get('#username').type('Artur');`
  - `cy.get('.btn-salvar').click();`
  - `cy.contains('Enviar').should('be.visible').click();`
- **Download do código**: Permite baixar o script pronto para uso em projetos de teste.
- **Interface simples**: Botões claros para iniciar, para, reiniciar e baixar.

---

## O que é Cypress?

Cypress é uma ferramenta moderna para automação de testes de aplicações web. Comandos Cypress são usados para simular ações de usuários e verificar se o site está funcionando corretamente.

Exemplo de comando Cypress gerado pela extensão:

```js
cy.get('#meu-botao').click();
cy.get('input[name="email"]').type('usuario@exemplo.com');
```

---

## Como usar o código gerado?

1. Instale o Cypress no seu projeto (caso ainda não tenha):
   ```bash
   npm install cypress --save-dev
   ```
2. Copie o código gerado pela extensão para um arquivo dentro da pasta `cypress/e2e/` do seu projeto.
3. Execute o Cypress:
   ```bash
   npx cypress open
   ```
4. Escolha o arquivo de teste criado e veja o teste rodando automaticamente.

---

## Informações Relevantes para Iniciantes

- **Você não precisa saber programar** para usar a extensão e gerar testes básicos.
- O código gerado pode ser entregue para um desenvolvedor ou equipe de QA que use Cypress.
- A extensão não altera o funcionamento do site, apenas observa suas ações enquanto a gravação está ativa.
- Para usar o código gerado, é necessário ter o Cypress instalado em seu projeto (isso é feito fora da extensão).

---

## Segurança e Privacidade

- A extensão só grava ações enquanto a gravação está ativa.
- Nenhuma informação é enviada para servidores externos; tudo acontece localmente no seu navegador.

---

## Dúvidas Frequentes

**Preciso saber programar para usar?**
> Não! A extensão foi feita para ser usada por qualquer pessoa.

**O que faço com o arquivo baixado?**
> Entregue para quem cuida dos testes automatizados do seu site, ou siga o passo a passo acima para rodar você mesmo.

**A extensão funciona em qualquer site?**
> Sim, desde que você tenha permissão para acessar o site.

---

Se precisar de mais exemplos, instruções ou tiver dúvidas, abra uma issue ou entre em contato! 