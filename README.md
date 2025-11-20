# FreeAnime Dekho! 🎬

A beautiful, responsive anime streaming website built with Next.js that aggregates free anime content from Muse Asia YouTube channel.

![FreeAnime](https://img.shields.io/badge/FreeAnime-Dekho!-FF3366?style=for-the-badge&logo=anime-planet&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)
![Static Site](https://img.shields.io/badge/Static_Site-Ready-4CAF50?style=flat&logo=github-pages)

## ✨ Features

- 🎯 **Modern UI/UX** - Clean, dark-themed interface with gradient accents
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🔍 **Advanced Search** - Real-time search with clickable search icons
- 📺 **Native Video Player** - Custom YouTube player with full controls
- 🎨 **Professional Design** - Netflix-inspired layout with smooth animations
- ⚡ **Static Generation** - Pre-built for fast loading and GitHub Pages deployment
- 🌐 **SEO Optimized** - Proper meta tags and structured content

## 🚀 Live Demo

[View Live Site](https://yourusername.github.io/free-anime) *(Update with your GitHub Pages URL)*

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Shad CN](https://ui.shadcn.com/) - Modern component library
- **Video Player**: [React YouTube](https://github.com/tjallingt/react-youtube) - YouTube API integration
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Deployment**: GitHub Pages (Static Export)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/free-anime.git
   cd free-anime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the project
npm run build

# The static files will be in the 'out' directory
```

## 📁 Project Structure

```
free-anime/
├── data/
│   └── muse_asia_full.json    # Anime data source
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── anime/[id]/        # Dynamic anime pages
│   │   │   ├── page.js        # Anime detail page
│   │   │   ├── AnimePlayer.js # Video player component
│   │   │   └── AnimePageClient.js # Client-side layout
│   │   ├── browse/            # Browse/search page
│   │   │   └── page.js
│   │   ├── my-list/           # Watchlist page
│   │   │   └── page.js
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   └── components/
│       ├── Header.js          # Navigation header
│       └── ui/                # Shad CN components
├── out/                       # Built static files (generated)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## 🌐 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `free-anime` (or your preferred name)
3. Don't initialize with README, .gitignore, or license

### Step 2: Upload Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: FreeAnime streaming website"

# Add remote repository
git remote add origin https://github.com/yourusername/free-anime.git

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**

### Step 4: Create GitHub Actions Workflow

Create a new file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5: Deploy

1. Commit and push the workflow file:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

2. Go to **Actions** tab in your repository
3. Click on the workflow run
4. Wait for deployment to complete
5. Your site will be live at: `https://yourusername.github.io/free-anime/`

## 🎨 Customization

### Change Hero Image

Edit `src/app/page.js` and replace the `HERO_IMAGE_URL`:

```javascript
const HERO_IMAGE_URL = 'https://your-image-url-here.jpg';
```

### Update Colors

Modify the color scheme in `tailwind.config.js` or directly in components using Tailwind classes.

### Add More Anime Data

Update `data/muse_asia_full.json` with additional anime playlists following the existing structure.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Muse Asia** - For providing free anime content
- **YouTube** - For hosting the video content
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework

---

**Made with ❤️ for anime lovers worldwide**

⭐ Star this repo if you found it helpful!
