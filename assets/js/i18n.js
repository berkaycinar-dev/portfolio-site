/*
  DİL KATMANI (TR / EN) — yalnızca sayfaların SABİT metinleri
  ------------------------------------------------------------
  Menü, başlıklar, düğmeler gibi HTML'e yazılı metinlerin İngilizce karşılıkları burada.
  Projeler, deneyim, beceriler, sertifikalar ve hakkımda metni data.js içinde kendi çevirisiyle gelir.
  Blog yazılarının çevirisi posts.js içindeki "en" alanındadır.
  Bir sabit metni HTML'de değiştirirseniz, aşağıdaki Türkçe anahtarı da aynı şekilde güncelleyin.
*/
(function () {
  var D = {
    /* menü ve altbilgi */
    "Ana Sayfa": "Home", "Hakkımda": "About", "Projeler": "Projects", "Deneyim": "Experience",
    "Beceriler": "Skills", "İletişim": "Contact",
    "Yazılım Mühendisliği Öğrencisi · Ankara": "Software Engineering Student · Ankara",

    /* ana sayfa */
    "Yazılım Mühendisliği Öğrencisi": "Software Engineering Student",
    "Arayüzleri düzenli, anlaşılır ve canlıda çalışır hâle getiren; front-end odaklı, full-stack yönünde ilerleyen bir geliştirici adayı.":
      "An aspiring developer, front-end focused and moving toward full-stack, who turns interfaces into tidy, clear products that run live.",
    "Projelere göz at": "Browse projects", "Blog'u oku": "Read the blog",
    "Son yazı": "Latest post", "Tüm yazılar →": "All posts →",
    "Öne çıkan": "Featured", "Öne çıkan proje": "A featured project", "Tüm projeler →": "All projects →",
    "Keşfet": "Explore", "Sayfalar": "Pages",
    "Kısaca ben, eğitim ve diller": "A short intro, education and languages",
    "Staj ve çalışma deneyimlerim": "Internships and work experience",
    "Teknolojiler ve sertifikalar": "Technologies and certificates",
    "E-posta, GitHub ve CV": "Email, GitHub and CV",

    /* projeler */
    "02 — Projeler": "02 — Projects",
    "Web'den masaüstüne projelerim.": "My projects, from web to desktop.",
    "Denediğim, geliştirdiğim ve yayınladığım işler. Hepsi öğrenerek ve deneyerek büyüdü.":
      "Things I've tried, built and published. All of them grew by learning and experimenting.",

    /* hakkımda */
    "01 — Hakkımda": "01 — About", "Kısaca ben.": "In short, me.",
    "\"Sorumluluk sahibi, düzenli ve öğrenmeye açık.\"": "\"Responsible, organized and eager to learn.\"",
    "Eğitim": "Education", "Okul": "School", "Diller": "Languages", "Konuştuklarım": "What I speak",

    /* deneyim */
    "03 — Deneyim": "03 — Experience", "Staj ve çalışma hayatı.": "Internships and work life.",

    /* beceriler */
    "04 — Beceriler": "04 — Skills", "Araçlar ve sertifikalar.": "Tools and certificates.",
    "Sertifikalar": "Certificates", "Öğrendiklerim, belgeli.": "What I've learned, documented.",

    /* blog sayfası */
    "05 — Blog": "05 — Blog", "Haftalık notlar.": "Weekly notes.",
    "Her hafta öğrendiğim, denediğim ve üzerine düşündüğüm bir şey.": "Something I learned, tried or thought about each week.",

    /* iletişim */
    "06 — İletişim": "06 — Contact", "Birlikte çalışalım.": "Let's work together.",
    "Konum": "Location", "Özgeçmiş": "Résumé", "CV'yi indir (PDF)": "Download CV (PDF)"
  };

  var TITLES = {
    "Ana Sayfa": "Home", "Hakkımda": "About", "Projeler": "Projects", "Deneyim": "Experience",
    "Beceriler": "Skills", "Blog": "Blog", "İletişim": "Contact"
  };

  var KEY = "lang";
  function detect() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q === "en" || q === "tr") { localStorage.setItem(KEY, q); return q; }
      var s = localStorage.getItem(KEY);
      if (s === "en" || s === "tr") return s;
    } catch (e) {}
    return (navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  }

  var I18N = window.I18N = { lang: detect() };
  var origTitle = document.title;

  /* JavaScript ile çizilen alanlar (data-dyn) kendi dilini yönetir; buradan çevrilmez */
  function inDynamic(node) {
    for (var el = node.parentNode; el && el !== document.body; el = el.parentNode) {
      if (el.hasAttribute && el.hasAttribute("data-dyn")) return true;
      if (el.nodeName === "SCRIPT" || el.nodeName === "STYLE") return true;
    }
    return false;
  }

  function apply() {
    var en = I18N.lang === "en";
    document.documentElement.lang = I18N.lang;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (inDynamic(node)) return;
      if (node.__o === undefined) node.__o = node.nodeValue;
      var key = node.__o.replace(/\s+/g, " ").trim();
      if (en && D[key]) {
        node.nodeValue = node.__o.replace(/\S[\s\S]*\S|\S/, function () { return D[key]; });
      } else {
        node.nodeValue = node.__o;
      }
    });
    if (!document.getElementById("post")) {
      var parts = origTitle.split(" — ");
      document.title = en && TITLES[parts[0]] ? TITLES[parts[0]] + " — " + parts.slice(1).join(" — ") : origTitle;
    }
    var btns = document.querySelectorAll(".langsw button");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-l") === I18N.lang;
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
      btns[i].classList.toggle("on", on);
    }
    var nav = document.querySelector("nav[aria-label]");
    if (nav) nav.setAttribute("aria-label", en ? "Main menu" : "Ana menü");
  }

  function set(lang) {
    I18N.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  I18N.set = set;

  var row = document.querySelector(".top .row");
  if (row) {
    var sw = document.createElement("div");
    sw.className = "langsw";
    sw.setAttribute("role", "group");
    sw.setAttribute("aria-label", "Language / Dil");
    sw.innerHTML = '<button type="button" data-l="tr">TR</button><button type="button" data-l="en">EN</button>';
    sw.addEventListener("click", function (e) {
      var l = e.target && e.target.getAttribute && e.target.getAttribute("data-l");
      if (l) set(l);
    });
    row.appendChild(sw);
  }
  apply();
})();
