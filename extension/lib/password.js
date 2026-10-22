// Geração de senhas e configurações compartilhadas entre o popup e a página de opções.

export const LENGTH_MIN = 4;
export const LENGTH_MAX = 128;

export const DEFAULT_SYMBOLS = '!@#$%&*()-_=+[]{};:,.<>?/';

// Caracteres fáceis de confundir visualmente.
export const AMBIGUOUS = 'O0o1lI|';

export const DEFAULTS = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  symbolSet: DEFAULT_SYMBOLS,
  excludeAmbiguous: false,
};

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
};

export async function loadSettings() {
  return chrome.storage.sync.get(DEFAULTS);
}

export function saveSettings(settings) {
  return chrome.storage.sync.set(settings);
}

export function clampLength(value) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return DEFAULTS.length;
  return Math.min(LENGTH_MAX, Math.max(LENGTH_MIN, n));
}

// Mantém só símbolos (sem letras, números ou espaços) e remove repetidos.
export function sanitizeSymbols(text) {
  const chars = Array.from(text).filter((c) => !/[\p{L}\p{N}\s]/u.test(c));
  return [...new Set(chars)].join('');
}

// Lista de grupos de caracteres ativos, cada um como array de caracteres.
export function buildPools(settings) {
  const sources = [];
  if (settings.uppercase) sources.push(CHARSETS.uppercase);
  if (settings.lowercase) sources.push(CHARSETS.lowercase);
  if (settings.numbers) sources.push(CHARSETS.numbers);
  if (settings.symbols) sources.push(sanitizeSymbols(settings.symbolSet));

  return sources
    .map((source) => Array.from(source).filter((c) => !settings.excludeAmbiguous || !AMBIGUOUS.includes(c)))
    .filter((pool) => pool.length > 0);
}

// Retorna a chave (em _locales) da mensagem de erro, ou null se as configurações forem válidas.
export function validate(settings) {
  if (!settings.uppercase && !settings.lowercase && !settings.numbers && !settings.symbols) {
    return 'errorNoType';
  }
  if (settings.symbols) {
    const symbols = Array.from(sanitizeSymbols(settings.symbolSet))
      .filter((c) => !settings.excludeAmbiguous || !AMBIGUOUS.includes(c));
    if (symbols.length === 0) return 'errorNoSymbol';
  }
  return null;
}

// Inteiro aleatório e sem viés em [0, max), usando o gerador criptográfico.
function randomInt(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limit);
  return buffer[0] % max;
}

export function generatePassword(settings) {
  const pools = buildPools(settings);
  if (pools.length === 0) throw new Error('NO_CHARSET');

  const length = clampLength(settings.length);
  const all = [...new Set(pools.flat())];

  // Garante pelo menos um caractere de cada tipo selecionado.
  const chars = pools.map((pool) => pool[randomInt(pool.length)]);
  while (chars.length < length) chars.push(all[randomInt(all.length)]);

  // Embaralha (Fisher–Yates) para que os caracteres garantidos não fiquem no início.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

// Entropia aproximada em bits.
export function estimateEntropy(settings) {
  const size = new Set(buildPools(settings).flat()).size;
  return size > 1 ? clampLength(settings.length) * Math.log2(size) : 0;
}
