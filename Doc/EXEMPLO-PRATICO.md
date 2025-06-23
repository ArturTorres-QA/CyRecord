# 🎯 Exemplo Prático - Testando um Formulário de Login

## 📋 Cenário de Teste
Vamos criar um teste automatizado para um formulário de login usando o CyRecord.

### 🎯 Objetivo
Gravar um teste que:
1. Acessa a página de login
2. Preenche email e senha
3. Clica no botão de login
4. Verifica se o login foi bem-sucedido

---

## 🚀 Passo a Passo

### 1. Preparação
1. **Abra o Chrome** e navegue até o site que quer testar
2. **Vá para a página de login**
3. **Clique no ícone do CyRecord** na barra de ferramentas
4. **Clique em "🎬 Iniciar Gravação"**

### 2. Gravação das Ações

#### Ação 1: Preencher Email
- **Clique** no campo de email
- **Digite**: `teste@exemplo.com`
- **Observe**: O painel flutuante mostra a ação gravada

#### Ação 2: Preencher Senha
- **Clique** no campo de senha
- **Digite**: `123456`
- **Observe**: Nova ação aparece na lista

#### Ação 3: Clicar no Botão de Login
- **Clique** no botão "Entrar" ou "Login"
- **Observe**: Ação de clique é gravada

### 3. Adicionando Asserções

#### Asserção 1: Verificar se os campos estão visíveis
1. **Clique com botão direito** no campo de email
2. **Escolha**: "👁️ Deve estar visível"
3. **Observe**: Pontuação do seletor (ex: 95 pontos - ID)
4. **Clique**: "Ver alternativas" se quiser outras opções
5. **Confirme** a asserção

#### Asserção 2: Verificar se o botão está habilitado
1. **Clique com botão direito** no botão de login
2. **Escolha**: "✅ Deve estar habilitado"
3. **Observe**: Qualidade do seletor
4. **Confirme** a asserção

#### Asserção 3: Verificar mensagem de sucesso
1. **Após o login**, procure por uma mensagem de sucesso
2. **Clique com botão direito** na mensagem
3. **Escolha**: "🔍 Deve conter texto"
4. **Digite**: "Bem-vindo" ou "Login realizado"
5. **Confirme** a asserção

### 4. Finalizando o Teste
1. **Clique em "🛑 Parar Gravação"**
2. **Digite o nome**: `login-test`
3. **Clique em "⬇️ Exportar Código"**

---

## 📄 Código Gerado (Exemplo)

```javascript
describe('Teste de Login', () => {
  it('Deve fazer login com sucesso', () => {
    // Acessar a página de login
    cy.visit('/login')
    
    // Verificar se o campo de email está visível
    cy.get('#email').should('be.visible')
    
    // Preencher email
    cy.get('#email').type('teste@exemplo.com')
    
    // Preencher senha
    cy.get('#password').type('123456')
    
    // Verificar se o botão está habilitado
    cy.get('[data-cy="login-button"]').should('be.enabled')
    
    // Clicar no botão de login
    cy.get('[data-cy="login-button"]').click()
    
    // Verificar mensagem de sucesso
    cy.get('.success-message').should('contain.text', 'Bem-vindo')
  })
})
```

---

## 🎯 Exemplos de Diferentes Tipos de Seletores

O CyRecord usa um **sistema de regras** que analisa cada elemento e atribui pontuações baseadas em critérios predefinidos:

### Exemplo 1: Elemento com data-cy (100 pontos)
```html
<button data-cy="submit-button">Enviar</button>
```
**Seletor gerado**: `[data-cy="submit-button"]`
**Por que é bom**: Criado especificamente para testes

### Exemplo 2: Elemento com ID (95 pontos)
```html
<input id="username" type="text" placeholder="Usuário">
```
**Seletor gerado**: `#username`
**Por que é bom**: ID é único na página

### Exemplo 3: Elemento com data-testid (90 pontos)
```html
<div data-testid="user-profile">Perfil do Usuário</div>
```
**Seletor gerado**: `[data-testid="user-profile"]`
**Por que é bom**: Atributo criado para automação

### Exemplo 4: Elemento com classe específica (80 pontos)
```html
<div class="user-profile-card">
  <span class="user-name">João Silva</span>
</div>
```
**Seletor gerado**: `.user-profile-card .user-name`
**Por que é bom**: Classes específicas são estáveis

### Exemplo 5: Elemento com atributo name (75 pontos)
```html
<input name="email" type="email" placeholder="Digite seu email">
```
**Seletor gerado**: `[name="email"]`
**Por que é bom**: Importante para formulários

---

## 🔍 Exemplos de Asserções

### Asserção de Visibilidade
```javascript
cy.get('#email').should('be.visible')
```
**Quando usar**: Para verificar se um elemento está aparecendo na tela

### Asserção de Texto
```javascript
cy.get('.welcome-message').should('contain.text', 'Bem-vindo')
```
**Quando usar**: Para verificar se uma mensagem específica apareceu

### Asserção de Estado
```javascript
cy.get('#submit-button').should('be.enabled')
```
**Quando usar**: Para verificar se um botão está ativo antes de clicar

### Asserção de Valor
```javascript
cy.get('#email').should('have.value', 'teste@exemplo.com')
```
**Quando usar**: Para verificar se um campo foi preenchido corretamente

### Asserção de Existência
```javascript
cy.get('.error-message').should('not.exist')
```
**Quando usar**: Para verificar que uma mensagem de erro não apareceu

---

## 💡 Dicas para Este Exemplo

### ✅ Boas Práticas
1. **Use dados de teste** consistentes
2. **Verifique a qualidade** dos seletores antes de confirmar
3. **Adicione asserções** para verificar o estado antes e depois das ações
4. **Teste o fluxo completo** do login

### ❌ Evite
1. **Usar dados pessoais** reais
2. **Gravar em páginas** com dados sensíveis
3. **Ignorar seletores** de baixa qualidade
4. **Esquecer de verificar** se as ações funcionaram

### 🎯 Pontos de Atenção
1. **Sempre verifique** se os campos estão visíveis antes de preencher
2. **Confirme** se o botão está habilitado antes de clicar
3. **Verifique** se a navegação funcionou após o login
4. **Teste** o código gerado para garantir que funciona

---

## 🚀 Próximos Passos

Após criar este teste básico, você pode:

1. **Adicionar mais cenários**:
   - Login com credenciais inválidas
   - Validação de campos obrigatórios
   - Recuperação de senha

2. **Melhorar as asserções**:
   - Verificar redirecionamento
   - Confirmar dados do usuário logado
   - Testar logout

3. **Otimizar os seletores**:
   - Usar data-cy quando disponível
   - Preferir IDs a classes genéricas
   - Evitar seletores baseados em texto

**🎯 Agora você tem um exemplo prático de como usar o CyRecord!** 