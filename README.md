# Sani Portal

![Sani Portal logo](assets/sani-logo-dark.png)

The central website for **Ehsan Mohajer**, a full-stack software developer based in Jyväskylä, Finland.

Sani Portal gives visitors one clear starting point: customers can continue to Sani Studio to start a digital project, while recruiters and collaborators can visit Sani Portfolio to explore Ehsan's experience, résumé, and previous work.

**Live website:** [ehsanmohajer.fi](https://ehsanmohajer.fi/)

## The Sani ecosystem

| Destination | Purpose |
| --- | --- |
| [Sani Portal](https://ehsanmohajer.fi/) | Main website, selected work, contact information, articles, and navigation hub |
| [Sani Studio](https://sanistudio.vercel.app/) | Website design, full-stack development, AI, automation, pricing, and project enquiries |
| [Sani Portfolio](https://saniportfolio.vercel.app/) | Résumé, career history, technical experience, and detailed project case studies |

The Project Tracker referenced by the portal is an internal administrative tool and is not part of the public customer experience.

## Features

- Responsive layouts for mobile phones, tablets, laptops, and large desktop screens
- English, Finnish, and Persian interfaces, including right-to-left layout support for Persian
- Persistent dark and light themes on the main portal
- Dedicated About, Blog, Contact, Privacy, and Offline pages
- Selected project and client sections
- Animated collaboration/testimonial-style presentation
- Local “Ask Sani” website assistant that works without an API key
- Contact and callback forms that prepare an email in the visitor's own email application
- Progressive Web App installation on supported desktop and mobile browsers
- Offline application shell and fallback page
- Reduced-motion support for visitors who prefer fewer animations
- Semantic HTML, accessible labels, keyboard-friendly controls, and descriptive image alternatives
- No framework, package installation, database, or build step required

## Progressive Web App

Sani Portal can be installed and opened like an application.

On Chromium-based browsers such as Chrome and Edge, the website displays its custom installation suggestion when the browser confirms that installation is available. On iPhone and iPad, visitors can use **Share → Add to Home Screen**.

The PWA implementation includes:

- `manifest.webmanifest` for application identity and installation metadata
- Standard 192 × 192 and 512 × 512 icons
- A maskable icon for Android launchers
- An Apple touch icon
- `sw.js` for same-origin static asset caching
- Network-first navigation with an offline fallback
- `offline.html` for pages that have not previously been cached

The service worker only handles same-origin `GET` requests. Contact-form values, email content, external websites, and non-GET requests are not stored in the application cache.

> PWA installation and service workers require HTTPS in production. `localhost` is accepted for local development.

## Local assistant

Ask Sani is a rule-based website guide implemented entirely in the browser. It can answer prepared questions about services, projects, experience, languages, and contact options.

- No API key is required
- No request is sent to an AI provider
- Messages are not saved or transmitted
- Visitor text is rendered as plain text rather than executable HTML

The assistant is intentionally a navigation and information tool, not a generative AI chatbot.

## Contact forms and privacy

The forms do not submit data to an API or database. After browser validation, JavaScript creates a `mailto:` message and opens the visitor's configured email application.

This approach keeps the website independent from third-party form processors, but it also means visitors need a configured email client. If the portal later adopts a server-side form service, validation, abuse protection, rate limiting, consent handling, and secure storage must be implemented on the server.

See [privacy.html](privacy.html) for the current privacy explanation.

## Security notes

This repository contains no API keys, passwords, access tokens, or server-side secrets. The public website has a small attack surface because it is a static project with no application database or authentication system.

Important operational considerations:

- A hidden or low-visibility URL is not access control. The private Project Tracker must enforce authentication inside the Tracker application itself.
- Secrets must never be committed to this repository or included in client-side JavaScript.
- HTTPS should remain enforced in GitHub Pages.
- External links opened in a new tab use `rel="noopener"`.
- GitHub Pages does not provide complete control over HTTP response headers. Security headers such as Content Security Policy, HSTS, `X-Content-Type-Options`, Referrer Policy, and Permissions Policy should be configured through the hosting/CDN layer when available.
- Dependencies or third-party scripts added in the future should be reviewed before deployment.

No website can be made completely “hacker-proof.” Security should be reviewed again whenever authentication, payments, APIs, databases, file uploads, or server-side forms are introduced.

## Technology

- HTML5
- Modern CSS with custom properties, Grid, Flexbox, responsive breakpoints, and theme styling
- Vanilla JavaScript
- Web App Manifest
- Service Worker and Cache API
- GitHub Pages
- Custom `.fi` domain

## Project structure

```text
.
├── index.html                 Main Sani Portal page
├── about.html                 About Ehsan and FAQ
├── blog.html                  Articles and insights
├── contact.html               Detailed project enquiry page
├── privacy.html               Privacy information
├── offline.html               PWA offline fallback
├── manifest.webmanifest       PWA metadata
├── sw.js                      Service worker and cache strategy
├── script.js                  Main theme, language, effects, and form behavior
├── assistant.js               Local Ask Sani assistant
├── pwa.js                     Installation prompt and registration
├── content-pages.js           About and Blog localization/behavior
├── contact-page.js            Contact localization and form behavior
├── styles.css                 Main layout and shared design foundation
├── theme.css                  Light/dark theme definitions
├── pwa.css                    PWA installation interface
├── *.css                      Page- and component-specific styles
├── assets/
│   ├── icons/                 PWA and mobile icons
│   ├── clients/               Client images and logos
│   └── ...                    Portal images, logos, and previews
└── CNAME                      GitHub Pages custom domain
```

## Run locally

The recommended method is a local HTTP server because service workers do not run correctly when `index.html` is opened directly from the filesystem.

### Python

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

To test a service-worker update, close existing Sani Portal tabs or use the browser's Application/Storage developer tools to unregister the previous worker and clear its cache.

## Content and link updates

Public destinations are defined in the HTML and localization JavaScript files. To locate them quickly:

```powershell
rg "vercel.app|ehsanmohajer.fi@gmail.com" .
```

When changing the application shell or cached filenames, update `APP_SHELL` in `sw.js` and increment `CACHE_NAME`, for example from `sani-portal-v1` to `sani-portal-v2`. This ensures visitors receive the updated assets instead of an older cache.

## Validation before publishing

Before every deployment:

1. Test English, Finnish, and Persian on the main page and all content pages.
2. Check both themes and confirm that the selected theme continues across pages.
3. Test at approximately 360 px, 768 px, 1024 px, and 1440 px widths.
4. Submit both contact forms and confirm the generated email content.
5. Check Studio, Portfolio, pricing, project, privacy, and administrator destinations.
6. Verify the browser console has no JavaScript or asset-loading errors.
7. Test PWA installation and offline navigation over HTTPS or localhost.
8. Run a Lighthouse audit for accessibility, performance, best practices, and PWA behavior.

## Deployment with GitHub Pages

1. Push the project to the repository's publishing branch.
2. In **Settings → Pages**, choose deployment from the correct branch and root directory.
3. Set the custom domain to `ehsanmohajer.fi`.
4. Keep the repository's `CNAME` file unchanged.
5. Enable **Enforce HTTPS** after GitHub validates the domain.
6. Confirm the DNS records still point to GitHub Pages.

The current domain setup delegates DNS management from Domainhotelli to Cloudflare. The apex records point to GitHub Pages and `www` points to the GitHub Pages hostname. DNS or proxy settings should only be changed after checking GitHub's current custom-domain guidance.

## Suggested commit

```powershell
git add .
git commit -m "feat: complete Sani Portal with localization, PWA and content pages"
git push
```

Review `git status` before committing to ensure that no private files or credentials have been added.

## Author

**Ehsan Mohajer**  
Full-stack Software Developer · Jyväskylä, Finland

- Portal: [ehsanmohajer.fi](https://ehsanmohajer.fi/)
- Studio: [sanistudio.vercel.app](https://sanistudio.vercel.app/)
- Portfolio: [saniportfolio.vercel.app](https://saniportfolio.vercel.app/)
- Email: [ehsanmohajer.fi@gmail.com](mailto:ehsanmohajer.fi@gmail.com)

© 2026 Ehsan Mohajer. All rights reserved.
