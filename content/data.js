/*
  SITE CONTENT - the only file you edit for most changes
  -------------------------------------------------------
  Projects, experience, skills, certificates, the about text and the home page facts come from here.
  Save this file and every page updates by itself. (Blog posts live in posts.js.)

  Text fields can be written in two ways:
    "Plain text"                      -> same in Turkish and English (names, technology names)
    { tr: "Türkçe", en: "English" }   -> changes with the language
  If you leave out the English text, the Turkish one is shown.

  Where to add:
    - projects, jobs -> at the TOP of the list (newest first)
    - certs, skills  -> anywhere
*/
window.SITE = {

  /* ===================== HOME PAGE / ABOUT ===================== */
  profile: {
    // Info box at the top right of the home page
    facts: [
      { label: { tr: "Okul", en: "School" },
        value: { tr: "OSTİM Teknik Üniversitesi · GNO 3.84", en: "OSTİM Technical University · GPA 3.84" } },
      { label: { tr: "Odak", en: "Focus" },
        value: { tr: "React, Front-end, Veritabanı, AI destekli geliştirme", en: "React, Front-end, Databases, AI-assisted development" } },
      { label: { tr: "Konum", en: "Location" }, value: "Ankara / Etimesgut" },
      { label: { tr: "Diller", en: "Languages" },
        value: { tr: "Türkçe · İngilizce B1+", en: "Turkish · English B1+" } }
    ],

    // Paragraphs on the About page
    about: {
      tr: [
        "OSTİM Teknik Üniversitesi'nde Yazılım Mühendisliği okuyan, front-end odaklı ve full-stack yönünde ilerleyen bir geliştirici adayıyım.",
        "HTML, CSS, JavaScript ve React ile canlıda yayınlanan uygulamalar geliştiriyorum; staj ve kişisel projelerle deneyim kazanıyorum.",
        "Veritabanı ve yapay zekâ destekli geliştirme gibi konularda kendimi sürekli geliştiriyorum."
      ],
      en: [
        "I am an aspiring developer studying Software Engineering at OSTİM Technical University, focused on front-end and moving toward full-stack.",
        "I build applications that go live with HTML, CSS, JavaScript and React, and I gain experience through internships and personal projects.",
        "I keep improving myself in areas such as databases and AI-assisted development."
      ]
    },

    education: [
      { date: { tr: "2024 – devam ediyor", en: "2024 – present" },
        title: { tr: "Yazılım Mühendisliği (Türkçe)", en: "Software Engineering (Turkish)" },
        place: { tr: "OSTİM Teknik Üniversitesi", en: "OSTİM Technical University" },
        note: { tr: "GNO: 3.84 / 4.00", en: "GPA: 3.84 / 4.00" } }
    ],

    languages: [
      { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Ana dil", en: "Native" } },
      { name: { tr: "İngilizce", en: "English" }, level: "B1+" }
    ]
  },

  /* ============================ PROJECTS ============================
     To add a project, copy this template and paste it at the TOP of the list:

     {
       name: "Project Name",
       desc: { tr: "Ne yapıyor, kısaca.", en: "What it does, briefly." },
       tech: "React · Vite · CSS",
       github: "https://github.com/berkaycinar-dev/project-repo",
       demo: "https://project.vercel.app",   // delete this line if there is no live URL
       live: true,                           // "Live" badge; shown automatically when demo is set
       featured: true                        // highlight on the home page (the first one wins)
     },
  ===================================================================== */
  projects: [
    {
      name: "Anchorly",
      desc: {
        tr: "Görev ve alışkanlık takip uygulaması: tekrarlayan görevler, sürükle-bırak sıralama, aylık rutin tablosu, takvim, 6 tema ve Türkçe/İngilizce dil desteği. Vitest ile test edildi, Vercel'de yayında.",
        en: "A task and habit tracking app: recurring tasks, drag-and-drop ordering, a monthly routine table, a calendar, 6 themes and Turkish/English language support. Tested with Vitest and live on Vercel."
      },
      tech: "React 19 · Vite · CSS · Vitest",
      github: "https://github.com/berkaycinar-dev/Anchorly",
      demo: "https://anchorly-app.vercel.app/",
      live: true,
      featured: true
    },
    {
      name: { tr: "STDERP Tanıtım Sitesi", en: "STDERP Promotional Site" },
      desc: {
        tr: "Savunma sanayii süreç takip yazılımını tanıtan, Türkçe ve İngilizce dokümantasyonlu statik site.",
        en: "A static site promoting a defense-industry process tracking software, with Turkish and English documentation."
      },
      tech: "HTML5 · CSS3 · Bootstrap 5",
      github: "https://github.com/berkaycinar-dev/STDERP"
    },
    {
      name: "Activity Tracking System",
      desc: {
        tr: "Aktif, boşta ve uyku durumlarını yerel veri tabanına kaydeden, günlük/haftalık rapor üreten Windows uygulaması. Veri dışarı gönderilmez.",
        en: "A Windows app that records active, idle and sleep states to a local database and produces daily/weekly reports. No data leaves the computer."
      },
      tech: "C# · WinForms · SQLite",
      github: "https://github.com/berkaycinar-dev/Activity_Tracking_System"
    },
    {
      name: "EDonusumDemo",
      desc: {
        tr: "e-Fatura, e-Arşiv ve e-İrsaliye belgelerini oluşturup UBL-TR benzeri XML üreten masaüstü demosu (resmi e-belge değildir).",
        en: "A desktop demo that creates e-Invoice, e-Archive and e-Waybill documents and generates UBL-TR-like XML (not an official e-document)."
      },
      tech: "C# · .NET 9 · WPF · SQL Server",
      github: "https://github.com/berkaycinar-dev/EDonusumDemo"
    }
  ],

  /* ============================ EXPERIENCE ============================
     Template for a new job or internship (paste at the TOP of the list):

     {
       date:    { tr: "Ocak 2027 – Mart 2027", en: "January 2027 – March 2027" },
       role:    { tr: "Stajyer", en: "Intern" },
       company: "Company Name",
       bullets: {
         tr: ["Yaptığım iş 1.", "Yaptığım iş 2."],
         en: ["What I did 1.", "What I did 2."]
       }
     },
     (Delete the bullets line if you do not want bullet points.)
  ===================================================================== */
  jobs: [
    {
      date: { tr: "Haziran – Temmuz 2026", en: "June – July 2026" },
      role: { tr: "Stajyer", en: "Intern" },
      company: "HETABİL Yazılım",
      bullets: {
        tr: [
          "Savunma sanayii süreç takip yazılımı STDERP için HTML, CSS ve Bootstrap ile tanıtım sitesi geliştirdim.",
          "C# ve WinForms ile bilgisayarın aktif, boşta ve uyku sürelerini SQLite'a kaydeden ve rapor üreten Windows sistem uygulaması prototipi hazırladım.",
          "C#, WPF ve SQL Server ile cari/stok kayıtlarını yöneten, e-Fatura, e-Arşiv ve e-İrsaliye için UBL-TR benzeri XML üreten bir e-Dönüşüm demosu hazırladım.",
          "Yapay zekâ destekli imalat yönetimi platformu için KOSGEB değerlendirmesine yönelik iş planı raporunu hazırladım; çalışmalarda yapay zekâ destekli geliştirme araçlarından yararlandım."
        ],
        en: [
          "I built a promotional site with HTML, CSS and Bootstrap for STDERP, a defense-industry process tracking software.",
          "I prototyped a Windows system app in C# and WinForms that records the computer's active, idle and sleep times to SQLite and produces reports.",
          "I built an e-Transformation demo in C#, WPF and SQL Server that manages account/stock records and generates UBL-TR-like XML for e-Invoice, e-Archive and e-Waybill.",
          "I prepared a business plan report for an AI-assisted manufacturing management platform, aimed at a KOSGEB evaluation; I used AI-assisted development tools in my work."
        ]
      }
    },
    {
      date: { tr: "Ocak 2026", en: "January 2026" },
      role: { tr: "Stajyer", en: "Intern" },
      company: "IPB Danışmanlık",
      bullets: {
        tr: ["İnternet sitesi üzerinde kullanıcı ve sistem testleri gerçekleştirdim ve Front-End sektörünün gelişimi üzerine bir sunum yaptım."],
        en: ["I ran user and system tests on a website and gave a presentation on the development of the Front-End industry."]
      }
    },
    {
      date: { tr: "Haziran – Eylül 2024", en: "June – September 2024" },
      role: { tr: "Kasa Çalışanı", en: "Cashier" },
      company: "LC Waikiki"
    }
  ],

  /* ============================ SKILLS ============================
     New category or item: { label: "Title", items: "Item, Item, Item" } */
  skills: [
    { label: "Web", items: "HTML5, CSS3, JavaScript, React, Bootstrap, Vite" },
    { label: { tr: "Masaüstü (temel)", en: "Desktop (basic)" }, items: "C#, .NET, WPF, WinForms" },
    { label: { tr: "Veritabanı", en: "Databases" }, items: "SQL, PostgreSQL, SQL Server, SQLite" },
    { label: { tr: "Araçlar", en: "Tools" }, items: "Git, GitHub, Vercel, Visual Studio" },
    { label: { tr: "Kişisel", en: "Personal" },
      items: {
        tr: "Proje yönetimi, analitik düşünme, zaman yönetimi, takım çalışması, etkili iletişim, eleştirel düşünme",
        en: "Project management, analytical thinking, time management, teamwork, effective communication, critical thinking"
      } }
  ],

  /* ========================== CERTIFICATES ==========================
     New certificate: { name: "Certificate name", issuer: "Issuing organization" },
     For a translated name: name: { tr: "…", en: "…" }  */
  certs: [
    { name: "Foundations of User Experience (UX) Design", issuer: "Google" },
    { name: "Generative AI: Introduction and Applications", issuer: "IBM" },
    { name: "Database Design and Basic SQL in PostgreSQL", issuer: "University of Michigan" },
    { name: { tr: "React ile Web Programcılığı", en: "Web Programming with React" }, issuer: "BTK Akademi" },
    { name: { tr: "Anthropic Claude Eğitimi", en: "Anthropic Claude Training" }, issuer: "BTK Akademi" },
    { name: { tr: "Front-End Eğitimi Sertifikası", en: "Front-End Training Certificate" } },
    { name: { tr: "Siber Güvenliğe Giriş", en: "Introduction to Cybersecurity" }, issuer: "Cisco" },
    { name: { tr: "Microsoft ile C# Temelleri", en: "C# Fundamentals with Microsoft" }, issuer: "freeCodeCamp" }
  ]
};
