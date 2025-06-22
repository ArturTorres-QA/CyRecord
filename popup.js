// Listener para o botão "Iniciar" gravação
// Seleciona o botão de iniciar e adiciona um evento de clique
// Quando clicado, busca a aba ativa na janela atual
// Injeta o script content.js na aba ativa
// Após injetar, envia mensagem para iniciar a gravação
document.getElementById('start').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id }, // Define a aba de destino
      files: ['content.js'] // Script a ser injetado
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording' }); // Inicia gravação
    });
  });
});

// Listener para o botão "Parar" gravação
// Seleciona o botão de parar e adiciona um evento de clique
// Quando clicado, busca a aba ativa na janela atual
// Envia mensagem para gerar o código Cypress
// Recebe o código gerado e exibe na área de texto
// Foca no campo de nome do arquivo para facilitar a definição do nome
document.getElementById('stop').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id, // ID da aba ativa
      { action: 'generateCypressCode' }, // Solicita geração do código
      (response) => {
        if (response && response.code) {
          document.getElementById('output').value = response.code; // Exibe código gerado
          // Foca no campo de nome do arquivo para facilitar a definição
          document.getElementById('filename').focus();
        } else {
          document.getElementById('output').value = '// Nenhuma código gerado.'; // Mensagem padrão
        }
      }
    );
  });
});

// Função para fazer o download do código
function downloadCode() {
  const code = document.getElementById('output').value;
  const filenameInput = document.getElementById('filename').value.trim();
  
  // Verifica se há código para baixar
  if (!code || code.trim() === '' || code.includes('// Nenhuma código gerado.')) {
    alert('Não há código para exportar. Faça uma gravação primeiro!');
    return;
  }
  
  // Define o nome do arquivo: usa o input do usuário ou um nome padrão
  let filename = filenameInput || 'cypress-tests';
  
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
  
  // Limpa a URL criada para liberar memória
  URL.revokeObjectURL(url);
  
  // Feedback visual de sucesso
  showDownloadSuccess(filename);
}

// Função para mostrar feedback de sucesso no download
function showDownloadSuccess(filename) {
  const downloadBtn = document.getElementById('download');
  const originalText = downloadBtn.textContent;
  
  // Muda temporariamente o texto do botão
  downloadBtn.textContent = '✅ Baixado!';
  downloadBtn.style.backgroundColor = '#4CAF50';
  
  // Restaura o texto original após 2 segundos
  setTimeout(() => {
    downloadBtn.textContent = originalText;
    downloadBtn.style.backgroundColor = '#2196F3';
  }, 2000);
}

// Listener para o botão "Baixar" código
document.getElementById('download').addEventListener('click', downloadCode);

// Listener para pressionar Enter no campo de nome do arquivo
document.getElementById('filename').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    downloadCode();
  }
});
