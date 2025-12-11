# Hexo Workflow Analysis

This document captures how the old Hexo blogging workflow functioned, serving as both historical documentation and context for the migration.

## Original Setup

### Repository Structure

**Two-Repository Approach:**

1. **`iblogyo`** (Source Repository)
   - Contains Hexo source files
   - Markdown posts in `source/_posts/`
   - Configuration in `_config.yml`
   - Deployment script `Deploy.ps1`

2. **`pkb-blog`** (Deployment Repository)
   - Contains generated static HTML/CSS/JS
   - Served by GitHub Pages
   - Accessible at `https://jaxsbr.github.io/pkb-blog/`

### Configuration Analysis

**_config.yml Key Settings:**

```yaml
title: Personal Knowledgebase Blog
author: jacobus brink
url: https://jaxsbr.github.io/
root: /pkb-blog              # Sub-path for GitHub Pages
public_dir: public/pkb-blog  # Output directory matches root path

# Deployment configuration
deploy:
  type: 'git'
  repo: 'git@github.com:Jaxsbr/pkb-blog.git'
  branch: main
```

The `root` and `public_dir` settings were configured to serve the blog as a subdirectory of the main GitHub Pages site.

### Post Frontmatter Format

Hexo posts used YAML frontmatter:

```yaml
---
title: "Post Title"
date: 2023-10-14 15:45:41
tags:
- Tag 1
- Tag 2
- Tag 3
---

Post content here...
```

**Format Details:**
- **Title**: String (can include quotes for special characters)
- **Date**: Format `YYYY-MM-DD HH:mm:ss`
- **Tags**: YAML array format with dashes

**Alternative Tag Format:**
Some posts used inline array format:
```yaml
tags: [Hexo, Blog, Tutorial]
```

Both formats are valid YAML and were handled by gray-matter during migration.

## Workflow Steps

### Writing a New Post

1. Open Windows laptop (old development environment)
2. Navigate to `iblogyo` repository
3. Create new markdown file in `source/_posts/`
4. Write content with frontmatter
5. Save file

### Publishing Workflow

**Deploy.ps1 Script:**

```powershell
hexo g      # Generate static files
hexo d      # Deploy to pkb-blog repo
git add .   # Stage changes in iblogyo
git commit -m "updated"
git push    # Push source to iblogyo repo
```

**What Each Command Does:**

1. **`hexo g` (generate)**
   - Reads all markdown files from `source/_posts/`
   - Parses frontmatter
   - Converts markdown to HTML
   - Applies Landscape theme styling
   - Outputs to `public/pkb-blog/`
   - Generates index pages, tag pages, archive pages

2. **`hexo d` (deploy)**
   - Uses `hexo-deployer-git` plugin
   - Connects to `pkb-blog` repository
   - Pushes contents of `public/pkb-blog/` to `main` branch
   - GitHub Pages automatically serves the updated content

3. **`git add . && git commit && git push`**
   - Commits source markdown and config changes
   - Preserves authoring history in `iblogyo`

### Result

After running `Deploy.ps1`:
- New post appears on live blog within minutes
- Source preserved in `iblogyo`
- Generated HTML in `pkb-blog`
- Two commits (one in each repo)

## Theme System

### Landscape Theme

- Default Hexo theme
- Configuration in `_config.landscape.yml`
- Provided:
  - Homepage with post list
  - Individual post pages
  - Archive page
  - Tag pages
  - Sidebar with widgets
  - Mobile responsive layout

### Limitations

- Customization required theme file editing
- Limited control without forking theme
- Style changes required understanding theme structure
- Adding new features meant modifying theme files directly

## Post Processing

### Hexo's Build Process

1. **Read Phase**
   - Scan `source/` directory
   - Load markdown files
   - Parse frontmatter

2. **Process Phase**
   - Convert markdown to HTML (using marked.js)
   - Apply syntax highlighting (highlight.js)
   - Sort posts by date
   - Generate tag indexes
   - Generate archive pages

