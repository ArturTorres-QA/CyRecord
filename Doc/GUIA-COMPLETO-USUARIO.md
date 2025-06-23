# 🎯 Guia Completo do CyRecord - Para Usuários Leigos

## 📋 Índice
1. [O que é o CyRecord?](#o-que-é-o-cyrecord)
2. [Como Instalar](#como-instalar)
3. [Primeiros Passos](#primeiros-passos)
4. [Como Gravar Ações](#como-gravar-ações)
5. [Como Adicionar Asserções](#como-adicionar-asserções)
6. [Entendendo a Qualidade dos Seletores](#entendendo-a-qualidade-dos-seletores)
7. [Como Exportar o Código](#como-exportar-o-código)
8. [Dicas e Truques](#dicas-e-truques)
9. [Solução de Problemas](#solução-de-problemas)

---

## 🎯 O que é o CyRecord?

O **CyRecord** é uma ferramenta que transforma suas ações no navegador em código de teste automatizado! 

**Imagine assim**: Você está navegando normalmente em um site, clicando em botões, preenchendo formulários... O CyRecord "observa" tudo isso e cria automaticamente um script que pode repetir essas mesmas ações milhares de vezes para testar se o site funciona corretamente.

### 🎬 O que ele grava:
- ✅ **Cliques** em botões, links, menus
- ✅ **Digitação** em campos de texto
- ✅ **Verificações** (asserções) que você adiciona
- ✅ **Navegação** entre páginas

### 🧠 O que torna ele especial:
- **Sistema Inteligente**: Escolhe automaticamente a melhor forma de identificar cada elemento usando regras de pontuação
- **Qualidade**: Gera testes mais estáveis e confiáveis
- **Facilidade**: Você não precisa saber programar para usar!

---

## 📥 Como Instalar

### Passo 1: Baixar os Arquivos
1. Baixe o arquivo ZIP do CyRecord
2. Extraia o conteúdo em uma pasta no seu computador
3. Mantenha essa pasta em um local fixo (ex: Desktop ou Documentos)

### Passo 2: Instalar no Chrome
1. **Abra o Google Chrome**
2. **Digite na barra de endereços**: `chrome://extensions/`
3. **Ative o "Modo desenvolvedor"** (botão no canto superior direito)
4. **Clique em "Carregar sem compactação"**
5. **Selecione a pasta** onde você extraiu os arquivos do CyRecord
6. **Clique em "Selecionar pasta"**

### ✅ Como saber se deu certo:
- Você verá o ícone do CyRecord na barra de ferramentas do Chrome
- O ícone aparecerá ao lado da barra de endereços

### ⚠️ Importante:
- **Nunca delete** a pasta dos arquivos do CyRecord
- Se você mover a pasta, precisará reinstalar a extensão
- O "Modo desenvolvedor" deve ficar sempre ativado

---

## 🚀 Primeiros Passos

### 1. Abrir o CyRecord
- **Clique no ícone** do CyRecord na barra de ferramentas
- Uma janela popup aparecerá com os controles

### 2. Entender a Interface
A janela do CyRecord tem:
- **🎬 Iniciar Gravação**: Começa a gravar suas ações
- **🛑 Parar Gravação**: Para a gravação
- **⬇️ Exportar Código**: Gera o código final
- **Campo de nome**: Para dar um nome ao seu arquivo de teste

### 3. Preparar o Site
- **Abra o site** que você quer testar em uma nova aba
- **Navegue até a página** onde quer começar o teste
- **Certifique-se** de que a página carregou completamente

---

## 🎬 Como Gravar Ações

### Passo 1: Iniciar a Gravação
1. **Clique em "🎬 Iniciar Gravação"**
2. **O botão mudará** para "🛑 Parar Gravação" (verde para vermelho)
3. **Um painel flutuante** aparecerá no canto inferior direito da página

### Passo 2: Realizar as Ações
Agora você pode navegar normalmente! O CyRecord gravará:

#### ✅ **Cliques Automáticos**
- Clique em qualquer botão, link ou elemento
- O CyRecord detecta automaticamente e grava
- **Não precisa fazer nada especial** - apenas clique normalmente

#### ✅ **Digitação Automática**
- Clique em um campo de texto
- Digite normalmente
- O CyRecord grava o texto digitado

#### ✅ **Navegação**
- Mude de página normalmente
- O CyRecord acompanha a navegação

### Passo 3: Acompanhar o Progresso
- **O painel flutuante** mostra todas as ações gravadas
- **Cada ação aparece** na lista com detalhes
- **Você pode ver** exatamente o que foi gravado

### ⚠️ Dicas Importantes:
- **Faça as ações de forma natural** - como você faria normalmente
- **Não tenha pressa** - o CyRecord precisa de tempo para processar
- **Se errar**, não se preocupe - você pode reiniciar a gravação

---

## 🔍 Como Adicionar Asserções

### O que são Asserções?
**Asserções** são verificações que garantem que algo está correto na página. Por exemplo:
- "Verificar se o botão está visível"
- "Confirmar se o texto apareceu"
- "Checar se o campo foi preenchido"

### Como Adicionar:

#### Passo 1: Clique com Botão Direito
1. **Clique com o botão direito** em qualquer elemento da página
2. **Um menu aparecerá** com opções de asserção

#### Passo 2: Escolher o Tipo de Asserção
O menu mostra várias opções:

##### 🟢 **Asserções Básicas:**
- **👁️ Deve estar visível**: Verifica se o elemento está aparecendo
- **✅ Deve existir**: Confirma que o elemento está na página
- **❌ Não deve existir**: Verifica que o elemento NÃO está na página
- **🚫 Deve estar desabilitado**: Confirma que o botão/campo está desabilitado
- **✅ Deve estar habilitado**: Confirma que o botão/campo está ativo

##### 🔵 **Asserções Avançadas:**
- **📝 Deve ter texto exato**: Verifica se o texto é exatamente igual
- **🔍 Deve conter texto**: Verifica se contém uma palavra específica
- **🎨 Deve ter classe CSS**: Verifica se tem uma classe específica
- **🔗 Deve ter valor**: Verifica o valor de um campo
- **🏷️ Deve ter atributo**: Verifica se tem um atributo específico

#### Passo 3: Ver a Qualidade do Seletor
Após escolher uma asserção:
- **Uma pontuação aparece** (0-100 pontos)
- **Uma explicação** de por que aquele seletor foi escolhido
- **Um botão "Ver alternativas"** para ver outras opções

#### Passo 4: Escolher Alternativas (Opcional)
Se quiser ver outras opções:
1. **Clique em "Ver alternativas"**
2. **Uma janela abre** com todas as opções disponíveis
3. **Cada opção tem** uma pontuação e o código que será gerado
4. **Escolha a que preferir** e clique nela

---

## 🎯 Entendendo a Qualidade dos Seletores

### O que é um Seletor?
Um **seletor** é como o CyRecord "encontra" um elemento na página. É como um endereço que diz "procure por este elemento específico".

### Sistema de Pontuação (0-100 pontos)

O CyRecord usa um **sistema de regras** que analisa cada elemento e atribui pontuações baseadas em critérios predefinidos:

#### 🟢 **Alta Qualidade (80-100 pontos)**
**Muito estáveis e confiáveis**

- **100 pontos - data-cy**: Melhor opção para testes
  ```html
  <button data-cy="submit-button">Enviar</button>
  ```
  - **Por que é bom**: Criado especificamente para testes
  - **Quando usar**: Sempre que disponível

- **95 pontos - ID**: Identificador único
  ```html
  <input id="email" type="email">
  ```
  - **Por que é bom**: Cada ID é único na página
  - **Quando usar**: Quando o elemento tem um ID específico

- **90 pontos - Atributos de teste**: data-testid, data-test, etc.
  ```html
  <div data-testid="user-profile">Perfil do Usuário</div>
  ```
  - **Por que é bom**: Criados para automação
  - **Quando usar**: Quando disponíveis

#### 🟠 **Qualidade Média (60-79 pontos)**
**Bons, mas podem quebrar com mudanças**

- **80 pontos - Classes CSS específicas**: Classes não genéricas
  ```html
  <div class="user-profile-card">Card do Usuário</div>
  ```
  - **Por que é bom**: Classes específicas são estáveis
  - **Risco**: Pode quebrar se o design mudar

- **75 pontos - Atributo name**: Importante para formulários
  ```html
  <input name="username" type="text">
  ```
  - **Por que é bom**: Importante para formulários
  - **Risco**: Pode não existir em todos os elementos

- **70 pontos - Seletor hierárquico**: Posição relativa ao pai
  ```html
  <div class="container">
    <button>Clique aqui</button>
  </div>
  ```
  - **Por que é bom**: Usa a estrutura da página
  - **Risco**: Pode quebrar se a estrutura mudar

#### 🔴 **Baixa Qualidade (0-59 pontos)**
**Podem quebrar facilmente**

- **60 pontos - Texto único**: Para elementos pequenos
  ```html
  <span>Texto único</span>
  ```
  - **Por que é arriscado**: Texto pode mudar
  - **Quando usar**: Apenas para textos muito específicos

- **40 pontos - Apenas tag**: Último recurso
  ```html
  <button>Botão</button>
  ```
  - **Por que é arriscado**: Muito genérico
  - **Quando usar**: Apenas quando não há outras opções

### 🎨 Cores Indicativas:
- **🟢 Verde (80-100)**: Excelente - use sem medo
- **🟠 Laranja (60-79)**: Bom - use com atenção
- **🔴 Vermelho (0-59)**: Arriscado - evite se possível

### 💡 Dicas para Melhor Qualidade:
1. **Sempre use data-cy** quando disponível
2. **Prefira IDs** a classes genéricas
3. **Evite seletores baseados em texto** que pode mudar
4. **Teste sempre** após mudanças no site

---

## 📤 Como Exportar o Código

### Passo 1: Parar a Gravação
1. **Clique em "🛑 Parar Gravação"**
2. **O botão voltará** para "🎬 Iniciar Gravação"
3. **O painel flutuante** desaparecerá

### Passo 2: Dar Nome ao Arquivo
1. **No campo "Nome do arquivo"**, digite um nome descritivo
2. **Exemplos de bons nomes**:
   - `login-test`
   - `cadastro-usuario`
   - `busca-produtos`
   - `checkout-pedido`

### Passo 3: Exportar
1. **Clique em "⬇️ Exportar Código"**
2. **O código Cypress** aparecerá na área de texto
3. **Um arquivo será baixado** automaticamente no seu computador

### Passo 4: Usar o Código
O arquivo baixado contém:
- **Código Cypress completo** e pronto para usar
- **Todas as ações** que você gravou
- **Todas as asserções** que você adicionou
- **Comentários explicativos** para facilitar o entendimento

---

## 💡 Dicas e Truques

### 🎯 Para Gravações Melhores:

#### ✅ **Faça o que funciona:**
- **Teste em uma página limpa** (sem dados antigos)
- **Use dados de teste** consistentes
- **Faça as ações de forma lógica** e sequencial
- **Teste o fluxo completo** de uma funcionalidade

#### ❌ **Evite:**
- **Mudanças bruscas** de velocidade
- **Clicar em elementos** que mudam de posição
- **Usar dados pessoais** reais
- **Gravar em páginas** com muitos popups

### 🔧 Para Asserções Mais Eficazes:

#### ✅ **Asserções úteis:**
- **Verificar se botões estão habilitados** antes de clicar
- **Confirmar se mensagens aparecem** após ações
- **Checar se campos foram preenchidos** corretamente
- **Verificar se navegação** funcionou

#### ❌ **Asserções desnecessárias:**
- **Verificar elementos** que não mudam
- **Asserções muito específicas** em textos que mudam
- **Verificar elementos** que sempre existem

### 🎨 Para Seletores de Qualidade:

#### ✅ **Elementos estáveis:**
- **Botões com IDs** ou data-cy
- **Campos de formulário** com name
- **Elementos com classes** específicas
- **Containers** com data-testid

#### ❌ **Elementos instáveis:**
- **Textos que mudam** frequentemente
- **Elementos baseados** em posição
- **Classes genéricas** como "btn" ou "text"
- **Elementos temporários** como popups

---

## 🆘 Solução de Problemas

### ❌ Problemas Comuns e Soluções:

#### **1. A extensão não aparece**
**Sintomas**: Não vê o ícone do CyRecord
**Solução**:
- Verifique se instalou corretamente
- Recarregue a página `chrome://extensions/`
- Reative o "Modo desenvolvedor"

#### **2. Gravação não funciona**
**Sintomas**: Clica em "Iniciar" mas nada acontece
**Solução**:
- Recarregue a página onde quer gravar
- Verifique se não há erros no console (F12)
- Tente em uma página mais simples primeiro

#### **3. Elementos não são detectados**
**Sintomas**: Cliques não aparecem na lista
**Solução**:
- Aguarde a página carregar completamente
- Tente clicar em elementos mais simples
- Verifique se o elemento não está em um iframe

#### **4. Asserções não funcionam**
**Sintomas**: Menu de asserção não aparece
**Solução**:
- Certifique-se de que a gravação está ativa
- Tente clicar com botão direito em elementos diferentes
- Verifique se o elemento não está desabilitado

#### **5. Código exportado não funciona**
**Sintomas**: Teste falha quando executado
**Solução**:
- Verifique se o site não mudou desde a gravação
- Use seletores de melhor qualidade (ver seção de qualidade)
- Adicione mais asserções para verificar o estado

### 🔧 Recursos de Ajuda:

#### **Reiniciar Gravação**
- Durante a gravação, clique em "Reiniciar Gravação"
- Isso limpa todas as ações e começa do zero

#### **Ver Alternativas**
- Sempre clique em "Ver alternativas" para escolher seletores melhores
- Use seletores com pontuação mais alta

#### **Testar em Diferentes Páginas**
- Se não funcionar em uma página, tente em outra
- Páginas mais simples são mais fáceis de gravar

---

## 🎉 Parabéns!

Agora você sabe tudo sobre o CyRecord! Com essas informações, você pode:

✅ **Instalar** a extensão corretamente  
✅ **Gravar** ações de forma eficiente  
✅ **Adicionar** asserções úteis  
✅ **Entender** a qualidade dos seletores  
✅ **Exportar** código funcional  
✅ **Resolver** problemas comuns  

### 🚀 Próximos Passos:
1. **Pratique** em sites simples primeiro
2. **Experimente** diferentes tipos de asserções
3. **Teste** os códigos gerados
4. **Compartilhe** suas experiências com outros usuários
