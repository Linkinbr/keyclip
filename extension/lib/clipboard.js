export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Plano B caso a API assíncrona recuse (ex.: popup ainda sem foco).
    const textarea = document.createElement('textarea');
    textarea.className = 'clipboard-fallback';
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('COPY_FAILED');
  }
}
