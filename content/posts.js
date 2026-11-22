/*
  BLOG YAZILARI
  -------------
  Yeni haftalık yazı eklemek için aşağıdaki listenin EN ÜSTÜNE yeni bir nesne ekleyin.
  Başka hiçbir dosyayı değiştirmeniz gerekmez; liste, ana sayfadaki "Bu haftanın yazısı" ve yazı sayfası otomatik güncellenir.

  Alanlar (Türkçe):
    slug    : adres kısmı (küçük harf, boşluksuz, ör. "hafta-2-react-notlari")
    issue   : hafta / sayı numarası
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
    slug: "hafta-1-blog-basliyor",
    issue: 1,
    date: "2026-11-22",
    tag: "Not",
    title: "Blog başlıyor: haftalık yazı planı",
    summary: "Bu sayfa her hafta yayınlanacak yazılar için ayrıldı. Bu ilk yazı bir örnek metindir.",
    body: `
      <p>Bu yazı yalnızca <strong>örnek bir metindir</strong>. Blog bölümünün nasıl göründüğünü göstermek için eklendi; kendi yazınızla değiştirebilir ya da silebilirsiniz.</p>
      <h2>Yazılar nerede yaşıyor?</h2>
      <p>Tüm yazılar <code>posts.js</code> dosyasındaki listede tutulur. Yeni bir hafta için listenin başına yeni bir kayıt eklemeniz yeterlidir.</p>
      <h2>Neler yazılabilir?</h2>
      <ul>
        <li>O hafta öğrendiğiniz bir konu (React, SQL, C# ...)</li>
        <li>Üzerinde çalıştığınız projeden notlar</li>
        <li>Staj ve okul deneyimleri</li>
        <li>Okuduğunuz makale ya da izlediğiniz eğitim özetleri</li>
      </ul>
      <blockquote>Küçük ama düzenli yazmak, büyük ama nadir yazmaktan iyidir.</blockquote>
      <p>Hazır olduğunuzda bu örneği silip ilk gerçek yazınızı ekleyebilirsiniz.</p>
    `,
    en: {
      tag: "Note",
      title: "The blog begins: a weekly writing plan",
      summary: "This page is reserved for posts published every week. This first post is a sample text.",
      body: `
        <p>This post is only a <strong>sample text</strong>. It was added to show how the blog section looks; you can replace it with your own post or delete it.</p>
        <h2>Where do the posts live?</h2>
        <p>All posts are kept in the list inside <code>posts.js</code>. For a new week, just add a new entry at the top of the list.</p>
        <h2>What can be written?</h2>
        <ul>
          <li>A topic you learned that week (React, SQL, C# ...)</li>
          <li>Notes from a project you are working on</li>
          <li>Internship and school experiences</li>
          <li>Summaries of articles you read or courses you watched</li>
        </ul>
        <blockquote>Writing a little but regularly beats writing a lot but rarely.</blockquote>
        <p>When you are ready, you can delete this sample and add your first real post.</p>
      `
    }
  }
];
