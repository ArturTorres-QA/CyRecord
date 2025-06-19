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
document.getElementById('stop').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id, // ID da aba ativa
      { action: 'generateCypressCode' }, // Solicita geração do código
      (response) => {
        if (response && response.code) {
          document.getElementById('output').value = response.code; // Exibe código gerado
        } else {
          document.getElementById('output').value = '// Nenhuma código gerado.'; // Mensagem padrão
        }
      }
    );
  });
});

// Listener para o botão "Baixar" código
// Seleciona o botão de download e adiciona um evento de clique
// Quando clicado, obtém o código da área de texto
// Cria um blob com o código JavaScript
// Cria uma URL para o blob
// Cria um elemento de link para download
// Define o link e o nome do arquivo
// Simula clique para iniciar o download
document.getElementById('download').addEventListener('click', () => {
  const code = document.getElementById('output').value;
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cypress-tests.js';
  a.click();
});
