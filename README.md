# Faith Banquerigo Portfolio

A responsive portfolio website for Faith Banquerigo, a video editor and graphic designer based in San Jose del Monte, Bulacan, Philippines.

## Features

- Responsive editorial design for desktop and mobile
- Filterable project gallery
- Full-size artwork preview dialog
- About, skills, experience, education, and contact sections
- Downloadable résumé
- Accessible navigation and reduced-motion support
- Plain HTML, CSS, and JavaScript—no package manager or build step

## Project structure

```text
.
├── assets/
│   ├── faith-banquerigo.png
│   └── work/
├── index.html
├── styles.css
├── script.js
└── FAITH_BANQUERIGO_resume.pdf
```

## Run locally

You can open `index.html` directly, or serve the folder locally:

```powershell
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy with GitHub Pages

The included GitHub Actions workflow automatically deploys the site whenever a commit is pushed to `main`.

After pushing the repository:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Run the workflow or push another commit if deployment does not start automatically.

The published URL will normally be:

```text
https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

## Content

Portfolio artwork and personal information belong to Faith Banquerigo. Do not reuse the included images or résumé without permission.

