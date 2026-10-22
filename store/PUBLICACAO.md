# Publicação na Chrome Web Store

Tudo o que o painel do desenvolvedor pede, pronto para copiar e colar.

## Passo a passo

1. Confira as formas de doação em `extension/config.js` (veja "Doações" abaixo).
2. Gere o pacote com `./build.sh`. Ele cria `dist/keyclip-<versão>.zip`.
   No Windows sem bash: compacte **o conteúdo** da pasta `extension` (não a pasta em si) num .zip.
3. Crie a conta de desenvolvedor em https://chrome.google.com/webstore/devconsole (taxa única de US$ 5).
4. Clique em **Novo item** e envie o .zip.
5. Preencha as abas **Listagem da loja** e **Práticas de privacidade** com os textos abaixo.
6. Em **Distribuição**: gratuito, público, todas as regiões.
7. Envie para revisão. Como a extensão não acessa sites (sem permissões de host), a revisão costuma ser rápida.

## Rodapé: doação, GitHub e loja

O rodapé da página de opções (que também aparece na boas-vindas da instalação) tem três botões lado a lado: **Buy me a coffee**, **GitHub** e **Chrome Web Store**, com a versão logo abaixo. O popup continua só com "Senha copiada!".

Em `extension/config.js`:

- `DONATION_URL`: link de doação. Já configurado com https://buymeacoffee.com/vlima.
- `SOURCE_URL`: link do repositório. Já configurado com https://github.com/Linkinbr/keyclip.

O botão da Chrome Web Store monta o link da página de avaliações sozinho, a partir do ID da extensão. Ele funciona assim que a extensão estiver publicada.

## Listagem da loja

**Categoria:** Ferramentas (Produtividade)
**Idioma padrão:** Inglês, com tradução em Português (Brasil). Os textos de cada idioma ficam na própria listagem.

### Português (Brasil)

**Nome:** Keyclip - Gerador de Senhas
*(vem de `extension/_locales/pt_BR/messages.json`)*

**Resumo:** Gere uma senha forte e aleatória e copie para a área de transferência com um único clique.

**Descrição:**

```
Um clique no ícone e uma senha forte já está na sua área de transferência. Só aparece um pequeno aviso "Senha copiada!", que some sozinho. Sem janelas, sem passos extras.

COMO FUNCIONA
• Clique no ícone da chave ou use o atalho Ctrl+Shift+Y (⌘+Shift+Y no Mac).
• A senha é gerada e copiada na hora. É só colar onde precisar.

DO SEU JEITO
Clique com o botão direito no ícone e escolha "Opções" para ajustar:
• Tamanho, de 4 a 128 caracteres
• Letras maiúsculas, minúsculas, números e símbolos
• Quais símbolos são permitidos (útil para sites com regras específicas)
• Evitar caracteres parecidos, como 0 e O ou 1 e l
As preferências são salvas automaticamente e sincronizadas com a sua conta do Chrome.

SEGURA E PRIVADA
• Senhas geradas localmente com o gerador criptográfico do navegador (crypto.getRandomValues).
• Cada tipo de caractere ativado aparece pelo menos uma vez.
• Nenhuma senha é salva ou enviada a lugar nenhum. A extensão não acessa os sites que você visita.
• Sem cadastro, sem anúncios, sem rastreamento.
• Código aberto: qualquer pessoa pode conferir o que a extensão faz.

LEVE
Sem processos rodando em segundo plano e com apenas duas permissões: guardar as suas preferências e copiar a senha.

Gratuita e sem anúncios. Se ela te ajudar, você pode apoiar o desenvolvimento pela página de opções.
```

### English

**Name:** Keyclip - Password Generator
*(from `extension/_locales/en/messages.json`)*

**Summary:** Generate a strong random password and copy it to your clipboard with a single click.

**Description:**

```
One click on the icon and a strong password is already in your clipboard. All you see is a small "Password copied!" notice that disappears on its own. No windows, no extra steps.

HOW IT WORKS
• Click the key icon or press Ctrl+Shift+Y (⌘+Shift+Y on Mac).
• A password is generated and copied instantly. Just paste it wherever you need it.

YOUR RULES
Right-click the icon and choose "Options" to set:
• Length, from 4 to 128 characters
• Uppercase letters, lowercase letters, numbers and symbols
• Which symbols are allowed (handy for sites with specific rules)
• Skip look-alike characters such as 0 and O or 1 and l
Preferences are saved automatically and synced with your Chrome account.

SECURE AND PRIVATE
• Passwords are generated locally with the browser's cryptographic random generator (crypto.getRandomValues).
• Every enabled character type appears at least once.
• No password is ever stored or sent anywhere. The extension can't access the sites you visit.
• No sign-up, no ads, no tracking.
• Open source: anyone can check exactly what the extension does.

LIGHTWEIGHT
Nothing running in the background, and only two permissions: saving your preferences and copying the password.

Free and ad-free. If it helps you, you can support development from the options page.
```

### Imagens

Ficam em `store/images/<idioma>/`:

| Campo na loja | Arquivo |
| --- | --- |
| Capturas de tela (1280×800) | `screenshot-1.png`, `screenshot-2.png` |
| Bloco promocional pequeno (440×280) | `promo-tile-440x280.png` |
| Ícone da loja (128×128) | `extension/icons/icon128.png` |

## Práticas de privacidade

**Finalidade única:**
> Gerar senhas aleatórias de acordo com as preferências do usuário e copiá-las para a área de transferência.
>
> *Generate random passwords according to the user's preferences and copy them to the clipboard.*

**Justificativa das permissões:**

- `storage`: Salvar as preferências de geração de senha (tamanho e tipos de caractere) e sincronizá-las entre os dispositivos do usuário. / *Saves the password generation preferences (length and character types) and syncs them across the user's devices.*
- `clipboardWrite`: Copiar a senha gerada para a área de transferência, que é a função principal da extensão. / *Copies the generated password to the clipboard, which is the extension's core function.*

**Código remoto:** Não, não uso código remoto. / *No, I am not using remote code.*

**Uso de dados:** não marque nenhum tipo de dado coletado. Marque as três declarações:
- Não vendo nem transfiro dados de usuários a terceiros fora dos casos de uso aprovados.
- Não uso nem transfiro dados de usuários para fins não relacionados à finalidade única do item.
- Não uso nem transfiro dados de usuários para determinar crédito ou conceder empréstimos.

**Página inicial:** https://github.com/Linkinbr/keyclip

**URL de suporte:** https://github.com/Linkinbr/keyclip/issues

**Política de privacidade:** como a extensão não coleta dados, o campo não é obrigatório. Ainda assim, ter uma passa mais confiança. Use https://github.com/Linkinbr/keyclip/blob/main/store/POLITICA-DE-PRIVACIDADE.md

## Próximas versões

1. Aumente `version` em `extension/manifest.json` (ex.: `1.0.1`).
2. Rode `./build.sh` e envie o novo .zip em **Pacote → Enviar novo pacote**.
