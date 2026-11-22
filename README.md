# Berkay Çınar — Portfolyo Sitesi

Yazılım Mühendisliği öğrencisi olarak projelerimi, deneyimlerimi ve haftalık yazılarımı paylaştığım kişisel portfolyo sitesi.
Saf HTML, CSS ve JavaScript ile yazıldı; derleme ya da kurulum gerektirmez.

Tasarım dili: dergi kapağı estetiği. Kalın çerçeveler, sert gölgeler, büyük tipografi (Fraunces + Inter Tight).

## Özellikler

- **Çok sayfalı yapı:** Ana Sayfa, Hakkımda, Projeler, Deneyim, Beceriler, Blog, İletişim
- **Haftalık blog:** yazı listesi, tek yazı sayfası, önceki/sonraki gezintisi
- **İki dil:** Türkçe / İngilizce anahtarı, seçim hatırlanır
- **Açık / karanlık tema:** sistem temasına uyar, seçim hatırlanır
- **Veriyle yönetilen içerik:** yeni proje, deneyim ya da sertifika eklemek için tek bir dosyaya kayıt eklemek yeterli
- **Duyarlı tasarım:** telefon, tablet ve masaüstünde çalışır; hareket azaltma ayarına saygı gösterir

## Çalıştırma

Kurulum yok. `index.html` dosyasını tarayıcıda açmanız yeterli.

İsterseniz yerel sunucuyla da açabilirsiniz:

```bash
npx serve
```

## Klasör yapısı

```
.
├─ index.html, hakkimda.html, projeler.html,
│  deneyim.html, beceriler.html, blog.html,
│  yazi.html, iletisim.html     → sayfalar
├─ content/
│  ├─ data.js                   → projeler, deneyim, beceriler, sertifikalar, hakkımda
│  └─ posts.js                  → blog yazıları
├─ assets/
│  ├─ css/style.css             → tasarım (açık ve karanlık tema dahil)
│  ├─ js/                       → site.js, blog.js, i18n.js, theme.js
│  └─ Berkay_Cinar_CV.pdf
└─ docs/REHBER.md               → içerik ekleme rehberi
```

## İçerik ekleme

| Eklemek istediğiniz | Dosya |
|---|---|
| Haftalık blog yazısı | `content/posts.js` |
| Proje, deneyim, sertifika, beceri, hakkımda metni | `content/data.js` |

Dosyaya bir kayıt ekleyip kaydetmek yeterlidir; sayfalar kendiliğinden güncellenir.
Şablonlar ve adım adım anlatım için [`docs/REHBER.md`](docs/REHBER.md) dosyasına bakın.

## Yayınlama

Statik bir site olduğu için Vercel, GitHub Pages ya da Netlify ile doğrudan yayınlanabilir.
Ek ayar gerekmez; yayın kökü deponun kendisidir.

## Teknolojiler

HTML5 · CSS3 · JavaScript (ES5, bağımlılıksız) · Google Fonts

## İletişim

[github.com/berkaycinar-dev](https://github.com/berkaycinar-dev) · berkaycnr6767@gmail.com
