# Personal Knowledge Blog

A modern, lightweight blog built with React, TypeScript, and Vite. This blog replaces the previous Hexo-based setup with a custom solution that provides better control, modern development experience, and serves as a portfolio piece.

## 🚀 Features

- **Modern Stack**: React + TypeScript + Vite for fast development and optimal performance
- **Markdown Support**: Write posts in markdown with full GitHub Flavored Markdown support
- **Syntax Highlighting**: Beautiful code highlighting using Prism
- **Search**: Client-side search across all posts (title, content, tags)
- **Tag Filtering**: Filter posts by tags
- **Featured Posts**: Showcase section for recent posts
- **Mobile Responsive**: Works great on all devices
- **Fast**: Static site generation with optimal loading performance
- **GitHub Actions**: Automated deployment to GitHub Pages

## 📁 Project Structure

```
Blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   └── posts/                  # Markdown blog posts
│       ├── post-1.md
│       ├── post-2.md
│       └── ...
├── src/
│   ├── components/             # React components
│   │   ├── PostList.tsx        # List of posts
│   │   ├── PostDetail.tsx      # Individual post view
│   │   ├── SearchBar.tsx       # Search functionality
│   │   ├── TagFilter.tsx       # Tag filtering
│   │   ├── FeaturedPosts.tsx   # Featured/recent posts
│   │   ├── Header.tsx          # Site header
│   │   └── Footer.tsx          # Site footer
│   ├── pages/                  # Page components
│   │   ├── Home.tsx            # Home page
│   │   └── TagPage.tsx         # Tag-filtered page
│   ├── utils/                  # Utility functions
│   │   ├── posts.ts            # Post loading/parsing
│   │   └── search.ts           # Search functionality
│   ├── types/                  # TypeScript types
│   │   └── Post.ts             # Post interfaces
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Blog.git
cd Blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## ✍️ Writing Blog Posts

### Creating a New Post

1. Create a new markdown file in `public/posts/`:
```bash
touch public/posts/my-new-post.md
```

2. Add frontmatter at the top of the file:
```markdown
---
title: "My New Post Title"
date: 2025-12-11 10:00:00
tags:
- JavaScript
- React
- TypeScript
featured: false
---

Your post content starts here...
```

### Frontmatter Fields

- `title` (required): The post title
- `date` (required): Publication date in `YYYY-MM-DD HH:mm:ss` format
- `tags` (optional): Array of tags
- `featured` (optional): Set to `true` to feature this post

### Markdown Features

- **Headers**: Use `#`, `##`, `###`, etc.
- **Code blocks**: Use triple backticks with language:
  ````markdown
  ```typescript
  const greeting: string = "Hello, World!";
  ```
  ````
- **Lists**: Both ordered and unordered
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Tables**: GitHub Flavored Markdown tables
- **Blockquotes**: Use `>`

### File Naming

Use kebab-case for filenames: `my-awesome-post.md`

The filename becomes the URL slug: `/post/my-awesome-post`

## 🚀 Deployment

### GitHub Pages (Recommended)

This blog is configured to deploy automatically to GitHub Pages using GitHub Actions.

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository Settings
   - Navigate to Pages
   - Under "Build and deployment" → Source, select "GitHub Actions"

3. The blog will automatically deploy on every push to `main`

4. Access your blog at: `https://yourusername.github.io/Blog/`

### Custom Domain (Optional)

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure your DNS settings to point to GitHub Pages
3. Update the `base` in `vite.config.ts` to `/` instead of `/Blog/`

## 🎨 Customization

### Styling

Edit `src/App.css` and `src/index.css` to customize the look and feel.

Key CSS variables in `src/index.css`:
```css
--primary-color: #2563eb;
--text-color: #1f2937;
--bg-color: #ffffff;
--bg-secondary: #f9fafb;
```

### Site Title

Update the site title in `src/components/Header.tsx`:
```typescript
<h1>Your Blog Title</h1>
```

### Base URL

If deploying to a different path, update `vite.config.ts`:
```typescript
base: '/your-repo-name/',
```

And update `App.tsx`:
```typescript
<Router basename="/your-repo-name">
```

## 🔧 Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering
- **Prism**: Syntax highlighting
- **Gray Matter**: Frontmatter parsing

## 📝 Migration from Hexo

This blog was migrated from Hexo to provide:
- More control over features and styling
- Modern development experience
- Portfolio piece demonstrating React + TypeScript skills
- Simpler deployment workflow (single repo vs. two)
- Faster build times

See the migration blog post for details: [Coming soon]

## 🐛 Troubleshooting

### Posts not showing up

- Verify the markdown files are in `public/posts/`
- Check that frontmatter is valid YAML
- Ensure date is in correct format: `YYYY-MM-DD HH:mm:ss`

### Build fails

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### GitHub Pages 404

- Verify `base` in `vite.config.ts` matches your repository name
- Ensure GitHub Actions workflow has proper permissions
- Check that GitHub Pages is enabled in repository settings

## 📄 License

MIT License - feel free to use this as a template for your own blog!

## 🤝 Contributing

This is a personal blog, but suggestions and improvements are welcome via issues or pull requests.

---

Built with ❤️ using React, TypeScript, and Vite
