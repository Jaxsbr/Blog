---
title: "Blog Migration: From Hexo to React + TypeScript"
date: 2025-12-11 10:00:00
tags:
- React
- TypeScript
- Hexo
- Blog
- Migration
- Vite
- Portfolio
featured: true
---

## Why Rebuild?

After about a year away from blogging, I decided to return with a fresh perspective—and a fresh codebase. My old blog was built with [Hexo](https://hexo.io/), a static site generator that served me well. However, as I'm currently revamping my career as a software engineer and focusing on modern AI-integrated full-stack development, I saw an opportunity to turn my blog into both a platform and a portfolio piece.

## The Old Setup: Hexo

### How It Worked

My previous blogging workflow involved two GitHub repositories:

```
iblogyo/ (source repo)
  ├── source/_posts/          # Markdown posts here
  ├── _config.yml             # Hexo configuration
  └── Deploy.ps1              # PowerShell deployment script
      ├── hexo g              # Generate static HTML
      ├── hexo d              # Deploy to pkb-blog repo
      └── git push            # Commit source changes

pkb-blog/ (deployment repo)
  └── [Generated HTML files]  # Served by GitHub Pages
```

When I wanted to publish a new post, I would:
1. Write markdown in `iblogyo/source/_posts/`
2. Run `Deploy.ps1` which would:
   - Generate static HTML files to `public/pkb-blog/`
   - Deploy to the `pkb-blog` repository
   - Commit and push source changes to `iblogyo`
3. GitHub Pages would serve the content from `pkb-blog` at `/pkb-blog` path

### What Worked Well

- **Simple authoring**: Just write markdown
- **Automatic deployment**: One script handled everything
- **Themes**: Built-in theme system (I used Landscape)
- **Fast setup**: Got started in minutes

### Pain Points

- **Two repositories**: Source and deployment separate
- **Windows-specific**: Used PowerShell script, now on macOS
- **Limited control**: Theme-based customization was restrictive
- **Not portfolio-relevant**: Didn't showcase modern skills
- **Outdated workflow**: Not aligned with current development practices

## The New Stack: React + TypeScript + Vite

### Technology Choices

I rebuilt the blog using:

- **React 18**: Industry-standard UI library
- **TypeScript**: Type safety and better developer experience
- **Vite**: Lightning-fast dev server and build tool
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering with GitHub Flavored Markdown
- **Prism**: Beautiful syntax highlighting
- **GitHub Actions**: Automated CI/CD deployment

### Why These Technologies?

**React + TypeScript**: These are core skills for modern full-stack roles, especially in AI-integrated applications. Building this blog demonstrates practical proficiency.

**Vite**: Compared to Create React App or webpack, Vite offers:
- Instant dev server startup
- Lightning-fast Hot Module Replacement (HMR)
- Optimized production builds
- Simple configuration

**Single Repository**: Everything lives in one place—source code, markdown posts, and deployment configuration. GitHub Actions handles the build and deployment automatically.

**Full Control**: No themes to fight with. I own every line of CSS and every component. Want to add a feature? Just build it.

## Architecture Overview

### File Structure

```
Blog/
├── public/posts/           # Markdown files
│   ├── post-1.md
│   └── post-2.md
├── src/
│   ├── components/         # React components
│   │   ├── PostList.tsx
│   │   ├── PostDetail.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TagFilter.tsx
│   │   └── FeaturedPosts.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   └── TagPage.tsx
│   ├── utils/             # Utility functions
│   │   ├── posts.ts       # Post loading/parsing
│   │   └── search.ts      # Search logic
│   ├── types/             # TypeScript definitions
│   │   └── Post.ts
│   └── App.tsx
└── .github/workflows/
    └── deploy.yml         # GitHub Actions
```

### How It Works

**Post Loading**:
1. Markdown files live in `public/posts/`
2. Vite's `import.meta.glob` dynamically imports all `.md` files
3. `gray-matter` parses frontmatter (title, date, tags)
4. Posts are sorted by date and indexed for search

**Routing**:
- `/` - Home page with all posts
- `/post/:slug` - Individual post detail
- `/tag/:tag` - Posts filtered by tag

**Search**:
- Client-side search (no backend needed)
- Searches across title, tags, and content
- Results update as you type

**Deployment**:
- Push to `main` branch
- GitHub Actions runs automatically
- Builds the site with `npm run build`
- Deploys to GitHub Pages

## Migration Process

### Step 1: Project Setup

```bash
cd Blog
npm create vite@latest . -- --template react-ts
npm install react-router-dom react-markdown gray-matter
npm install react-syntax-highlighter remark-gfm
```

### Step 2: Core Components

Built reusable components:
- `PostList` - Display multiple posts
- `PostDetail` - Full post rendering with syntax highlighting
- `SearchBar` - Real-time search
- `TagFilter` - Filter by tags
- `FeaturedPosts` - Showcase section

### Step 3: Post Migration

```bash
cp iblogyo/source/_posts/*.md Blog/public/posts/
```

All 21 existing posts copied directly—no conversion needed! The frontmatter format was compatible.

### Step 4: Styling

Created clean, readable styles with:
- Responsive design (mobile-first)
- Syntax highlighting with VS Code Dark+ theme
- Simple color scheme
- Good typography

### Step 5: GitHub Actions

Created `.github/workflows/deploy.yml`:
- Installs dependencies
- Builds the site
- Deploys to GitHub Pages
- Runs automatically on every push

## Features

### What's New

✅ **Search**: Type to search across all posts instantly  
✅ **Tag Filtering**: Click a tag to see related posts  
✅ **Featured Posts**: Recent posts showcase  
✅ **Reading Time**: Automatic calculation  
✅ **Mobile Responsive**: Works great on all devices  
✅ **Fast Loading**: Optimized Vite builds  
✅ **Type Safe**: Full TypeScript coverage  

### What's the Same

✅ **Markdown**: Still write in markdown  
✅ **Syntax Highlighting**: Code blocks look great  
✅ **Tags**: Same tagging system  
✅ **Frontmatter**: Compatible format  
✅ **GitHub Pages**: Still free hosting  

## Technical Learnings

### Vite's `import.meta.glob`

This Vite feature is powerful for loading multiple files:

```typescript
const postModules = import.meta.glob('/public/posts/*.md', { as: 'raw' });

for (const path in postModules) {
  const content = await postModules[path]();
  // Process markdown...
}
```

### React Markdown Customization

Custom code rendering for syntax highlighting:

```typescript
<ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {post.content}
</ReactMarkdown>
```

### GitHub Actions Permissions

Key configuration for deploying to Pages:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Performance

### Build Time

- **Hexo**: ~5 seconds for 21 posts
- **Vite**: ~2 seconds for full React build

### Page Load

- **Initial Load**: ~150KB (gzipped)
- **Time to Interactive**: < 1 second
- **Markdown Parsing**: Client-side, instant once loaded

## Future Enhancements

Possible additions:

- [ ] RSS feed generation
- [ ] Dark mode toggle
- [ ] Post series/collections
- [ ] Related posts suggestions
- [ ] Comments system (maybe)
- [ ] Reading progress indicator

## Conclusion

This migration accomplished multiple goals:

1. **Portfolio Piece**: Demonstrates modern React + TypeScript skills
2. **Better Workflow**: Single repo, automated deployment
3. **More Control**: Own the entire stack
4. **Learning Experience**: Reinforced current skills
5. **Documentation**: This post itself documents the journey!

The entire migration took about 2 days of focused work:
- Day 1: Project setup, core components, styling
- Day 2: Post migration, deployment, documentation

### Was It Worth It?

Absolutely. While Hexo worked fine, this new setup:
- Better aligns with my career direction (modern full-stack + TypeScript)
- Provides a portfolio piece I can discuss in interviews
- Gives me complete control for future features
- Modernizes my blogging workflow
- Serves as a learning project

### For You

If you're considering a similar migration:

**Stick with Hexo if**:
- You just want to blog, not build
- Current setup works fine
- You don't care about the tech stack

**Build your own if**:
- You want to learn/showcase specific technologies
- You need custom features not available in generators
- You want complete control over every aspect
- You enjoy the building process itself

## Resources

- [Source Code](https://github.com/yourusername/Blog)
- [Vite Documentation](https://vitejs.dev/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

---

**Time Investment**: 2 days  
**Lines of Code**: ~1,000  
**Worth It**: 100%  

Back to blogging! 🎉

