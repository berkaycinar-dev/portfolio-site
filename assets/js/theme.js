/* Light / dark theme toggle. The choice is stored in the browser; the first visit follows the system theme. */
(function () {
  var root = document.documentElement;
  var row = document.querySelector(".top .row");
  if (!row) return;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "themesw";
  row.appendChild(btn);

  function label() {
    var en = window.I18N && window.I18N.lang === "en";
    var dark = root.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀" : "☾";
    var text = en ? (dark ? "Switch to light theme" : "Switch to dark theme")
                  : (dark ? "Açık temaya geç" : "Karanlık temaya geç");
    btn.setAttribute("aria-label", text);
    btn.title = text;
  }

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  document.addEventListener("langchange", label);
  label();
})();

/* Scroll the mobile menu so the current page is visible */
(function () {
  var cur = document.querySelector(".top nav a[aria-current]");
  if (cur && cur.parentNode) cur.parentNode.scrollLeft = Math.max(0, cur.offsetLeft - 16);
})();
