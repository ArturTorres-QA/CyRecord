// Este listener é acionado quando o ícone da extensão é clicado na barra do navegador
chrome.action.onClicked.addListener((tab) => {
  // Injeta o script 'injectPanel.js' na aba atual
  chrome.scripting.executeScript({
    target: { tabId: tab.id }, // Define a aba de destino como a aba clicada
    files: ['injectPanel.js'] // Especifica o arquivo de script a ser injetado
  });
});
