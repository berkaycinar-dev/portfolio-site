(function () {
  var UI = {
    tr: {
      locale: "tr-TR", week: "Hafta ", read: "Yazıyı oku →", all: "← Tüm yazılar",
      empty: "Henüz yazı yok. İlk yazı yakında burada olacak.",
      older: "← Önceki yazı", newer: "Sonraki yazı →",
      prev: "← Önceki", next: "Sonraki →", pages: "Sayfalar",
      nfTitle: "Yazı bulunamadı", nfText: "Aradığınız yazı yok ya da taşınmış olabilir.", back: "← Tüm yazılara dön"
    },
    en: {
      locale: "en-GB", week: "Week ", read: "Read post →", all: "← All posts",
      empty: "No posts yet. The first one will be here soon.",
      older: "← Older post", newer: "Newer post →",
      prev: "← Previous", next: "Next →", pages: "Pages",
      nfTitle: "Post not found", nfText: "The post you are looking for does not exist or may have moved.", back: "← Back to all posts"
    }
  };

  var P = (window.POSTS || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
  var lang = function () { return (window.I18N && window.I18N.lang) === "en" ? "en" : "tr"; };
  var T = function () { return UI[lang()]; };
  var fmt = function (d, opts) { return new Date(d + "T12:00:00").toLocaleDateString(T().locale, opts || { day: "numeric", month: "long", year: "numeric" }); };
  /* returns the fields in the selected language; falls back to Turkish if there is no translation */
  var L = function (p) { return lang() === "en" && p.en ? { tag: p.en.tag || p.tag, title: p.en.title || p.title, summary: p.en.summary || p.summary, body: p.en.body || p.body } : p; };
  var link = function (p) { return "/post?s=" + encodeURIComponent(p.slug); };

  var card = function (p) {
    var x = L(p);
    return '<a class="post" href="' + link(p) + '">' +
      '<div class="meta">' + (p.issue ? '<span>' + T().week + p.issue + '</span>' : '') + '<span>' + fmt(p.date) + '</span><span>' + x.tag + '</span></div>' +
      '<h3>' + x.title + '</h3>' +
      '<p>' + x.summary + '</p>' +
      '<span class="more">' + T().read + '</span></a>';
  };
  var empty = function () { return '<p class="empty">' + T().empty + '</p>'; };

  /* posts per page on the blog list (set in data.js) */
  var PER = (window.SITE && window.SITE.settings && window.SITE.settings.postsPerPage) || 10;
  var pageUrl = function (n) { return n === 1 ? "/blog" : "/blog?page=" + n; };
  /* current page from ?page=N, clamped to 1..total */
  var currentPage = function (total) {
    var n = parseInt(new URLSearchParams(location.search).get("page"), 10);
    if (!(n >= 1)) n = 1;
    return Math.min(n, total);
  };
  /* numbers: first, last and the neighbours of the current page, with "..." for gaps */
  var pager = function (cur, total) {
    if (total < 2) return "";
    var nums = [], last = 0;
    for (var n = 1; n <= total; n++) {
      if (n === 1 || n === total || Math.abs(n - cur) <= 1) {
        if (last && n - last > 1) nums.push('<span class="gap">…</span>');
        nums.push(n === cur
          ? '<span class="cur" aria-current="page">' + n + '</span>'
          : '<a href="' + pageUrl(n) + '">' + n + '</a>');
        last = n;
      }
    }
    return '<nav class="pager" aria-label="' + T().pages + '">' +
      (cur > 1 ? '<a href="' + pageUrl(cur - 1) + '" rel="prev">' + T().prev + '</a>' : '<span class="off">' + T().prev + '</span>') +
      nums.join("") +
      (cur < total ? '<a href="' + pageUrl(cur + 1) + '" rel="next">' + T().next + '</a>' : '<span class="off">' + T().next + '</span>') +
      '</nav>';
  };

  function render() {
    var list = document.getElementById("posts");
    if (list) {
      if (!P.length) list.innerHTML = empty();
      else {
        var total = Math.ceil(P.length / PER), cur = currentPage(total);
        list.innerHTML = P.slice((cur - 1) * PER, cur * PER).map(card).join("") + pager(cur, total);
      }
    }

    var latest = document.getElementById("latest");
    if (latest) latest.innerHTML = P.length ? card(P[0]) : empty();

    var today = document.querySelectorAll("[data-today]");
    for (var i = 0; i < today.length; i++) today[i].textContent = fmt(new Date().toISOString().slice(0, 10));

    var one = document.getElementById("post");
    if (!one) return;
    var slug = new URLSearchParams(location.search).get("s");
    var idx = P.findIndex(function (x) { return x.slug === slug; });
    if (idx < 0) {
      one.innerHTML = '<h1 class="page">' + T().nfTitle + '</h1><p class="lead">' + T().nfText + '</p><p><a class="more" href="/blog">' + T().back + '</a></p>';
      return;
    }
    var p = P[idx], x = L(p), newer = P[idx - 1], older = P[idx + 1];
    document.title = x.title + " — Berkay Çınar";
    one.innerHTML =
      '<div class="meta">' + (p.issue ? '<span>' + T().week + p.issue + '</span>' : '') + '<span>' + fmt(p.date) + '</span><span>' + x.tag + '</span></div>' +
      '<h1 class="page">' + x.title + '</h1>' +
      '<div class="prose">' + x.body + '</div>' +
      '<nav class="pn">' +
        (older ? '<a href="' + link(older) + '"><small>' + T().older + '</small>' + L(older).title + '</a>' : '<span></span>') +
        (newer ? '<a class="r" href="' + link(newer) + '"><small>' + T().newer + '</small>' + L(newer).title + '</a>' : '<span></span>') +
      '</nav>' +
      '<p><a class="more" href="/blog">' + T().all + '</a></p>';
  }

  render();
  document.addEventListener("langchange", render);
})();
