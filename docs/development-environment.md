# Independent development repository

- Development source: `https://github.com/v3r3v/dev-adelvio`
- Development preview, once explicitly published: `https://v3r3v.github.io/dev-adelvio/`
- Production source: `https://github.com/v3r3v/adelvio`
- Production website: `https://adelvio.com/`

The development repository contains the marketing redesign and the existing Cloudflare portal demo source. Local SQL work remains in the original working copy and is not included in this marketing preview. No development data is connected to the production backend by this setup. The existing portal footer link opens the separately hosted Cloudflare demo.

GitHub Actions sets `PAGES_REPOSITORY` from its own repository identity. Asset paths, prerendered image URLs, canonical metadata and social sharing images therefore use `/dev-adelvio/` when building here. The development build requests `noindex, nofollow`; it is still public if published.

Pushes and pull requests run checks only. To publish an approved phone preview, choose **Actions → Adelvio preview checks and publishing → Run workflow → main**, check **publish_preview**, and run it. The repository's Pages source must be **GitHub Actions**. Do not set a custom domain or connect this repository to the production Cloudflare Worker.

For a local development-repository build in PowerShell:

```powershell
$env:PAGES_REPOSITORY = 'v3r3v/dev-adelvio'
npm run build:pages
Remove-Item Env:PAGES_REPOSITORY
```

Production remains a separate, explicitly approved release. Do not run `deploy:cloudflare` from this development repository. Its inherited production command is guarded and cannot run from CI. See [release controls](release-controls.md). Promote approved changes deliberately to the production repository; neither repository automatically syncs changes to the other.
