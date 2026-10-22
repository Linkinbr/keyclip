// Na primeira instalação, abre as opções com instruções de boas-vindas.
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'options.html?welcome' });
  }
});
