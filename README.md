# Keyclip

A Chrome extension that generates a strong password following the rules you've set and copies it to your clipboard in a single click.

Click the icon or press `Ctrl+Shift+Y` (`⌘+Shift+Y` on Mac), which you can change. All you see is a quick "Password copied!" notice, and the password is ready to paste.

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/vlima)

## Project structure

```
extension/   extension source code
build.sh     builds the extension .zip into dist/
PRIVACY.md   privacy policy
```

## Install for development

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right corner).
3. Click **Load unpacked** and select the `extension` folder.
4. Click the puzzle icon in the toolbar and **pin** Keyclip.

After editing any file, click the extension's reload button on `chrome://extensions`.

## Settings

Right-click the extension icon and choose **Options**:

- **Length** (4 to 64 characters)
- **Uppercase letters**, **lowercase letters**, **numbers** and **symbols**
- **Allowed symbols**: handy for sites that only accept certain symbols
- **Avoid look-alike characters** (`0 O o 1 l I |`)

Changes are saved automatically and synced with your Chrome account. The keyboard shortcut can be changed at `chrome://extensions/shortcuts`.

## Languages

English (default) and Brazilian Portuguese, in `extension/_locales/`. Chrome picks one based on the browser language.

## Footer links

The donation (Buy Me a Coffee) and repository links live in `extension/config.js` and show up as buttons in the options page footer, next to the Chrome Web Store button.

## Privacy

Keyclip doesn't collect or send any data. See the [privacy policy](PRIVACY.md).

## Technical details

- Passwords are generated locally with `crypto.getRandomValues`, with no bias in character selection.
- Every enabled character type appears at least once in the password.
- Passwords are never stored or sent anywhere. Only your settings are saved.
- Permissions: `storage` (settings) and `clipboardWrite` (copying the password).
- `background.js` only runs on install, to open the welcome page.

## Building

Run `./build.sh` to create `dist/keyclip-<version>.zip`, ready to upload to the Chrome Web Store. Without bash, zip the **contents** of the `extension` folder (not the folder itself).

## License

The code is licensed under the [GNU GPL v3.0](LICENSE): you may use, study, modify and redistribute it, as long as redistributed versions are also released under the GPL with their source code available.

**The "Keyclip" name and logo are not covered by the license.** If you distribute a modified version, please use a different name and icon so it isn't confused with the original Keyclip.
