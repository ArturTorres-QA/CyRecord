# ⚡ Guia Rápido do CyRecord

## 🚀 Instalação Rápida

1. **Baixe** o ZIP do CyRecord
2. **Extraia** em uma pasta fixa
3. **Abra** `chrome://extensions/`
4. **Ative** "Modo desenvolvedor"
5. **Clique** "Carregar sem compactação"
6. **Selecione** a pasta do CyRecord

## 🎬 Como Usar

### 1. Iniciar Gravação
- Clique no ícone do CyRecord
- Clique em "🎬 Iniciar Gravação"
- Painel flutuante aparecerá

### 2. Gravar Ações
- **Clique** normalmente em elementos
- **Digite** em campos de texto
- **Navegue** entre páginas
- Tudo é gravado automaticamente!

### 3. Adicionar Asserções
- **Clique com botão direito** em qualquer elemento
- **Escolha** o tipo de asserção
- **Veja** a qualidade do seletor (0-100 pontos)
- **Clique** "Ver alternativas" se quiser outras opções

### 4. Exportar Código
- Clique em "🛑 Parar Gravação"
- **Digite** um nome para o arquivo
- Clique em "⬇️ Exportar Código"
- Arquivo será baixado automaticamente

## 🎯 Tipos de Asserções

### Básicas
- 👁️ **Deve estar visível** - Verifica se elemento aparece
- ✅ **Deve existir** - Confirma que elemento está na página
- ❌ **Não deve existir** - Verifica que elemento NÃO está
- 🚫 **Deve estar desabilitado** - Confirma que está desabilitado
- ✅ **Deve estar habilitado** - Confirma que está ativo

### Avançadas
- 📝 **Deve ter texto exato** - Verifica texto específico
- 🔍 **Deve conter texto** - Verifica se contém palavra
- 🎨 **Deve ter classe CSS** - Verifica classe específica
- 🔗 **Deve ter valor** - Verifica valor de campo
- 🏷️ **Deve ter atributo** - Verifica atributo específico

## 🎨 Qualidade dos Seletores

O CyRecord usa um **sistema de regras** que analisa cada elemento e atribui pontuações baseadas em critérios predefinidos:

### 🟢 Alta Qualidade (80-100 pontos)
- **100 pts** - `data-cy` (melhor opção)
- **95 pts** - `ID` (identificador único)
- **90 pts** - `data-testid` (atributos de teste)

### 🟠 Qualidade Média (60-79 pontos)
- **80 pts** - Classes CSS específicas
- **75 pts** - Atributo `name`
- **70 pts** - Seletor hierárquico

### 🔴 Baixa Qualidade (0-59 pontos)
- **60 pts** - Texto único
- **40 pts** - Apenas tag

## 💡 Dicas Rápidas

### ✅ Faça
- Teste em páginas limpas
- Use dados de teste consistentes
- Faça ações de forma natural
- Verifique qualidade dos seletores

### ❌ Evite
- Mudanças bruscas de velocidade
- Elementos que mudam de posição
- Dados pessoais reais
- Páginas com muitos popups

## 🆘 Problemas Comuns

### Extensão não aparece
- Recarregue `chrome://extensions/`
- Reative "Modo desenvolvedor"

### Gravação não funciona
- Recarregue a página
- Verifique console (F12)
- Tente página mais simples

### Elementos não detectados
- Aguarde página carregar
- Clique em elementos simples
- Verifique se não está em iframe

### Asserções não funcionam
- Certifique-se que gravação está ativa
- Tente elementos diferentes
- Verifique se elemento não está desabilitado

## 🔧 Recursos Úteis

- **Reiniciar Gravação**: Limpa todas as ações
- **Ver Alternativas**: Escolha seletores melhores
- **Pontuação**: Sempre prefira seletores com pontuação alta
- **Teste**: Sempre teste o código gerado

---

**🎯 CyRecord - Transforme suas ações em testes Cypress com sistema inteligente de seletores!** 