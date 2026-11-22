/* data.js içindeki içeriği sayfalara basar. Dil değişince yeniden çizer. */
(function () {
  var S = window.SITE || {};
  var P = S.profile || {};
  var lang = function () { return window.I18N && window.I18N.lang === "en" ? "en" : "tr"; };

  /* "metin" ya da {tr, en} → seçili dildeki metin */
  var t = function (v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang()] != null ? v[lang()] : (v.tr || "");
  };
  /* liste: [..] ya da {tr:[..], en:[..]} */
  var list = function (v) {
    if (Array.isArray(v)) return v;
    return (v && (v[lang()] || v.tr)) || [];
  };
  var UI = {
    tr: { live: "Canlı", github: "GitHub ↗", demo: "Canlı demo ↗" },
    en: { live: "Live", github: "GitHub ↗", demo: "Live demo ↗" }
  };
  var ext = function (url, label) {
    return '<a class="lnk" href="' + url + '" target="_blank" rel="noopener">' + label + "</a>";
  };

  function projItem(p, i) {
    var links = "";
    if (p.demo) links += ext(p.demo, UI[lang()].demo);
    if (p.github) links += ext(p.github, UI[lang()].github);
    var badge = p.live || p.demo ? '<span class="badge">' + UI[lang()].live + "</span>" : "";
    return '<article class="proj"><span class="n">' + String(i + 1).padStart(2, "0") + "</span><div>" +
      "<h3>" + t(p.name) + badge + "</h3><p>" + t(p.desc) + "</p>" +
      (p.tech ? '<span class="st">' + p.tech + "</span>" : "") +
      "</div><div class=\"links\">" + links + "</div></article>";
  }

  function jobItem(j) {
    var b = list(j.bullets);
    return '<div class="exp"><div class="d">' + t(j.date) + "</div><div><h3>" + t(j.role) +
      ", <span>" + t(j.company) + "</span></h3>" +
      (b.length ? "<ul>" + b.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : "") +
      "</div></div>";
  }

  function fill(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  function render() {
    var projects = S.projects || [];
    fill("projects-list", projects.map(projItem).join(""));

    var fi = projects.findIndex(function (p) { return p.featured; });
    if (fi < 0) fi = 0;
    fill("featured", projects.length ? projItem(projects[fi], fi) : "");

    fill("jobs-list", (S.jobs || []).map(jobItem).join(""));

    fill("skills-list", (S.skills || []).map(function (s) {
      return '<div class="col"><h4>' + t(s.label) + "</h4><p>" + t(s.items) + "</p></div>";
    }).join(""));

    fill("certs-list", (S.certs || []).map(function (c) {
      return "<li>" + t(c.name) + (c.issuer ? "<small>" + t(c.issuer) + "</small>" : "") + "</li>";
    }).join(""));

    fill("facts-list", (P.facts || []).map(function (f) {
      return "<dt>" + t(f.label) + "</dt><dd>" + t(f.value) + "</dd>";
    }).join(""));

    fill("about-text", list(P.about).map(function (x) { return "<p>" + x + "</p>"; }).join(""));

    fill("education-list", (P.education || []).map(function (e) {
      return '<div class="exp"><div class="d">' + t(e.date) + "</div><div><h3>" + t(e.title) +
        ", <span>" + t(e.place) + "</span></h3>" + (e.note ? '<p class="sub">' + t(e.note) + "</p>" : "") + "</div></div>";
    }).join(""));

    fill("languages-list", (P.languages || []).map(function (l) {
      return '<div class="col"><h4>' + t(l.name) + "</h4><p>" + t(l.level) + "</p></div>";
    }).join(""));
  }

  render();
  document.addEventListener("langchange", render);
})();
