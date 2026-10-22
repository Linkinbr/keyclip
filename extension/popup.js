import { loadSettings, generatePassword } from './lib/password.js';
import { copyToClipboard } from './lib/clipboard.js';

const CLOSE_DELAY_MS = 1200;

const t = (key) => chrome.i18n.getMessage(key);
const toast = document.getElementById('toast');
const message = document.getElementById('message');
const openOptions = document.getElementById('open-options');

document.documentElement.lang = chrome.i18n.getUILanguage();

function show(text, { error = false } = {}) {
  message.textContent = text;
  toast.classList.toggle('error', error);
  openOptions.hidden = !error;
  toast.classList.add('visible');
}

openOptions.textContent = t('openOptions');
openOptions.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
  window.close();
});

try {
  const settings = await loadSettings();
  const password = generatePassword(settings);
  await copyToClipboard(password);
  show(t('copied'));
  setTimeout(() => window.close(), CLOSE_DELAY_MS);
} catch (err) {
  show(t(err.message === 'NO_CHARSET' ? 'noCharset' : 'copyFailed'), { error: true });
}
