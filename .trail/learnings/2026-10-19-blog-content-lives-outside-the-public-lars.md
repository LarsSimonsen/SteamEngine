---
title: Blog content lives outside the public repo
author: Lars
date: 2026-10-19
branch: master
cost: { minutes: 7, tokens: 82141 }
touches:
  - ".agents/skills/steam-engine-cloudflare-pages-publishing/SKILL.md"
  - ".agents/skills/steam-engine-i18n-migration/SKILL.md"
  - README.md
  - SITE-STRUCTURE.md
  - src/blog/about.html
  - src/blog/assets/uploads/2015/11/Hi-Res-Icon.png
  - src/blog/assets/uploads/2015/11/Singingteslacoil.jpg
  - src/blog/assets/uploads/2015/11/SteamEngineDNA200Screen.png
  - src/blog/assets/uploads/2015/11/WelcomeMat.jpg
  - src/blog/assets/uploads/2015/11/coil-wrapping-tutorial-by-the-uk.jpg
---

## Decided
Blog posts are not in the public repository; only the blog code is (`src/blog/generator.ts`, `types.ts`,
`blog.css`, `assets/logotype.svg`). The build reads posts, `about.html` and `assets/uploads/` from the folder
named by `STEAM_ENGINE_BLOG_CONTENT`, else from a gitignored `.blog-content` folder or junction in the checkout
(`resolveBlogContentDirectory`). A post is `posts/<YYYY-MM-DD>-<slug>/post.json` (LF) plus `body.html` (CRLF).
Without content the build makes a blog with no articles and warns.

## Tried and ruled out
Defaulting to a sibling path for the private folder: `npm run validate:public` rejects naming the private
repository in public files, so the build uses the env var or the gitignored link instead.

## Watch out
Route cases marked `requiresBlogContent` in `tools/route-contract.json` are skipped when `blog/feed.xml` has no
`<item>`, so a contentless build still passes validation. Never deploy one: it removes every article from the
live site. There is no draft flag; posts go live on the next deploy.
