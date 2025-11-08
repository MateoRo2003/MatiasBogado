document.addEventListener("DOMContentLoaded", () => {
  i18next.init({
    lng: localStorage.getItem("lang") || "es",
    debug: false,
    resources: {
      es: { translation: window.esTranslations },
      en: { translation: window.enTranslations },
      pt: { translation: window.ptTranslations }
    }
  }).then(() => {
    updateContent();
  });

  function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = i18next.t(key);
    });
    updateCurrentLangLabel();
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      i18next.changeLanguage(lang).then(() => {
        localStorage.setItem("lang", lang);
        updateContent();
      });
    });
  });

  function updateCurrentLangLabel() {
    const label = document.getElementById("current-lang");
    if (!label) return; // evita error si no existe
    const names = { es: "Español 🇦🇷", en: "English 🇺🇸", pt: "Português 🇧🇷" };
    label.innerText = names[i18next.language] || "Español 🇦🇷";
  }
  i18next.t('header.nav.home')

});
