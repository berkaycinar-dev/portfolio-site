/* Renders the content of data.js into the pages. Re-renders when the language changes. */
(function () {
  var S = window.SITE || {};
  var P = S.profile || {};
  var lang = function () { return window.I18N && window.I18N.lang === "en" ? "en" : "tr"; };

  /* "text" or {tr, en} -> text in the selected language */
  var t = function (v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang()] != null ? v[lang()] : (v.tr || "");
  };
  /* list: [..] or {tr:[..], en:[..]} */
  var list = function (v) {
    if (Array.isArray(v)) return v;
    return (v && (v[lang()] || v.tr)) || [];
  };
  var UI = {
    tr: { live: "Canlı", github: "GitHub ↗", demo: "Canlı demo ↗", more: "Daha fazla göster" },
    en: { live: "Live", github: "GitHub ↗", demo: "Live demo ↗", more: "Show more" }
  };
  /* how many projects are visible before the "Show more" button (set in data.js) */
  var visible = (S.settings && S.settings.projectsVisible) || 8;
  var expanded = false;
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
    var shown = expanded ? projects : projects.slice(0, visible);
    fill("projects-list", shown.map(projItem).join(""));
    var rest = projects.length - shown.length;
    fill("projects-more", rest > 0
      ? '<button type="button" class="btn ghost" id="show-more">' + UI[lang()].more + " (" + rest + ")</button>"
      : "");

    var fi = projects.findIndex(function (p) { return p.featured; });
    if (fi < 0) fi = 0;
    fill("featured", projects.length ? projItem(projects[fi], 0) : "");

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

  var moreBox = document.getElementById("projects-more");
  if (moreBox) moreBox.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest("#show-more")) return;
    expanded = true;
    render();
    /* keep keyboard focus where the new projects start */
    var first = document.querySelectorAll("#projects-list .proj")[visible];
    if (first) { first.setAttribute("tabindex", "-1"); first.focus({ preventScroll: true }); }
  });

  render();
  document.addEventListener("langchange", render);
})();
