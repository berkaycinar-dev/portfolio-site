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

  /* ---------- order projects by their GitHub commit count (most first) ----------
     Counts come from the GitHub API and are cached for a few hours. Until they arrive,
     or if the API cannot be reached, the order in data.js is used. */
  var commits = {};
  var CACHE_KEY = "projectCommits";
  var CACHE_TTL = 6 * 60 * 60 * 1000;
  var repoOf = function (p) {
    var m = p.github && p.github.match(/github\.com\/([^\/]+\/[^\/#?]+)/);
    return m ? m[1].replace(/\.git$/, "") : null;
  };
  function sortedProjects() {
    return (S.projects || []).map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) {
        var ca = commits[repoOf(a.p)], cb = commits[repoOf(b.p)];
        return (cb != null ? cb : -1) - (ca != null ? ca : -1) || a.i - b.i;
      })
      .map(function (x) { return x.p; });
  }
  function countCommits(repo) {
    return fetch("https://api.github.com/repos/" + repo + "/commits?per_page=1")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        var last = (r.headers.get("Link") || "").match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
        return last ? +last[1] : r.json().then(function (a) { return a.length; });
      });
  }
  function loadCommits() {
    if (!document.getElementById("projects-list") || !window.fetch) return;
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (c && Date.now() - c.at < CACHE_TTL) { commits = c.counts; return; }
    } catch (e) { /* storage unavailable */ }
    var repos = (S.projects || []).map(repoOf).filter(Boolean);
    Promise.all(repos.map(function (r) {
      return countCommits(r).then(function (n) { return [r, n]; }, function () { return null; });
    })).then(function (pairs) {
      var counts = {};
      pairs.forEach(function (x) { if (x) counts[x[0]] = x[1]; });
      if (!Object.keys(counts).length) return;
      commits = counts;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), counts: counts })); } catch (e) { /* ignore */ }
      render();
    });
  }

  function render() {
    var projects = sortedProjects();
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

  loadCommits();
  render();
  document.addEventListener("langchange", render);
})();
