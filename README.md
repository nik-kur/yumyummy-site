# yumyummy-site

Публичный сайт yumyummy.ai. Публикуется через GitHub Pages из корня ветки main.
Код приложения и внутренние документы лежат в отдельном приватном репозитории.

## Что на сайте зависит от приложения

При каждом релизе приложения (и при смене экранов или текстов в App Store) сверить и обновить:

| Что меняется в приложении или сторе | Что обновить на сайте |
|---|---|
| Иконка | `assets/app-icon.png`, `assets/apple-touch-icon.png`, `assets/favicon-64.png`, `assets/og.png` |
| Скриншоты App Store | `assets/screens/card_*` (галерея) и `assets/screens/phone_*`, `widget.*` (вырезки экранов), `assets/og.png` |
| Функции (добавили, убрали, переименовали) | Тексты блоков на `index.html`: способы записи, источники данных, советник, недельная статистика, виджет, My Menu, FAQ |
| Вход, удаление аккаунта, данные | FAQ «What happens to my data» и плитка «Your data stays yours»; при новых сервисах обработки данных — `privacy.html` |
| Цены и триал | На сайте цен и длины триала нет специально (A/B-тест, цены по странам). Если появятся — проверить FAQ «How much does it cost?» |
| ID приложения или ссылка App Store | Все ссылки `apps.apple.com/app/id6785363037`, meta `apple-itunes-app`, `assets/site.js`, `/open` |
| Android, iPad, новые языки | FAQ «Is there an Android version?», подзаголовки «for iPhone» |

Сайт публикуется из `main` сразу, поэтому правки — через ветку и PR.
