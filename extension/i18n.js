// Preenche os textos marcados com data-i18n usando os arquivos de _locales.
document.documentElement.lang = chrome.i18n.getUILanguage();

for (const el of document.querySelectorAll('[data-i18n]')) {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
}

for (const el of document.querySelectorAll('[data-i18n-label]')) {
  const text = chrome.i18n.getMessage(el.dataset.i18nLabel);
  el.title = text;
  el.setAttribute('aria-label', text);
}
