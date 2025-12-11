# Getting Started

Your new blog is ready! Here's how to use it.

## 🚀 Quick Start

The development server should already be running. Open your browser to:

```
http://localhost:5173
```

You should see your blog with all 22 posts (21 migrated + 1 new migration post).

## ✍️ Writing a New Post

1. Create a new markdown file in `public/posts/`:

```bash
touch public/posts/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: "My Awesome New Post"
date: 2025-12-11 15:30:00
tags:
- JavaScript
- React
- Tutorial
featured: false
---

## Introduction

Your post content goes here...

### Code Example

```javascript
const greeting = "Hello, World!";
console.log(greeting);
\```

More content...
```

3. The dev server will auto-reload. Your new post appears immediately!

## 🔍 Testing Features

### Search
- Type in the search bar on the home page
- Try searching for: "Python", "AWS", "Hexo"
- Results update as you type

### Tag Filtering
- Click any tag in the sidebar or on a post
- See all posts with that tag
- Try clicking "Python" or "Boxyvault"

### Featured Posts
- Recent posts appear in the sidebar
- The migration post is marked as featured

### Individual Posts
- Click any post title
- See full post with syntax highlighting
- Navigate back with "← Back to all posts"

## 📝 Your Migrated Posts

All 21 posts from your old Hexo blog are now available:

- python-reference-guide
- s3-signed-urls
- sql-cheatsheet
- boxyvault-project-planning
- boxyvault-the-first-lambda-function
- chat-gpt-csharp-integration
- hexo-basics
- host-a-static-website-with-aws-s3
- neural-network-intro
- node-version-toggle
- python-mastery-general-idle
- python-mastery-general-pycharm
- aws-comprehend-integration
- aws-profile-selection-dotnetsdk
- boxyvault-file-management
- boxyvault-github-cicd
- boxyvault-github-migration
- boxyvault-lambda-infra
- ai-fundementals-six-principles-responsible-design
- api-gateway-throttling
- aws-amplify-auth-cognito

Plus the new migration post!

## 🎨 Customizing

### Change Site Title

Edit `src/components/Header.tsx`:

```typescript
<h1>Your Custom Title</h1>
```

### Modify Colors

Edit `src/index.css`:

```css
:root {
  --primary-color: #2563eb;  /* Change this! */
  --text-color: #1f2937;
  --bg-color: #ffffff;
}
```

### Add Pages

Create a new page component in `src/pages/`, then add a route in `src/App.tsx`:

```typescript
<Route path="/about" element={<About />} />
```

## 🚀 Deploying to GitHub

### Initial Setup

1. Create a GitHub repository named `Blog` (or any name)

2. Push your code:

```bash
cd /Users/jacobusbrink/Code/Blog
git add .
git commit -m "Initial blog setup with React + TypeScript"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/Blog.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Click "Pages" in the sidebar
   - Under "Build and deployment" → Source
   - Select "GitHub Actions"

4. GitHub Actions will automatically build and deploy your blog!

### Accessing Your Live Blog

Your blog will be at:
```
https://YOUR_USERNAME.github.io/Blog/
```

### Continuous Deployment

Every time you push to `main`, GitHub Actions automatically:
1. Installs dependencies
2. Builds the site
3. Deploys to GitHub Pages

Just write posts and push—that's it!

## 🔧 Development Commands

```bash
# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## 📱 Mobile Testing

The blog is mobile-responsive. Test by:
1. Resizing your browser window
2. Using browser dev tools (F12) → Device toolbar
3. Opening on your phone using your local IP

## ✅ What's Working

- ✅ 22 blog posts (21 old + 1 new)
- ✅ Search functionality
- ✅ Tag filtering
- ✅ Syntax highlighting
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ Type-safe code
- ✅ GitHub Actions deployment
- ✅ Clean, modern design

## 📚 Next Steps

1. **Test the blog**: Browse through posts, try search and tags
2. **Write a new post**: Follow the format above
3. **Customize**: Change colors, title, add features
4. **Deploy**: Push to GitHub and enable Pages
5. **Share**: Update your portfolio/LinkedIn with the new blog link

## 🐛 Troubleshooting

### Dev server not running?

```bash
cd /Users/jacobusbrink/Code/Blog
npm run dev
```

### Posts not showing?

Check that markdown files are in `public/posts/` with correct frontmatter.

### Build fails?

```bash
rm -rf node_modules
npm install
npm run build
```

## 🎉 You're Done!

Your blog is fully functional and ready to use. The migration from Hexo is complete!

Check out the blog at http://localhost:5173 and start exploring.

---

**Questions or issues?** See the full README.md for detailed documentation.

