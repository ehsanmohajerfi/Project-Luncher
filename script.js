const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('theme-toggle');
const preferredTheme = localStorage.getItem('preferredTheme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

function setTheme(theme) {
  const selectedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selectedTheme;
  themeToggle.querySelector('.theme-icon').textContent = selectedTheme === 'dark' ? '☼' : '☾';
  themeToggle.setAttribute('aria-label', selectedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('preferredTheme', selectedTheme);
}

setTheme(preferredTheme);
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const rotateY = ((x / box.width) - 0.5) * 5;
      const rotateX = ((y / box.height) - 0.5) * -5;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

const translations = {
  en: {
    'nav a:nth-child(1)': 'Explore', 'nav a:nth-child(2)': 'Studio', 'nav a:nth-child(3)': 'Portfolio', 'nav a:nth-child(4)': 'Contact',
    '.header-cta': 'Start a project <span>↗</span>', '.eyebrow': '<span class="status-dot"></span> Based in Finland · Available worldwide',
    '.hero h1': 'I build digital<br><em>things that work.</em>', '.hero-text': 'Full-stack developer crafting thoughtful products, intelligent tools and fast, polished web experiences.',
    '.scroll-link span:first-child': 'Choose your path', '.hero-meta': '<span>Full-stack development</span><span>AI & automation</span><span>Digital products</span>',
    '.section-intro .kicker': '01 / WHERE TO?', '.section-intro h2': 'Two sides of my work.<br><span>One place to begin.</span>', '.section-intro>p:last-child': 'Whether you need a digital partner or want to see what I’ve built, you’re in the right place.',
    '.studio-card .card-top span:first-child': 'FOR CLIENTS', '.portfolio-card .card-top span:first-child': 'ABOUT MY WORK',
    '.studio-card h3': 'Let’s build something<br>that moves your business.', '.studio-card .card-content>p:not(.card-label)': 'Web design, full-stack development, AI solutions and automation — from first idea to launch.', '.studio-card .card-action': 'Visit the studio <i>↗</i>',
    '.portfolio-card h3': 'See the person<br>behind the projects.', '.portfolio-card .card-content>p:not(.card-label)': 'Selected work, technical experience, career story and everything you need to know about me.', '.portfolio-card .card-action': 'View my portfolio <i>↗</i>',
    '.approach .kicker': '02 / THE APPROACH', '.approach-line': '<span>Design-minded.</span><span>Engineering-led.</span><span>Business-aware.</span>', '.principles': '<p><b>01</b> Clear communication</p><p><b>02</b> Purposeful design</p><p><b>03</b> Reliable delivery</p>',
    '.contact-heading .kicker': '03 / GET IN TOUCH', '.contact-heading h2': 'Have a project in mind?<br><span>Let’s talk.</span>', '.contact-heading>p:last-child': 'Send a short callback request and I’ll get back to you as soon as possible.',
    '.contact-label': 'CONTACT DETAILS', '.contact-details>a small': 'Email', '.contact-details>div:nth-of-type(1) small': 'Location', '.contact-details>div:nth-of-type(1) span': 'Jyväskylä, Finland', '.contact-details>div:nth-of-type(2) small': 'Availability', '.contact-details>div:nth-of-type(2) span': 'Finland · Remote worldwide',
    'label[for="customer-name"]': 'Your name', 'label[for="customer-email"]': 'Email or phone', 'label[for="customer-message"]': 'How can I help?', '.callback-form button': 'Request a callback <span>↗</span>', '.form-note': 'This opens your email app with the request ready to send.',
    'footer>div:first-child p': 'Building useful things<br>from Jyväskylä, Finland.', '.footer-links a:first-child': 'Studio ↗', '.footer-links a:last-child': 'Portfolio ↗'
  },
  fi: {
    'nav a:nth-child(1)': 'Tutustu', 'nav a:nth-child(2)': 'Studio', 'nav a:nth-child(3)': 'Portfolio', 'nav a:nth-child(4)': 'Yhteystiedot',
    '.header-cta': 'Aloita projekti <span>↗</span>', '.eyebrow': '<span class="status-dot"></span> Suomessa · Työskentelen maailmanlaajuisesti',
    '.hero h1': 'Rakennan digitaalisia<br><em>ratkaisuja, jotka toimivat.</em>', '.hero-text': 'Full-stack-kehittäjä, joka rakentaa harkittuja tuotteita, älykkäitä työkaluja ja nopeita, viimeisteltyjä verkkokokemuksia.',
    '.scroll-link span:first-child': 'Valitse polkusi', '.hero-meta': '<span>Full-stack-kehitys</span><span>Tekoäly ja automaatio</span><span>Digitaaliset tuotteet</span>',
    '.section-intro .kicker': '01 / MINNE SEURAAVAKSI?', '.section-intro h2': 'Työni kaksi puolta.<br><span>Yksi paikka aloittaa.</span>', '.section-intro>p:last-child': 'Tarvitsetpa digitaalista kumppania tai haluat nähdä työni, olet oikeassa paikassa.',
    '.studio-card .card-top span:first-child': 'ASIAKKAILLE', '.portfolio-card .card-top span:first-child': 'TYÖSTÄNI',
    '.studio-card h3': 'Rakennetaan jotain,<br>joka vie liiketoimintaasi eteenpäin.', '.studio-card .card-content>p:not(.card-label)': 'Verkkosuunnittelu, full-stack-kehitys, tekoälyratkaisut ja automaatio — ideasta julkaisuun.', '.studio-card .card-action': 'Tutustu studioon <i>↗</i>',
    '.portfolio-card h3': 'Tutustu tekijään<br>projektien takana.', '.portfolio-card .card-content>p:not(.card-label)': 'Valitut työt, tekninen kokemus, uratarina ja kaikki olennainen minusta.', '.portfolio-card .card-action': 'Katso portfolio <i>↗</i>',
    '.approach .kicker': '02 / TOIMINTATAPA', '.approach-line': '<span>Muotoilutietoinen.</span><span>Tekniikkalähtöinen.</span><span>Liiketoimintaa ymmärtävä.</span>', '.principles': '<p><b>01</b> Selkeä viestintä</p><p><b>02</b> Tarkoituksenmukainen design</p><p><b>03</b> Luotettava toimitus</p>',
    '.contact-heading .kicker': '03 / OTA YHTEYTTÄ', '.contact-heading h2': 'Onko sinulla projekti mielessä?<br><span>Jutellaan.</span>', '.contact-heading>p:last-child': 'Lähetä lyhyt yhteydenottopyyntö, niin vastaan mahdollisimman pian.',
    '.contact-label': 'YHTEYSTIEDOT', '.contact-details>a small': 'Sähköposti', '.contact-details>div:nth-of-type(1) small': 'Sijainti', '.contact-details>div:nth-of-type(1) span': 'Jyväskylä, Suomi', '.contact-details>div:nth-of-type(2) small': 'Saatavuus', '.contact-details>div:nth-of-type(2) span': 'Suomi · Etätyö maailmanlaajuisesti',
    'label[for="customer-name"]': 'Nimesi', 'label[for="customer-email"]': 'Sähköposti tai puhelin', 'label[for="customer-message"]': 'Miten voin auttaa?', '.callback-form button': 'Pyydä yhteydenottoa <span>↗</span>', '.form-note': 'Tämä avaa sähköpostisovelluksesi ja valmistelee viestin.',
    'footer>div:first-child p': 'Rakennan hyödyllisiä asioita<br>Jyväskylässä.', '.footer-links a:first-child': 'Studio ↗', '.footer-links a:last-child': 'Portfolio ↗'
  },
  fa: {
    'nav a:nth-child(1)': 'مشاهده', 'nav a:nth-child(2)': 'استودیو', 'nav a:nth-child(3)': 'پورتفولیو', 'nav a:nth-child(4)': 'تماس',
    '.header-cta': 'شروع پروژه <span>↗</span>', '.eyebrow': '<span class="status-dot"></span> مستقر در فنلاند · همکاری در سراسر جهان',
    '.hero h1': 'محصولات دیجیتالی<br><em>می‌سازم که کار می‌کنند.</em>', '.hero-text': 'توسعه‌دهنده فول‌استک؛ سازنده محصولات هدفمند، ابزارهای هوشمند و تجربه‌های وب سریع و حرفه‌ای.',
    '.scroll-link span:first-child': 'مسیرتان را انتخاب کنید', '.hero-meta': '<span>توسعه فول‌استک</span><span>هوش مصنوعی و اتوماسیون</span><span>محصولات دیجیتال</span>',
    '.section-intro .kicker': '۰۱ / کدام مسیر؟', '.section-intro h2': 'دو بخش از فعالیت من.<br><span>یک نقطه برای شروع.</span>', '.section-intro>p:last-child': 'چه به یک شریک فنی نیاز داشته باشید و چه بخواهید نمونه‌کارهایم را ببینید، از اینجا شروع کنید.',
    '.studio-card .card-top span:first-child': 'برای مشتریان', '.portfolio-card .card-top span:first-child': 'درباره فعالیت من',
    '.studio-card h3': 'بیایید چیزی بسازیم<br>که کسب‌وکارتان را پیش ببرد.', '.studio-card .card-content>p:not(.card-label)': 'طراحی وب، توسعه فول‌استک، راهکارهای هوش مصنوعی و اتوماسیون؛ از ایده تا انتشار.', '.studio-card .card-action': 'مشاهده استودیو <i>↗</i>',
    '.portfolio-card h3': 'با فرد پشت<br>پروژه‌ها آشنا شوید.', '.portfolio-card .card-content>p:not(.card-label)': 'نمونه‌کارهای منتخب، تجربه فنی، مسیر شغلی و تمام اطلاعات موردنیاز درباره من.', '.portfolio-card .card-action': 'مشاهده پورتفولیو <i>↗</i>',
    '.approach .kicker': '۰۲ / شیوه همکاری', '.approach-line': '<span>نگاه طراحی.</span><span>مهندسی‌محور.</span><span>آشنا با کسب‌وکار.</span>', '.principles': '<p><b>۰۱</b> ارتباط شفاف</p><p><b>۰۲</b> طراحی هدفمند</p><p><b>۰۳</b> تحویل قابل اعتماد</p>',
    '.contact-heading .kicker': '۰۳ / ارتباط با من', '.contact-heading h2': 'پروژه‌ای در ذهن دارید؟<br><span>گفت‌وگو کنیم.</span>', '.contact-heading>p:last-child': 'یک درخواست کوتاه ارسال کنید تا در اولین فرصت با شما تماس بگیرم.',
    '.contact-label': 'اطلاعات تماس', '.contact-details>a small': 'ایمیل', '.contact-details>div:nth-of-type(1) small': 'موقعیت', '.contact-details>div:nth-of-type(1) span': 'یواسکولا، فنلاند', '.contact-details>div:nth-of-type(2) small': 'نحوه همکاری', '.contact-details>div:nth-of-type(2) span': 'فنلاند · همکاری آنلاین در سراسر جهان',
    'label[for="customer-name"]': 'نام شما', 'label[for="customer-email"]': 'ایمیل یا شماره تماس', 'label[for="customer-message"]': 'چطور می‌توانم کمک کنم؟', '.callback-form button': 'درخواست تماس <span>↗</span>', '.form-note': 'برنامه ایمیل شما با متن آماده باز می‌شود.',
    'footer>div:first-child p': 'ساخت محصولات کاربردی<br>از یواسکولا، فنلاند.', '.footer-links a:first-child': 'استودیو ↗', '.footer-links a:last-child': 'پورتفولیو ↗'
  }
};

function setLanguage(language) {
  const lang = translations[language] ? language : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  Object.entries(translations[lang]).forEach(([selector, content]) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = content;
  });
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) languageSelect.value = lang;
  localStorage.setItem('preferredLanguage', lang);
}

document.getElementById('language-select').addEventListener('change', (event) => setLanguage(event.target.value));
setLanguage(localStorage.getItem('preferredLanguage') || (navigator.language.startsWith('fa') ? 'fa' : navigator.language.startsWith('fi') ? 'fi' : 'en'));

document.getElementById('callback-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const language = document.documentElement.lang;
  const subjects = { en: 'Website callback request', fi: 'Yhteydenottopyyntö verkkosivulta', fa: 'درخواست تماس از وب‌سایت' };
  const body = `Name / Nimi / نام: ${data.get('name')}\nContact / Yhteystieto / راه ارتباطی: ${data.get('contact')}\n\n${data.get('message')}`;
  window.location.href = `mailto:ehsanmohajer.fi@gmail.com?subject=${encodeURIComponent(subjects[language])}&body=${encodeURIComponent(body)}`;
});
