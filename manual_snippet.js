// -- https://corp.p.ostrovok.ru/hotel/russia/moscow/mid7597068/park_inn_by_radisson_sadu/?q=2395&dates=28.06.2025-10.07.2025&guests=2and2-3&travellers=1973854-555.-8223_..&ec=02&meal_types=nomeal.breakfast&stars=1.2.3&sid=230411aa-85a3-4b69-93ab-85967db5bacf

(async function () {
  const usageUrl = "https://of.worldota.net/travel/usage.json";

  try {
    const res = await fetch(usageUrl);
    const usage = await res.json();

    console.log("USAGE LOADED:", usage);

    usage.forEach(({ selector, percent, category, action, label, sql_link }) => {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        // Добавляем рамку
        el.style.outline = "2px solid orange";

        // Добавляем бейдж
        const badge = document.createElement("div");
        badge.innerHTML = `<b>${percent}%</b><br>${category} / ${action} / ${label}`;
        badge.style.cssText = `
          position: absolute;
          background: ${percent < 10 ? 'red' : percent > 90 ? 'green' : 'orange'};
          color: white;
          font-size: 10px;
          padding: 4px 6px;
          border-radius: 4px;
          z-index: 9999;
        `;

        // Добавляем SQL ссылку, если есть
        if (sql_link) {
          const link = document.createElement("a");
          link.href = sql_link;
          link.target = "_blank";
          link.innerText = "SQL";
          link.style.cssText = "display: block; color: white; text-decoration: underline; margin-top: 2px;";
          badge.appendChild(link);
        }

        // Добавляем бейдж в документ
        const rect = el.getBoundingClientRect();
        badge.style.left = `${rect.left + window.scrollX}px`;
        badge.style.top = `${rect.top + window.scrollY - 20}px`;
        badge.style.position = 'absolute';

        document.body.appendChild(badge);
      });
    });
  } catch (err) {
    console.error("Ошибка при загрузке usage.json:", err);
  }
})();