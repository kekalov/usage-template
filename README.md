# usage-template-public

Демо FastAPI-проект для генерации и визуализации usage-метрик с помощью GPT

---

## Быстрый старт

1. **Склонируйте или скачайте данный репозиторий**
2. **Создайте виртуальное окружение и активируйте его**
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```
3. **Установите зависимости**
    ```sh
    pip install --upgrade pip
    pip install -r requirements.txt
    ```
4. **Настройте переменные окружения**
    - Скопируйте `.env.example` в `.env` и добавьте свой OpenAI API KEY.
5. **Сгенерируйте usage.json**
    ```sh
    python generate_usage.py
    ```
6. **Запустите FastAPI сервер**
    ```sh
    uvicorn insight_api:app --reload
    ```
7. **Проверьте работу сервера по адресу:**
    http://127.0.0.1:8000/docs
8. **Проверьте API:**
    ```sh
    curl "http://127.0.0.1:8000/usage-overlay/generate_insights_from_usage?data_url=http://localhost:9000/usage.json"
    ```
9. **(Опционально) Запустите сервер для раздачи usage.json**
    ```sh
    python3 -m http.server 9000
    ```
10. **Внедрите JS-сниппет на страницу:**
    Скопируйте содержимое manual_snippet.js и вставьте в консоль на нужной странице.

---

## Пример usage.json

```json
[
  {"category": "demo", "action": "click", "label": "search_button", "selector": ".test-button", "session_cnt": 120, "session_cnt_prev": 100, "session_dif_abs": 20, "percent_of_total": 0.6, "percent_of_total_dif": 0.1, "percent_of_page": 3.5, "percent_of_page_dif": 0.2, "link": "#"},
  {"category": "demo", "action": "scroll", "label": "main_banner", "selector": ".main-banner", "session_cnt": 55, "session_cnt_prev": 60, "session_dif_abs": -5, "percent_of_total": 0.3, "percent_of_total_dif": -0.05, "percent_of_page": 2.2, "percent_of_page_dif": -0.1, "link": "#"}
]
```

---

## Примечания
- Шаблон не содержит приватных данных.
- Демо предназначен для применения и обучения на любом проекте.
- Все ключи и prompts — через .env или переменные окружения пользователя.
