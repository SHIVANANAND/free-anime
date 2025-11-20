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

[View Live Site](https://shivananand.github.io/free-anime/) *(Update with your GitHub Pages URL)*

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
