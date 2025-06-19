// Variável para armazenar o ID da aba ativa durante a sessão
let currentTabId = null;

// Listener para o botão "Iniciar" gravação
document.getElementById("start").addEventListener("click", () => {
  // Busca a aba ativa na janela atual
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Armazena o ID da aba ativa para uso posterior
    currentTabId = tabs[0].id;
    // Injeta o script content.js na aba ativa
    chrome.scripting.executeScript({
      target: { tabId: currentTabId }, // Define a aba de destino
      files: ["content.js"] // Script a ser injetado
    }, () => {
      // Após injetar o script, envia mensagem para iniciar a gravação
      chrome.tabs.sendMessage(currentTabId, { action: "startRecording" });
    });
  });
});

// Listener para o botão "Parar" gravação
document.getElementById("stop").addEventListener("click", () => {
  // Verifica se há uma aba ativa registrada
  if (currentTabId) {
    // Envia mensagem para parar a gravação na aba ativa
    chrome.tabs.sendMessage(currentTabId, { action: "stopRecording" });
  }
});

// Listener para mensagens vindas do content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Se a mensagem for do tipo "updateCode", atualiza a área de saída
  if (msg.type === "updateCode") {
    const output = document.getElementById("output");
    output.value = msg.code; // Exibe o código Cypress gerado
  }
});