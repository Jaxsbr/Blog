# Testing Loading States and Lazy Load Images

## Testing Loading States

### Method 1: Browser DevTools Network Throttling

1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Go to Network tab**
3. **Enable throttling**:
   - Click the throttling dropdown (usually shows "No throttling")
   - Select "Slow 3G" or "Fast 3G"
   - Or create custom throttling: "Add..." → Set download to 50-100 Kbps

4. **Reload the page** - You'll see the loading spinner while posts load

### Method 2: Add Artificial Delay (Development Only)

Temporarily modify `src/pages/Home.tsx` to add a delay:

```typescript
useEffect(() => {
    // Add artificial delay for testing
    const delay = new Promise(resolve => setTimeout(resolve, 2000));
    
    delay.then(() => {
        fetchPostList()
            .then((posts) => {
                setAllPosts(posts);
                setFilteredPosts(posts);
            })
            .catch((error) => {
                console.error('Failed to load posts', error);
            })
            .finally(() => {
                setLoading(false);
            });
    });
}, []);
```

### Method 3: Disable Cache

1. **Open DevTools** → Network tab
2. **Check "Disable cache"**
3. **Reload page** - Forces fresh requests, slower loading

### What to Look For

- ✅ Loading spinner appears immediately when page loads
- ✅ Spinner shows "Loading posts..." message
- ✅ Spinner disappears when content loads
- ✅ Smooth transition (no flash of content)
- ✅ Works on both Home page and PostDetail page

---

## Testing Lazy Load Images

### Method 1: Visual Testing (Easiest)

1. **Open a post with images** (e.g., `/post/blog-migration-hexo-to-react`)
2. **Scroll slowly** down the page
3. **Watch for**:
   - Placeholder appears first (image icon)
   - Image fades in when it enters viewport
   - Smooth transition

### Method 2: Browser DevTools Network Tab

1. **Open DevTools** → Network tab
2. **Filter by "Img"** (images only)
3. **Reload page** - Images should NOT load immediately
4. **Scroll down** - Watch images load as they enter viewport
5. **Check timing** - Images load ~50px before entering viewport (rootMargin)

### Method 3: Intersection Observer Testing

1. **Open DevTools** → Console
2. **Run this to see when images intersect**:

```javascript
// Monitor Intersection Observer
const images = document.querySelectorAll('.lazy-image');
images.forEach((img, i) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Image ${i} is now visible`);
            }
        });
    }, { rootMargin: '50px' });
    observer.observe(img);
});
```

### Method 4: Force Slow Image Loading

1. **Open DevTools** → Network tab
2. **Enable throttling** (Slow 3G)
3. **Scroll to images** - You'll see:
   - Placeholder appears immediately
   - Image loads slowly (network throttled)
   - Image fades in when loaded

### Method 5: Test with Many Images

Create a test post with multiple images to see lazy loading in action:

```markdown
# Test Post with Many Images

![Image 1](https://via.placeholder.com/800x400)
![Image 2](https://via.placeholder.com/800x400)
![Image 3](https://via.placeholder.com/800x400)
![Image 4](https://via.placeholder.com/800x400)
![Image 5](https://via.placeholder.com/800x400)
```

### What to Look For

- ✅ Images don't load until they're near viewport (50px before)
- ✅ Placeholder shows while loading
- ✅ Smooth fade-in transition when image loads
- ✅ Error handling if image fails to load
- ✅ No layout shift (images have proper dimensions)
- ✅ Network tab shows images loading on-demand

---

## Quick Test Checklist

### Loading States
- [ ] Home page shows spinner on initial load
- [ ] Post detail page shows spinner when loading
- [ ] Spinner has proper animation
- [ ] Message text is readable
- [ ] Works with slow network

### Lazy Load Images
- [ ] Images don't load until scrolled into view
- [ ] Placeholder appears before image loads
- [ ] Image fades in smoothly when loaded
- [ ] Error state shows if image fails
- [ ] Multiple images load independently
- [ ] Works on mobile (touch scrolling)

---

## Advanced: Performance Testing

### Lighthouse Audit

1. **Open DevTools** → Lighthouse tab
2. **Run audit** for Performance
3. **Check**:
   - "Defer offscreen images" should pass
   - "Efficiently encode images" recommendations
   - Overall performance score

### Network Waterfall

1. **Network tab** → View as "Waterfall"
2. **Reload page**
3. **Verify**: Images load in order as you scroll, not all at once

### Console Monitoring

Add this to see lazy load events:

```javascript
// Monitor all lazy image loads
document.addEventListener('load', (e) => {
    if (e.target.classList.contains('lazy-image')) {
        console.log('Lazy image loaded:', e.target.src);
    }
}, true);
```

