# Siteye içerik ekleme rehberi

Sitede kod yazmanız gerekmez. Değişen her şey **2 dosyada** tutulur:

| Ne eklemek istiyorsunuz? | Dosya |
|---|---|
| Haftalık blog yazısı | `content/posts.js` |
| Yeni proje, deneyim, sertifika, beceri, hakkımda metni, ana sayfa bilgileri | `content/data.js` |

Dosyayı bir metin düzenleyicide (VS Code, Not Defteri) açın, kayıt ekleyin, kaydedin, tarayıcıda sayfayı yenileyin. Hepsi bu.
Her iki dosyanın en üstündeki yorumda şablonlar da yazıyor.

---

## 1) Yeni blog yazısı → `content/posts.js`

`window.POSTS = [` satırının hemen altına, EN ÜSTE ekleyin:

```js
  {
    slug: "hafta-2-react-notlari",       // adres kısmı: küçük harf, boşluksuz, benzersiz
    issue: 2,                             // hafta numarası
    date: "2026-11-29",                   // YYYY-AA-GG
    tag: "React",                         // etiket
    title: "Bu hafta React'te ne öğrendim",
    summary: "Listede görünen 1-2 cümlelik özet.",
    body: `
      <p>Yazının metni. HTML kullanabilirsiniz.</p>
      <h2>Alt başlık</h2>
      <ul><li>Madde 1</li><li>Madde 2</li></ul>
    `,
    en: {                                 // İngilizce (isteğe bağlı)
      tag: "React",
      title: "What I learned in React this week",
      summary: "A one or two sentence summary.",
      body: `<p>The post text.</p>`
    }
  },
```

Kendiliğinden güncellenenler: blog listesi, ana sayfadaki "Son yazı", yazı sayfası, önceki/sonraki bağlantıları.
Başlangıçtaki "Yakında burada" duyurusunu (`yakinda-haftalik-blog`) ilk gerçek yazınızdan sonra silebilir ya da bırakabilirsiniz.
`issue` (hafta numarası) isteğe bağlıdır; yazmazsanız "Hafta N" etiketi çıkmaz.

---

## 2) Yeni proje → `content/data.js` içindeki `projects`

Listenin EN ÜSTÜNE ekleyin:

```js
    {
      name: "Proje Adı",
      desc: { tr: "Ne yapıyor, kısaca.", en: "What it does, briefly." },
      tech: "React · Vite · CSS",
      github: "https://github.com/berkaycinar-dev/proje-repo",
      demo: "https://proje.vercel.app",   // canlı adres yoksa bu satırı silin
      featured: true                      // ana sayfada öne çıksın istiyorsanız
    },
```

- `demo` yazarsanız "Canlı" rozeti ve "Canlı demo ↗" bağlantısı otomatik çıkar.
- `featured: true` olan ilk proje ana sayfada gösterilir. Başka projeyi öne çıkaracaksanız eskisinden `featured` satırını silin.
- Numaralar (01, 02 ...) otomatik verilir.

## 3) Yeni deneyim → `jobs`

```js
    {
      date: { tr: "Ocak 2027 – Mart 2027", en: "January 2027 – March 2027" },
      role: { tr: "Stajyer", en: "Intern" },
      company: "Şirket Adı",
      bullets: {
        tr: ["Yaptığım iş 1.", "Yaptığım iş 2."],
        en: ["What I did 1.", "What I did 2."]
      }
    },
```

## 4) Yeni sertifika → `certs`

```js
    { name: "Sertifika Adı", issuer: "Veren Kurum" },
    // Türkçe ad ve İngilizce karşılığı için:
    { name: { tr: "Veri Analizi", en: "Data Analysis" }, issuer: "Kurum" },
```

## 5) Beceri → `skills`

Yeni kategori: `{ label: "Başlık", items: "Madde, Madde" }`
Mevcut kategoriye eklemek için ilgili `items` metninin sonuna `, Yeni Beceri` yazın.

## 6) Hakkımda, okul, GNO, diller → `content/data.js` içindeki `profile`

- `facts`: ana sayfadaki sağ üst kutu (okul, GNO, odak, konum, diller)
- `about`: hakkımda paragrafları
- `education`, `languages`: hakkımda sayfasındaki bölümler

---

## Metin yazma kuralı (TR / EN)

```js
"Düz metin"                          // iki dilde de aynı (isim, teknoloji adı)
{ tr: "Türkçe", en: "English" }      // dile göre değişir
```
İngilizce yazmazsanız Türkçe gösterilir; site bozulmaz.

## Bu dosyalarda DEĞİŞMESİ GEREKMEYENLER

`assets/css/style.css` (tasarım) ve `assets/js/` klasörü (`site.js`, `blog.js`, `i18n.js`, `theme.js` — çalışma mantığı).
Menü, sayfa başlıkları ve düğmeler gibi **sabit metinleri** değiştirirseniz, `assets/js/i18n.js` içindeki aynı Türkçe cümleyi de güncelleyin (aksi halde İngilizce modda çevrilmez).

## Sık sorunlar

- **Sayfada hiçbir şey çıkmıyor:** Son kaydettiğiniz dosyada virgül ya da tırnak eksik olabilir. Her kayıt `},` ile bitmeli, metinler tırnak içinde olmalı. Tarayıcıda F12 → Console'da hata satırı görünür.
- **Değişiklik görünmüyor:** Sayfayı `Ctrl + F5` ile yenileyin.
- **Yazı içinde tırnak sorunu:** `body` alanı ters tırnak (`` ` ``) içindedir; metnin içinde ters tırnak kullanmayın. Diğer alanlarda `"` kullanacaksanız önüne `\` koyun.
- **Yayınlama:** Siteyi Vercel/GitHub Pages'e yüklediyseniz, dosyayı güncelleyip yeniden yüklemeniz (ya da GitHub'a göndermeniz) yeterlidir.
