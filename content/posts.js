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
    slug: "rag-kutuphane-degil-fikir",
    date: "2026-11-22",
    tag: "RAG",
    title: "RAG bir kütüphane değil, bir fikir",
    summary: "RAG adını sık duyuyorsun ama tam olarak ne olduğunu merak ediyorsan buradan başla. Modele soruyu sormadan önce ilgili notu bulup yanına koymanın hikâyesi bu.",
    body: `
      <p>Diyelim ki vize haftası, elinde bir yığın ders notu var. Bir yapay zekâ sohbet aracına "benim notlarıma göre JWT nedir?" diye soruyorsun. Araç notlarını bilmiyor, üstelik bilmediğini söylemek yerine güzel bir cevap uydurabiliyor. Akla şu geliyor: model notlarımı okuyamıyorsa, ben notları ona okutsam?</p>
      <p>İşte RAG'ın fikri bu. Açılımı Retrieval-Augmented Generation, kabaca "aranan bilgiyle desteklenen üretim". RAG'ı Lewis ve arkadaşları 2020'de tanıttı. Fikir basit: soruyu sormadan önce ilgili bilgiyi bul, soruyla birlikte modele ver. Bu yazıdaki basit kurulumda bulma işini modelin dışında biz yapıyoruz, model yalnız cevabı üretiyor. Makaledeki sistemde arayıcı modelin parçası ve birlikte eğitiliyor; yani çizgi gerçekte bu kadar keskin değil.</p>
      <p>Üç adımı var:</p>
      <ol>
        <li><strong>Hazırla.</strong> Notlarını parçalara böl.</li>
        <li><strong>Bul.</strong> Soruya en yakın parçayı ara.</li>
        <li><strong>Sor.</strong> Parçayı soruyla modele ver: "bu notlara dayanarak cevapla".</li>
      </ol>
      <figure><img src="/assets/blog/rag-kutuphane-degil-fikir/rag-akisi.svg" alt="Soldan sağa akış şeması: insan simgeli kutu soruyu, büyüteç aramayı, üç küçük sayfadan kırmızı olan bulunan not parçasını gösterir. Ortadaki siyah kutu modeldir; içinde üç beyaz düğümün birbirine bağlandığı bir ağ çizimi vardır. Sağdaki iki kalın çubuklu kutu cevaptır. Soru ayrıca üstteki yoldan doğrudan modele ulaşır; model soruyu ve bulunan parçayı birlikte alıp cevap üretir." loading="lazy"></figure>
      <p>Küçük bir kodla görelim. Model çağrısı yok; yalnız "bul" ve "prompt hazırla" var. Dört notumuz var (her biri iki cümle), arama da ortak kelime sayan çok basit bir yöntem:</p>
      <pre><code>// Basit RAG fikri: bul (retrieval) + modele ver (generation için prompt hazırla).
// Model çağrısı yok; yalnız "bulma" ve "prompt oluşturma" kısmı. Yalnız standart kütüphane.

const notlar = [
  "HTTP, istemci ile sunucu arasındaki istek ve cevap kurallarıdır. GET veri ister, POST veri gönderir.",
  "JWT, giriş yaptıktan sonra sunucunun verdiği imzalı bir kimlik belgesidir. Her istekte birlikte gönderilir.",
  "Index, veritabanında arama yapmayı hızlandıran bir yapıdır. Çok fazla index yazmayı yavaşlatır.",
  "Git'te commit, projenin o anki halinin kaydıdır. Branch ise ayrı bir çalışma hattıdır.",
];

// 1) Soruyu ve notları kelimelere ayır (çok basit: küçük harf, harf ve rakam dışını at)
const kelimeler = (metin) =&gt;
  metin
    .toLocaleLowerCase("tr")
    .split(/[^\\p{L}\\p{N}]+/u)
    .filter((k) =&gt; k.length &gt; 2);

// 2) Her not için, soruyla ortak kelime sayısını puan say (anahtar kelime araması)
function enIlgili(soru, parcalar, kac = 1) {
  const sorunun = new Set(kelimeler(soru));
  return parcalar
    .map((metin) =&gt; ({
      metin,
      puan: kelimeler(metin).filter((k) =&gt; sorunun.has(k)).length,
    }))
    .sort((a, b) =&gt; b.puan - a.puan)
    .slice(0, kac);
}

// 3) Bulunan parçaları soruyla birlikte tek bir prompt'a koy
function promptHazirla(soru, bulunanlar) {
  const baglam = bulunanlar.map((b) =&gt; \`- \${b.metin}\`).join("\\n");
  return \`Aşağıdaki notlara dayanarak soruyu cevapla. Notlarda yoksa bilmediğini söyle.\\n\\nNotlar:\\n\${baglam}\\n\\nSoru: \${soru}\`;
}

const soru = "JWT nedir?";
const bulunanlar = enIlgili(soru, notlar, 1);
console.log(promptHazirla(soru, bulunanlar));</code></pre>
      <p>Çalıştırınca ekrana şu çıkıyor:</p>
      <pre><code>Aşağıdaki notlara dayanarak soruyu cevapla. Notlarda yoksa bilmediğini söyle.

Notlar:
- JWT, giriş yaptıktan sonra sunucunun verdiği imzalı bir kimlik belgesidir. Her istekte birlikte gönderilir.

Soru: JWT nedir?</code></pre>
      <p>Bunu modele yapıştırırsan cevabını senin notundan çıkarabilir. <code>map</code> her nota puan veriyor, <code>filter</code> soruyla ortak kelimeleri seçiyor, <code>sort</code> en yüksek puanlıyı başa alıyor. <code>\\p{L}</code> "harf olan her karakter" demek (Unicode harf sınıfı); ç, ğ, ş da içinde.</p>
      <figure><img src="/assets/blog/rag-kutuphane-degil-fikir/yalniz-model-ve-rag.svg" alt="İki yatay şerit karşılaştırması. Üst şerit yalnız model: insan simgeli soru kutusundan, içi boş ve kalın kesikli çerçeveli kutuya (hiç belge yok) uğrayıp siyah model kutusuna ok gider; model kutusunun içinde birbirine bağlı üç beyaz düğümlü bir ağ çizimi vardır; model, iki kalın çubuklu cevap kutusuna ulaşır. Alt şerit RAG'lı akış: soru, kırmızı büyüteç olan arama, bulunan parça kutusu, model ve cevap gelir; soru ayrıca üstteki yoldan doğrudan modele de gider, yani model soruyu ve bulunan parçayı birlikte alır. Fark, araya giren arama ve bulunan parçadır." loading="lazy"></figure>
      <h2>Kütüphane mi, fikir mi?</h2>
      <p>Önce koddaki sınırlara bakalım. Hiçbir notla eşleşme olmasa da ilk notu döndürüyor, çünkü bir eşik yok. Türkçe ekler de işi bozuyor: "notlar" kelimesi "not" ile eşleşmiyor. Gerçek sistemler bu yüzden daha iyi arama kullanır; mesela metni sayı listesine çevirip anlamca yakınlığa bakan gömme (embedding) gibi.</p>
      <p>RAG'ı bir paket adı sanmak da kolay. LangChain, LlamaIndex gibi araçlarla birlikte anılıyor, "RAG kuruyorum" denince akla <code>pip install</code> geliyor. Bana kalırsa bu yanlış yerden başlamak. Yukarıdaki örnekte tek bir kütüphane yok; bir dizi, bir sıralama ve bir metin birleştirme var.</p>
      <p>Bunu dokümanların söylediğini iddia etmiyorum, bu benim yorumum. Bir olgu var: LangChain öğreticisi RAG'a "teknik" diyor. Öğreticinin yapısından anladığım kadarıyla araç, bu tekniği kurmayı kolaylaştırıyor. Ama örneğimiz bütün bir RAG değil, en küçük elle yazılmış hâli. Gerçek hat belgeleri parçalamayı, parçaları aranabilir bir dizine koymayı, iyi bir arayıcıyı ve bir üreticiyi içerir. "RAG kelime sayma artı prompt" diye düşünmek yanlış olur. Arama tarafında da kelime saymak tek yol değil: Elasticsearch'ün varsayılan sıralama yöntemi BM25 de kelime geçişlerine bakar, yalnız bizimkinden daha akıllıdır.</p>
      <h2>Ne zaman RAG, nerede dikkat?</h2>
      <p><strong>Ne zaman RAG?</strong> Modelin bilmediği ya da sürekli değişen bilgi varsa: kendi notların, bir projenin dokümanı. Hugging Face dokümanına göre RAG'da bilgiyi güncellemek için modeli yeniden eğitmek gerekmez, dizini değiştirmek yeter. Öğrenci için asıl avantaj bence bu. Yine de yeni notu dizine eklemek bir iş: gömmeli dizinde notu önce sayı listesine çevirmen gerekir. Bulunan parçayı göstermek de cevabı kontrol etmeni kolaylaştırır, ama modelin cevabı gerçekten o parçadan çıkardığını garanti etmez.</p>
      <p>Karşı görüş de var. Li ve arkadaşlarının 2024 çalışmasında, çok uzun metin alabilen modeller ortalamada RAG'dan iyi çıkmış; RAG ise çok daha ucuz kalmış. Liu ve arkadaşları 2023'te, ilgili bilgi metnin ortasında kalınca modellerin zorlandığını bulmuştu. Notların birkaç sayfaysa doğrudan yapıştırmak yeterli olabilir, RAG notlar çoğalınca anlam kazanır.</p>
      <p><strong>En sık hata.</strong> Aramaya bakmadan "model kötü" demek. Bu bir çıkarım ama bence sağlam: model yalnız ona verilen metni okur, arama yanlış parçayı getirdiyse cevap da ona dayanır. Cevap kötüyse önce aramanın ne bulduğuna bak.</p>
      <p><strong>Nasıl başlarım?</strong> Ben olsam yukarıdaki kodla başlardım. Kendi ders notlarını birkaç paragrafa böl, aramayı kendin yaz, çıkan prompt'u bir sohbet aracına yapıştır. Sonra arama kısmını değiştirip gömmeyi dene.</p>
      <p>Önce elle dene, sonra aracı seç; hangi parçanın ne işe yaradığını bilerek seçmiş olursun.</p>
      <h2>Kaynaklar</h2>
      <ul>
        <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener">Lewis ve ark. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</a></li>
        <li><a href="https://docs.langchain.com/oss/python/langchain/rag" target="_blank" rel="noopener">LangChain dokümanı: RAG öğreticisi</a></li>
        <li><a href="https://huggingface.co/docs/transformers/model_doc/rag" target="_blank" rel="noopener">Hugging Face Transformers dokümanı: RAG model sayfası</a></li>
        <li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-similarity.html" target="_blank" rel="noopener">Elasticsearch dokümanı: Similarity module</a></li>
        <li><a href="https://developers.openai.com/api/docs/guides/embeddings" target="_blank" rel="noopener">OpenAI dokümanı: Embeddings rehberi</a></li>
        <li><a href="https://arxiv.org/abs/2407.16833" target="_blank" rel="noopener">Li ve ark. (2024), Retrieval Augmented Generation or Long-Context LLMs?</a></li>
        <li><a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener">Liu ve ark. (2023), Lost in the Middle</a></li>
      </ul>
    `,
    en: {
      tag: "RAG",
      title: "RAG is not a library, it's an idea",
      summary: "You keep hearing the name RAG but aren't sure what it actually is? Start here. It's the story of finding the right note and putting it next to your question before you ask the model.",
      body: `
        <p>Say it's midterm week and you have a pile of lecture notes. You ask an AI chat tool, "According to my notes, what is a JWT?" The tool has never seen your notes, and instead of admitting that, it may just make up a nice-sounding answer. The obvious thought: if the model can't read my notes, what if I read them to it?</p>
        <p>That's the idea behind RAG. It stands for Retrieval-Augmented Generation, roughly "generation supported by retrieved information". Lewis and colleagues introduced RAG in 2020. The idea is simple: before asking the question, find the relevant information and give it to the model along with the question. In the simple setup in this post, we do the finding outside the model, and the model only writes the answer. In the paper's system, the retriever is part of the model and the two are trained together, so the line isn't really this sharp.</p>
        <p>It has three steps:</p>
        <ol>
          <li><strong>Prepare.</strong> Split your notes into pieces.</li>
          <li><strong>Find.</strong> Search for the piece closest to the question.</li>
          <li><strong>Ask.</strong> Give the piece to the model with the question: "answer based on these notes".</li>
        </ol>
        <figure><img src="/assets/blog/rag-kutuphane-degil-fikir/rag-akisi.svg" alt="Left-to-right flow diagram: a box with a person icon is the question, a magnifying glass is the search, the red one among three small pages is the retrieved note chunk. The black box in the middle is the model, marked by a small network of three connected white nodes. The box on the right with two thick bars is the answer. The question also reaches the model directly along the top path, so the model takes the question and the retrieved chunk together and produces the answer." loading="lazy"></figure>
        <p>Let's see it in a small piece of code. There's no model call, only "find" and "build the prompt". We have four notes (two sentences each), and the search is a very simple method that counts shared words:</p>
        <pre><code>// A simple RAG idea: retrieve (find) + hand it to the model (build the prompt for generation).
// No model call; only the "find" and "build the prompt" parts. Standard library only.

const notes = [
  "HTTP is the set of request and response rules between a client and a server. GET asks for data, POST sends data.",
  "A JWT is a signed ID card the server hands you after you log in. It is sent along with every request.",
  "An index is a structure that speeds up searching in a database. Too many indexes slow down writes.",
  "In Git, a commit is a snapshot of the project at that moment. A branch is a separate line of work.",
];

// 1) Split the question and the notes into words (very simple: lowercase, drop everything except letters and digits)
const words = (text) =&gt;
  text
    .toLocaleLowerCase("en")
    .split(/[^\\p{L}\\p{N}]+/u)
    .filter((w) =&gt; w.length &gt; 2);

// 2) For each note, score the number of words it shares with the question (keyword search)
function findRelevant(question, chunks, count = 1) {
  const questionWords = new Set(words(question));
  return chunks
    .map((text) =&gt; ({
      text,
      score: words(text).filter((w) =&gt; questionWords.has(w)).length,
    }))
    .sort((a, b) =&gt; b.score - a.score)
    .slice(0, count);
}

// 3) Put what we found and the question into a single prompt
function buildPrompt(question, found) {
  const context = found.map((f) =&gt; \`- \${f.text}\`).join("\\n");
  return \`Answer the question based on the notes below. If the answer is not in the notes, say you don't know.\\n\\nNotes:\\n\${context}\\n\\nQuestion: \${question}\`;
}

const question = "What is a JWT?";
const found = findRelevant(question, notes, 1);
console.log(buildPrompt(question, found));</code></pre>
        <p>Run it and this is what prints:</p>
        <pre><code>Answer the question based on the notes below. If the answer is not in the notes, say you don't know.

Notes:
- A JWT is a signed ID card the server hands you after you log in. It is sent along with every request.

Question: What is a JWT?</code></pre>
        <p>Paste that into a model and it can pull its answer from your note. <code>map</code> scores each note, <code>filter</code> picks the words it shares with the question, and <code>sort</code> puts the highest score first. <code>\\p{L}</code> means "any character that is a letter" (the Unicode letter class), so accented letters count too.</p>
        <figure><img src="/assets/blog/rag-kutuphane-degil-fikir/yalniz-model-ve-rag.svg" alt="Comparison of two horizontal strips. Top strip, model only: an arrow runs from the question box with a person icon, through an empty box with a thick dashed border (no document), to the black model box, which is marked by a small network of three connected white nodes; the model reaches the answer box with two thick bars. Bottom strip, with RAG: question, a search step shown as a red magnifying glass, the retrieved chunk box, model, and answer; the question also goes straight to the model along the top path, so the model gets the question and the retrieved chunk together. The difference is the search step and the retrieved chunk." loading="lazy"></figure>
        <h2>Library or idea?</h2>
        <p>First, the limits of the code. Even when no note matches, it returns the first one, because there is no threshold. Word endings break it too: "commits" doesn't match "commit", so a question that only says "commits" can miss the commit note. Real systems use better search for this reason, for example embeddings, which turn text into a list of numbers and compare how close the meanings are.</p>
        <p>It's easy to take RAG for a package name. It's mentioned alongside tools like LangChain and LlamaIndex, and when someone says "I'm setting up RAG", <code>pip install</code> comes to mind. I think that's starting from the wrong place. The example above has no library at all; it has an array, a sort, and some string joining.</p>
        <p>I'm not claiming the docs say this. It's my interpretation. Here is one fact: the LangChain tutorial calls RAG a "technique". From how the tutorial is laid out, my reading is that the tool makes the technique easier to build. But our example isn't a whole RAG system, it's the smallest hand-written version. A real pipeline includes splitting documents, putting the pieces into a searchable index, a good retriever, and a generator. Thinking of RAG as "word counting plus a prompt" would be a mistake. Word counting isn't the only way to search either: BM25, the default ranking method in Elasticsearch, also looks at word occurrences. It's just smarter than ours.</p>
        <h2>When to use RAG, and what to watch for</h2>
        <p><strong>When to use it.</strong> When there's information the model doesn't know or that keeps changing: your own notes, a project's docs. According to the Hugging Face docs, with RAG you don't have to retrain the model to update its knowledge; changing the index is enough. For a student, I think that's the main advantage. Still, adding a new note to the index is work: with an embedding index, you first have to turn the note into a list of numbers. Showing the retrieved piece also makes it easier for you to check the answer, but it doesn't guarantee the model actually drew its answer from that piece.</p>
        <p>There's a counterargument. In a 2024 study by Li and colleagues, models that can take very long text did better than RAG on average, while RAG stayed much cheaper. Liu and colleagues found in 2023 that models struggle when the relevant information sits in the middle of the text. If your notes are a few pages, pasting them in directly may be enough; RAG starts to make sense once the notes pile up.</p>
        <p><strong>The most common mistake.</strong> Blaming the model without looking at the search. This is an inference, but I think a solid one: the model reads only the text it's given, so if the search brought back the wrong piece, the answer rests on it. When an answer is bad, first look at what the search found.</p>
        <p><strong>Where to start?</strong> I'd start with the code above. Split your own lecture notes into a few paragraphs, write the search yourself, and paste the resulting prompt into a chat tool. Then swap out the search part and try embeddings.</p>
        <p>Try it by hand first, then pick a tool; that way you'll choose it knowing what each piece does.</p>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener">Lewis et al. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</a></li>
          <li><a href="https://docs.langchain.com/oss/python/langchain/rag" target="_blank" rel="noopener">LangChain docs: RAG tutorial</a></li>
          <li><a href="https://huggingface.co/docs/transformers/model_doc/rag" target="_blank" rel="noopener">Hugging Face Transformers docs: RAG model page</a></li>
          <li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-similarity.html" target="_blank" rel="noopener">Elasticsearch docs: Similarity module</a></li>
          <li><a href="https://developers.openai.com/api/docs/guides/embeddings" target="_blank" rel="noopener">OpenAI docs: Embeddings guide</a></li>
          <li><a href="https://arxiv.org/abs/2407.16833" target="_blank" rel="noopener">Li et al. (2024), Retrieval Augmented Generation or Long-Context LLMs?</a></li>
          <li><a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener">Liu et al. (2023), Lost in the Middle</a></li>
        </ul>
      `
    }
  },
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