3. **Generate Phase**
   - Apply theme templates (EJS)
   - Create HTML files for each post
   - Create index pages
   - Create pagination
   - Copy theme assets (CSS, JS, images)

4. **Output Phase**
   - Write all files to `public_dir`
   - Preserve directory structure
   - Generate sitemap (if configured)

## Comparison: Then vs. Now

| Aspect | Hexo | React + Vite |
|--------|------|--------------|
| **Repositories** | 2 (source + deployment) | 1 (all-in-one) |
| **Build Tool** | Hexo CLI | Vite |
| **Deployment** | Manual script | GitHub Actions |
| **Customization** | Theme-based | Component-based |
| **Languages** | EJS templates | React + TypeScript |
| **Routing** | Static HTML pages | Client-side routing |
| **Search** | Not built-in | Client-side search |
| **Build Time** | ~5 seconds | ~2 seconds |
| **Dev Server** | `hexo server` | `vite` (HMR) |
| **Learning Curve** | Low (documentation) | Medium (React knowledge) |

## Why Hexo Worked (And Why It Was Time to Move On)

### What Hexo Did Well

✅ **Rapid Setup**: Blog operational in < 30 minutes  
✅ **Simple Workflow**: Write markdown, run script, done  
✅ **Theme Ecosystem**: Many pre-built themes  
✅ **Plugin System**: Extended functionality easily  
✅ **Documentation**: Clear, comprehensive docs  
✅ **Stable**: Mature project, few breaking changes  

### Why We Migrated

❌ **Not Portfolio-Relevant**: Doesn't showcase modern skills  
❌ **Limited Control**: Theme-based customization restrictive  
❌ **Two-Repo Complexity**: Source and deployment separated  
❌ **Platform Dependency**: Tied to Windows PowerShell script  
❌ **No Search**: Would require plugin or external service  
❌ **Static Mindset**: Not aligned with modern SPA patterns  
❌ **Career Alignment**: Not demonstrating React/TypeScript skills  

## Lessons Learned

### What to Preserve

1. **Markdown Workflow**: Still the best way to write content
2. **Frontmatter Format**: YAML frontmatter is universal
3. **Git-Based**: Version control for content is essential
4. **Static Hosting**: GitHub Pages is free and reliable

### What to Improve

1. **Single Repository**: Simpler mental model
2. **Automated Deployment**: No manual scripts
3. **Modern Tech Stack**: Skills-aligned technologies
4. **Full Control**: Own every aspect
5. **Developer Experience**: Fast feedback loop with Vite

## Migration Checklist

Tasks completed during migration:

- [x] Analyze Hexo configuration
- [x] Document workflow steps
- [x] Extract frontmatter format
- [x] Copy all 21 posts
- [x] Verify post compatibility
- [x] Test markdown rendering
- [x] Ensure tag system works
- [x] Validate date formats
- [x] Check syntax highlighting
- [x] Test all post links

## Post-Migration Notes

### Frontmatter Compatibility

All posts migrated without changes. The `gray-matter` library handled both YAML formats:

```yaml
# Array format (most posts)
tags:
- Python
- Django

# Inline format (some posts)
tags: [Python, Django]
```

### Special Considerations

**Relative Links**: Some posts had internal links like:
```markdown
[Previous Post](https://jaxsbr.github.io/pkb-blog/2023/10/13/post-name/)
```

These work fine in the new blog thanks to client-side routing handling external links naturally.

**Code Blocks**: All code blocks work with the new Prism syntax highlighter, no changes needed.

**Images**: No posts used images, but the new setup supports them via standard markdown syntax.

## Conclusion

Hexo was an excellent tool for quick blog setup and served its purpose well. The migration to React + TypeScript was motivated by career development goals rather than Hexo's limitations. This analysis preserves the context of the old workflow for reference and demonstrates the technical evolution from a static site generator to a custom React application.

---

**Document Created**: December 11, 2025  
**Total Posts Migrated**: 21  
**Migration Success Rate**: 100%  
**Compatibility Issues**: 0

