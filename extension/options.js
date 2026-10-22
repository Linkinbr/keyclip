import {
  DEFAULT_SYMBOLS,
  clampLength,
  estimateEntropy,
  generatePassword,
  loadSettings,
  sanitizeSymbols,
  saveSettings,
  validate,
} from './lib/password.js';
import { DONATION_URL, SOURCE_URL } from './config.js';

const SAVE_DELAY_MS = 300;
const HINT_DURATION_MS = 3000;

const $ = (id) => document.getElementById(id);
const t = (key, substitutions) => chrome.i18n.getMessage(key, substitutions);

const lengthNumber = $('length-number');
const lengthRange = $('length-range');
const symbolSet = $('symbol-set');
const symbolsField = document.querySelector('.symbols-field');
const errorBox = $('error');
const sample = $('sample');
const meterFill = $('meter-fill');
const strengthLabel = $('strength-label');
const status = $('status');

const TOGGLES = {
  uppercase: $('uppercase'),
  lowercase: $('lowercase'),
  numbers: $('numbers'),
  symbols: $('symbols'),
  excludeAmbiguous: $('exclude-ambiguous'),
};
const TYPE_KEYS = ['uppercase', 'lowercase', 'numbers', 'symbols'];

const STRENGTH_LEVELS = [
  { below: 45, label: 'strengthWeak', color: 'var(--weak)' },
  { below: 70, label: 'strengthFair', color: 'var(--fair)' },
  { below: 100, label: 'strengthStrong', color: 'var(--strong)' },
  { below: Infinity, label: 'strengthVeryStrong', color: 'var(--very-strong)' },
];

let settings;
let saveTimer;
let statusTimer;
let hintTimer;

function readForm() {
  const values = {
    length: clampLength(lengthNumber.value),
    symbolSet: sanitizeSymbols(symbolSet.value),
  };
  for (const [key, input] of Object.entries(TOGGLES)) values[key] = input.checked;
  return values;
}

function fillForm() {
  lengthNumber.value = settings.length;
  lengthRange.value = settings.length;
  symbolSet.value = settings.symbolSet;
  for (const [key, input] of Object.entries(TOGGLES)) input.checked = settings[key];
}

function showError(key) {
  clearTimeout(hintTimer);
  errorBox.textContent = key ? t(key) : '';
  errorBox.hidden = !key;
}

function updatePreview() {
  symbolsField.classList.toggle('disabled', !settings.symbols);
  symbolSet.disabled = !settings.symbols;
  $('reset-symbols').disabled = !settings.symbols;

  if (validate(settings)) {
    sample.textContent = '—';
    meterFill.style.width = '0';
    strengthLabel.textContent = '';
    return;
  }

  sample.textContent = generatePassword(settings);
  const bits = estimateEntropy(settings);
  const level = STRENGTH_LEVELS.find((l) => bits < l.below);
  meterFill.style.width = `${Math.min(100, (bits / 128) * 100)}%`;
  meterFill.style.background = level.color;
  strengthLabel.textContent = t('strengthBits', [t(level.label), String(Math.round(bits))]);
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await saveSettings(settings);
    status.classList.add('visible');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => status.classList.remove('visible'), 1500);
  }, SAVE_DELAY_MS);
}

function handleChange() {
  settings = readForm();
  const error = validate(settings);
  showError(error);
  updatePreview();
  if (!error) scheduleSave();
}

lengthRange.addEventListener('input', () => {
  lengthNumber.value = lengthRange.value;
  handleChange();
});

lengthNumber.addEventListener('input', () => {
  lengthRange.value = clampLength(lengthNumber.value);
  handleChange();
});

lengthNumber.addEventListener('change', () => {
  lengthNumber.value = clampLength(lengthNumber.value);
});

symbolSet.addEventListener('input', handleChange);

symbolSet.addEventListener('change', () => {
  symbolSet.value = sanitizeSymbols(symbolSet.value);
});

$('reset-symbols').addEventListener('click', () => {
  symbolSet.value = DEFAULT_SYMBOLS;
  handleChange();
});

for (const key of Object.keys(TOGGLES)) {
  TOGGLES[key].addEventListener('change', (event) => {
    // Não permite desmarcar o último tipo de caractere.
    if (TYPE_KEYS.includes(key) && !TYPE_KEYS.some((k) => TOGGLES[k].checked)) {
      event.target.checked = true;
      showError('errorKeepOneType');
      hintTimer = setTimeout(() => showError(null), HINT_DURATION_MS);
      return;
    }
    handleChange();
  });
}

$('regenerate').addEventListener('click', updatePreview);

// Na instalação a página abre numa aba, com cabeçalho e boas-vindas. No diálogo de opções
// do Chrome o cabeçalho é omitido, porque o próprio diálogo já mostra ícone e nome.
const isWelcome = new URLSearchParams(location.search).has('welcome');
$('page-header').hidden = !isWelcome;
$('welcome').hidden = !isWelcome;

// Atalho de teclado.
chrome.commands.getAll().then((commands) => {
  const action = commands.find((c) => c.name === '_execute_action');
  $('shortcut-keys').textContent = action?.shortcut || t('shortcutNone');
});
$('change-shortcut').addEventListener('click', () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
});

// Rodapé.
if (DONATION_URL) {
  $('donate').href = DONATION_URL;
  $('donate').hidden = false;
  $('support-text').hidden = false;
}
if (SOURCE_URL) {
  $('source').href = SOURCE_URL;
  $('source').hidden = false;
}
$('rate').href = `https://chromewebstore.google.com/detail/${chrome.runtime.id}/reviews`;
$('version').textContent = t('version', chrome.runtime.getManifest().version);

settings = await loadSettings();
fillForm();
showError(validate(settings));
updatePreview();
