/*
  BLOG YAZILARI
  -------------
  Yeni haftalık yazı eklemek için aşağıdaki listenin EN ÜSTÜNE yeni bir nesne ekleyin.
  Başka hiçbir dosyayı değiştirmeniz gerekmez; liste, ana sayfadaki "Bu haftanın yazısı" ve yazı sayfası otomatik güncellenir.

  Alanlar (Türkçe):
    slug    : adres kısmı (küçük harf, boşluksuz, ör. "hafta-2-react-notlari")
    issue   : hafta / sayı numarası (isteğe bağlı; yazmazsanız etiket çıkmaz)
    date    : "YYYY-AA-GG" biçiminde yayın tarihi
    tag     : kategori etiketi (ör. "React", "Staj", "Not")
    title   : başlık
    summary : liste ekranında görünen kısa özet
    body    : yazının gövdesi, HTML olarak (<p>, <h2>, <ul>, <blockquote>, <pre><code> kullanabilirsiniz)

  İngilizce çeviri (isteğe bağlı):
    en: { tag, title, summary, body }
    "en" alanı yoksa, İngilizce modda yazı Türkçe olarak gösterilir.
*/
window.POSTS = [
  {
    slug: "yakinda-haftalik-blog",
    date: "2026-11-22",
    tag: "Duyuru",
    title: "Yakında burada: haftalık blog",
    summary: "Her hafta öğrendiklerimi, denediklerimi ve projelerimden notları paylaşacağım. İlk yazılar çok yakında.",
    body: `
      <p>Merhaba! Burası çok yakında her hafta güncellenen bir blog olacak.</p>
      <h2>Neler paylaşacağım?</h2>
      <ul>
        <li>Hafta içinde öğrendiğim bir konu (React, SQL, C# ...)</li>
        <li>Üzerinde çalıştığım projelerden notlar ve karşılaştığım zorluklar</li>
        <li>Staj ve üniversite deneyimlerim</li>
        <li>Okuduğum makalelerden ve izlediğim eğitimlerden özetler</li>
      </ul>
      <h2>Neden yazıyorum?</h2>
      <p>Öğrendiğim bir şeyi yazıya dökmek, onu gerçekten anlamamı sağlıyor. Aynı yolda ilerleyenlere de faydası olursa çok sevinirim.</p>
      <blockquote>Küçük ama düzenli yazmak, büyük ama nadir yazmaktan iyidir.</blockquote>
      <p>Takipte kalın, ilk yazılar çok yakında burada. Görüşmek üzere!</p>
    `,
    en: {
      tag: "Announcement",
      title: "Coming soon: a weekly blog",
      summary: "Every week I will share what I learned, what I tried and notes from my projects. The first posts are coming very soon.",
      body: `
        <p>Hello! Very soon this place will be a blog updated every week.</p>
        <h2>What will I share?</h2>
        <ul>
          <li>A topic I learned during the week (React, SQL, C# ...)</li>
          <li>Notes from the projects I work on and the challenges I run into</li>
          <li>My internship and university experiences</li>
          <li>Summaries of articles I read and courses I watched</li>
        </ul>
        <h2>Why am I writing?</h2>
        <p>Writing down something I learned helps me truly understand it. If it helps others on the same path, I will be very happy.</p>
        <blockquote>Writing a little but regularly beats writing a lot but rarely.</blockquote>
        <p>Stay tuned, the first posts will be here very soon. See you!</p>
      `
    }
  }
];
