# Keyclip

Extensão para o Google Chrome que gera uma senha forte e copia para a área de transferência com um clique.

Clique no ícone (ou use `Ctrl+Shift+Y`) e aparece só um pequeno aviso "Senha copiada!", que some sozinho.

*English: Keyclip is a Chrome extension that generates a strong random password and copies it to your clipboard in one click. Available in English and Brazilian Portuguese.*

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/vlima)

## Estrutura

```
extension/   código da extensão
build.sh     gera o .zip da extensão em dist/
PRIVACY.md   política de privacidade
```

## Instalar para testar

1. Abra `chrome://extensions` no Chrome.
2. Ative o **Modo do desenvolvedor** (canto superior direito).
3. Clique em **Carregar sem compactação** e selecione a pasta `extension`.
4. Clique no ícone de quebra-cabeça da barra de ferramentas e **fixe** o Keyclip.

Depois de editar algum arquivo, clique no botão de recarregar da extensão em `chrome://extensions`.

## Configurar

Clique com o botão direito no ícone da extensão e escolha **Opções**:

- **Tamanho** (de 4 a 128 caracteres)
- **Letras maiúsculas**, **letras minúsculas**, **números** e **símbolos**
- **Símbolos permitidos**: útil para sites que aceitam só alguns símbolos
- **Evitar caracteres parecidos** (`0 O o 1 l I |`)

As alterações são salvas automaticamente e sincronizadas com a conta do Chrome. O atalho de teclado pode ser trocado em `chrome://extensions/shortcuts`.

## Idiomas

Inglês (padrão) e português do Brasil, em `extension/_locales/`. O Chrome escolhe conforme o idioma do navegador.

## Rodapé

Os links de doação (Buy Me a Coffee) e do repositório ficam em `extension/config.js` e aparecem como botões no rodapé da página de opções, junto com o botão da Chrome Web Store.

## Privacidade

O Keyclip não coleta nem envia nenhum dado. Veja a [política de privacidade](PRIVACY.md).

## Detalhes técnicos

- As senhas são geradas localmente com `crypto.getRandomValues`, sem viés na escolha dos caracteres.
- Cada tipo de caractere ativado aparece pelo menos uma vez na senha.
- A senha não é salva nem enviada para lugar nenhum. Só as configurações são guardadas.
- Permissões: `storage` (configurações) e `clipboardWrite` (copiar a senha).
- O `background.js` só roda na instalação, para abrir a página de boas-vindas.

## Licença

O código está sob a licença [GNU GPL v3.0](LICENSE): você pode usar, estudar, modificar e redistribuir, desde que versões redistribuídas também sejam publicadas sob a GPL, com o código-fonte disponível.

**O nome "Keyclip" e o ícone não fazem parte da licença.** Se você publicar uma versão modificada, use outro nome e outro ícone para que ninguém confunda com o Keyclip original.

*The code is licensed under the GNU GPL v3.0. The "Keyclip" name and logo are not covered by the license: if you distribute a modified version, please use a different name and icon.*
