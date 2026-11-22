(function () {
  var UI = {
    tr: {
      locale: "tr-TR", week: "Hafta ", read: "Yazıyı oku →", all: "← Tüm yazılar",
      empty: "Henüz yazı yok. İlk yazı yakında burada olacak.",
      older: "← Önceki yazı", newer: "Sonraki yazı →",
      nfTitle: "Yazı bulunamadı", nfText: "Aradığınız yazı yok ya da taşınmış olabilir.", back: "← Tüm yazılara dön"
    },
    en: {
      locale: "en-GB", week: "Week ", read: "Read post →", all: "← All posts",
      empty: "No posts yet. The first one will be here soon.",
      older: "← Older post", newer: "Newer post →",
      nfTitle: "Post not found", nfText: "The post you are looking for does not exist or may have moved.", back: "← Back to all posts"
    }
  };

  var P = (window.POSTS || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
  var lang = function () { return (window.I18N && window.I18N.lang) === "en" ? "en" : "tr"; };
  var T = function () { return UI[lang()]; };
  var fmt = function (d, opts) { return new Date(d + "T12:00:00").toLocaleDateString(T().locale, opts || { day: "numeric", month: "long", year: "numeric" }); };
  /* seçili dildeki alanları döndürür; çeviri yoksa Türkçeye düşer */
  var L = function (p) { return lang() === "en" && p.en ? { tag: p.en.tag || p.tag, title: p.en.title || p.title, summary: p.en.summary || p.summary, body: p.en.body || p.body } : p; };
  var link = function (p) { return "yazi.html?s=" + encodeURIComponent(p.slug); };

  var card = function (p) {
    var x = L(p);
    return '<article class="post">' +
      '<div class="meta"><span>' + T().week + p.issue + '</span><span>' + fmt(p.date) + '</span><span>' + x.tag + '</span></div>' +
      '<h3><a href="' + link(p) + '">' + x.title + '</a></h3>' +
      '<p>' + x.summary + '</p>' +
      '<a class="more" href="' + link(p) + '">' + T().read + '</a></article>';
  };
  var empty = function () { return '<p class="empty">' + T().empty + '</p>'; };

  function render() {
    var list = document.getElementById("posts");
    if (list) list.innerHTML = P.length ? P.map(card).join("") : empty();

    var latest = document.getElementById("latest");
    if (latest) latest.innerHTML = P.length ? card(P[0]) : empty();

    var today = document.querySelectorAll("[data-today]");
    for (var i = 0; i < today.length; i++) today[i].textContent = fmt(new Date().toISOString().slice(0, 10));

    var one = document.getElementById("post");
    if (!one) return;
    var slug = new URLSearchParams(location.search).get("s");
    var idx = P.findIndex(function (x) { return x.slug === slug; });
    if (idx < 0) {
      one.innerHTML = '<h1 class="page">' + T().nfTitle + '</h1><p class="lead">' + T().nfText + '</p><p><a class="more" href="blog.html">' + T().back + '</a></p>';
      return;
    }
    var p = P[idx], x = L(p), newer = P[idx - 1], older = P[idx + 1];
    document.title = x.title + " — Berkay Çınar";
    one.innerHTML =
      '<div class="meta"><span>' + T().week + p.issue + '</span><span>' + fmt(p.date) + '</span><span>' + x.tag + '</span></div>' +
      '<h1 class="page">' + x.title + '</h1>' +
      '<div class="prose">' + x.body + '</div>' +
      '<nav class="pn">' +
        (older ? '<a href="' + link(older) + '"><small>' + T().older + '</small>' + L(older).title + '</a>' : '<span></span>') +
        (newer ? '<a class="r" href="' + link(newer) + '"><small>' + T().newer + '</small>' + L(newer).title + '</a>' : '<span></span>') +
      '</nav>' +
      '<p><a class="more" href="blog.html">' + T().all + '</a></p>';
  }

  render();
  document.addEventListener("langchange", render);
})();
