/*
  BLOG POSTS
  ----------
  To add a new weekly post, put a new object at the TOP of the list below.
  No other file needs to change: the blog list, the "Latest post" block on the home page
  and the post page update by themselves.

  Fields (Turkish):
    slug    : the URL part (lowercase, no spaces, unique, e.g. "week-2-react-notes")
    issue   : week / issue number (optional; the label is hidden if you leave it out)
    date    : publish date as "YYYY-MM-DD"
    tag     : category label (e.g. "React", "Internship", "Note")
    title   : title
    summary : short text shown in the list
    body    : the post body as HTML (you can use <p>, <h2>, <ul>, <blockquote>, <pre><code>)

  English translation (optional):
    en: { tag, title, summary, body }
    If "en" is missing, the post is shown in Turkish when the site is in English.
*/
window.POSTS = [
  {
    slug: "coming-soon-weekly-blog",
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
