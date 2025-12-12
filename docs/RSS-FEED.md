# RSS Feed Implementation

## How RSS Works

RSS (Really Simple Syndication) is an XML format that allows users to subscribe to your blog's content. When someone clicks the RSS link, their RSS reader (like Feedly, NewsBlur, or browser extensions) fetches the XML file and displays your latest posts.

## The Problem

The RSS link was pointing to `/Blog/rss.xml`, but:
1. **No route existed** - React Router doesn't have a route for `/rss.xml`
2. **No static file** - The RSS feed wasn't being generated at build time
3. **404 error** - When clicked, the browser tried to fetch a non-existent file

## The Solution

For a static site (like one deployed to GitHub Pages), RSS feeds must be **generated at build time** as a static XML file. Here's what was implemented:

### 1. Build-Time RSS Generation

Created `scripts/generate-rss.ts` that:
- Reads all markdown posts from `public/posts/`
- Extracts metadata (title, date, excerpt, tags)
- Generates a valid RSS 2.0 XML file
- Writes it to `public/rss.xml`

### 2. Build Integration

Updated `package.json` to run RSS generation before building:
```json
"build": "npm run generate-rss && tsc && vite build"
```

### 3. Static File Serving

Vite automatically copies files from `public/` to the root of `dist/` during build, so:
- `public/rss.xml` → `dist/rss.xml`
- Available at: `https://yourdomain.com/Blog/rss.xml`

## Usage

### Generate RSS Feed Manually
```bash
npm run generate-rss
```

### Build (includes RSS generation)
```bash
npm run build
```

## RSS Feed Structure

The generated RSS feed includes:
- **Channel metadata**: Title, description, language
- **20 most recent posts** (sorted by date)
- **Post details**: Title, link, publication date, excerpt
- **Atom self-link**: For RSS reader discovery

## Customization

To update the site URL in the RSS feed, edit `scripts/generate-rss.ts`:
```typescript
const siteUrl = 'https://jaxsbr.github.io'; // Change to your domain
```

## Testing

After building, you can:
1. Open `dist/rss.xml` in a browser to verify it's valid XML
2. Use an RSS validator: https://validator.w3.org/feed/
3. Subscribe to the feed in an RSS reader to test

## Notes

- The RSS feed is regenerated on every build
- Only the 20 most recent posts are included
- Post excerpts are automatically generated from markdown content
- The feed follows RSS 2.0 specification with Atom namespace support

