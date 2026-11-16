# Sveltia CMS – Hungarian localization

*Magyar fordítás a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) és a [Sveltia UI](https://github.com/sveltia/sveltia-ui) felületéhez. Észrevételeket, javaslatokat szívesen fogadunk issue-ban vagy a PR-okon.*

This repository has the Hungarian (`hu`) translation of the Sveltia CMS user interface. It also has the review notes, the glossary and a validator, so other Hungarian speakers can check and improve the translation before it's submitted upstream.

| | Strings | Upstream pull request (draft) |
|---|---|---|
| [`sveltia-cms/hu.yaml`](sveltia-cms/hu.yaml) | 1,131 | [sveltia/sveltia-cms#1167](https://github.com/sveltia/sveltia-cms/pull/1167) |
| [`sveltia-ui/hu.yaml`](sveltia-ui/hu.yaml) | 100 | [sveltia/sveltia-ui#31](https://github.com/sveltia/sveltia-ui/pull/31) |

Upstream tracking issue: [sveltia/sveltia-cms#315](https://github.com/sveltia/sveltia-cms/issues/315).

## Status
- **Draft, under native-speaker review.** The translation was drafted with AI assistance and proofread string by string against the English. Imre Draskovits, a native Hungarian speaker who uses Sveltia CMS, is proofreading it before the PRs are marked ready. Reviews from other Hungarian speakers are very welcome.
- It is checked against the English at:
  - `sveltia-cms` `src/lib/locales/en-US.yaml` @ [`6510367d859a`](https://github.com/sveltia/sveltia-cms/blob/6510367d859a/src/lib/locales/en-US.yaml) (16 Nov 2026)
  - `sveltia-ui` `src/lib/locales/en-US.yaml` @ [`a71ea4284a47`](https://github.com/sveltia/sveltia-ui/blob/a71ea4284a47/src/lib/locales/en-US.yaml) (15 Nov 2026)
- Both files pass Sveltia's own `scripts/check-locales.js` with 0 errors and 0 warnings.

## How to review
1. Open an English file in [`english-source/`](english-source) next to its `hu.yaml`. Each Hungarian file has the same line count as its English source, so line *n* in one file is the same string in the other.
   - In the browser: press `.` on this repo to open github.dev, then right-click a file and choose *Open to the Side*.
2. Check the [style decisions](#style-decisions) and the [glossary](#glossary), and especially the [strings worth a careful look](#strings-worth-a-careful-look).
3. Leave feedback:
   - as an [issue](../../issues) here;
   - as a line comment on the upstream pull requests linked above;
   - or as a pull request against this repository.

## Validating changes
```sh
npm install
npm run validate
```
The validator compares each `hu.yaml` with its English source. It checks:
- YAML syntax;
- the same keys, nesting and order;
- every `{$placeholder}`, `{#tag}`/`{/tag}`, HTML tag and `` `code` `` token;
- MessageFormat 2 plural keys (Hungarian uses only `one` and `*`);
- unchanged comment and line counts;
- LF line endings and a trailing newline.

## Style decisions
- **Address:** informal *te* when direct address is needed („Biztosan törlöd?”), impersonal phrasing otherwise. This is the common choice in Hungarian software UIs.
- **Voice:** active voice rather than the passive *lesz …-va* / *kerül …-ásra* constructions („A fájlt … néven mentjük.”, „Azonnal törlődik.”).
- **Buttons and actions:** noun forms: Mentés, Törlés, Mégse, Közzététel, Feltöltés, Duplikálás.
- **Capitalisation:** sentence case (only the first word capitalised), not English Title Case.
- **Quotes:** „…” in prose, straight quotes around code and technical terms.
- **No dashes:** colons, commas or parentheses instead, e.g. „Üdvözlet: {$name}”, „{$entry}: {$field}”.
- **No article directly before a placeholder.** The article depends on the next sound, so „a(z)” is avoided. Instead, the value goes after a colon („a következő tárolóhoz: „{$repo}””), in parentheses after its noun („a beállítás (`{$option}`)”), or in a label form („Érvénytelen mezőnév: `{$name}`”).
- **Plurals:** nouns stay singular after numerals, so the `one` and `*` variants are often identical.
- **Developer-facing config messages (`config.*`):** field type names stay in English („List típusú mező”), because they are literal config values.
- **Comments:** left in English, as the [localization guide](https://github.com/sveltia/sveltia-cms/blob/main/src/lib/locales/README.md) requires.

## Glossary
| English | Magyar |
|---|---|
| entry | bejegyzés |
| collection | gyűjtemény |
| singleton | egyedi oldal |
| field | mező |
| widget | mezőtípus |
| asset | médiafájl |
| Assets / media library | Médiatár |
| folder | mappa |
| destination folder | célmappa |
| move | áthelyezés |
| publish | közzététel |
| draft | piszkozat |
| slug | URL-azonosító |
| template tag | sabloncímke |
| preview | előnézet |
| repository | tároló |
| branch | ág |
| commit | commit (verb: commitolás) |
| backend | háttérrendszer |
| workflow | munkafolyamat |
| locale | nyelv |
| access token | hozzáférési token |
| toolbar | eszköztár |
| rich text | formázott szöveg |
| relation | kapcsolat |
| thumbnail | bélyegkép |
| AI | MI |
| deploy | telepítés |
| revert (changes) | visszavonás |
| restore | visszaállítás |
| clear | kiürítés |
| fork | fork / forkolás |
| pull request | pull request |
| contributor | közreműködő |
| maintainer | karbantartó |

## Strings worth a careful look
These have reasonable alternatives. Opinions are welcome.

| Key | Current | Alternative / note |
|---|---|---|
| `create` | Új | Létrehozás |
| `assets` | Médiatár | Médiafájlok |
| `content_library` | Tartalomtár | |
| `sort_keys.commit_author` / `commit_date` | Módosította / Módosítás dátuma | Frissítette / Frissítés dátuma |
| `ascending` / `descending` | {$label}, növekvő / csökkenő | Decided (was A–Z / Z–A) |
| `sign_in_with_x` | Bejelentkezés {$service}-fiókkal | Hyphenated suffix after a placeholder |
| `powered_by` | Működteti: {$name} | |
| `create_entry_title`, `edit_x`, `rename_x`, … | „Létrehozás: {$name}” pattern | „Új {$name}” |
| `bulk_edit_cell` | {$entry}: {$field} | Decided (was {$entry} – {$field}) |
| `edit_x_locale` / `preview_x_locale` | … ({$locale}) | Locale shown in parentheses |
| `copy_from_x` / `translate_from_x` | Másolás innen: {$locale} | Másolás {$locale} nyelvről |
| `move_to` | Áthelyezés máshová… | Opens a dialog asking for the target position |
| `opacity` | Átlátszatlanság | Átlátszóság (common, but means the opposite) |
| `editor_components.alt` | Helyettesítő szöveg | Alternatív szöveg |
| `list_item_position` | {$position}. elem (összesen {$count}) | |
| `save_conflict.save_anyway` | Mentés mindenképp | Mentés ennek ellenére |
| `status.ready` | Kész | Közzétehető |
| `status.deploying` | Telepítés folyamatban | Élesítés folyamatban |
| `workflow.companion_entries` | Emellett hozzáadja: {$entries} | |
| `assets_dialog.photo_credit.insert_to_field` | Beszúrás ide: {$field} | |
| `prefs.developer.deploy_hook.title` | Telepítési webhook | |
| `prefs.developer.title` | Fejlesztő | Fejlesztői beállítások. Referenced from `local_git_not_committed` as „Beállítások > Fejlesztő”, so change both together. |
| `prefs.data.clear_data.all_data.button_label` | Összes adat törlése | Referenced from `demo_welcome.reset_hint`, so change both together. |
| UI `dismiss` | Elvetés | Bezárás |
| UI `number_input.min` / `max` | Legalább {$min} / Legfeljebb {$max} | |
| UI `combobox.select_an_option` | Lehetőség kiválasztása… | Válassz egy lehetőséget… |

## Keeping up with upstream
Sveltia adds English strings often. To sync:
1. Replace the files in `english-source/` with the current upstream `en-US.yaml` files.
2. Add the new keys to `hu.yaml` at the same line positions, with comments copied verbatim.
3. Run `npm run validate`.
4. Update the commit references in the [Status](#status) section above.

## License
- The Hungarian translation, the validator and these notes are released under the [MIT License](LICENSE).
- The English source files in `english-source/` are © Kohei Yoshino and the Sveltia contributors, from [sveltia-cms](https://github.com/sveltia/sveltia-cms) and [sveltia-ui](https://github.com/sveltia/sveltia-ui). They are used under the MIT License; see [`english-source/LICENSE`](english-source/LICENSE).
