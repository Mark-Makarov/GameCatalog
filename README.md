# GameCatalog

## Тестовое задание, ТЗ

из вариантов используемых библиотек : React virtualised list для оптимизации списка игр на главной
.env переменные не используются, были захардкожены значения ключей api

Приложение будет состоять из двух страниц:
/ - главная, каталог игр:
Необходимый функционал
Пагинация (в идеале, бесконечный скролл)
Сортировка по: рейтингу и дате релиза игры (в обе стороны)
Фильтрация по платформам
Поиск по названию
Содержимое каждой “плитки” игры:
Название
Постер
Рейтинг
Дата релиза
/game/[slug] - страница игры, на которую можно попасть, кликнув на плитку игры в каталоге, должна содержать более полную информацию об игре (помимо имевшейся на плитке):
Описание
Ссылка на сайт игры
Слайдер со скриншотами игры
