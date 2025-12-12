# Quick Test Guide: Loading States & Lazy Images

## 🚀 Fastest Way to Test

### Test Loading States (30 seconds)

1. **Open your blog** in browser: `npm run dev`
2. **Open DevTools** (F12)
3. **Network tab** → Throttling dropdown → Select **"Slow 3G"**
4. **Hard refresh** (Cmd+Shift+R / Ctrl+Shift+R)
5. **Watch**: Loading spinner appears while posts load

### Test Lazy Images (1 minute)

1. **Open a post with images** (or create a test post)
2. **Open DevTools** → **Network tab** → Filter: **"Img"**
3. **Reload page** - Notice images DON'T load immediately
4. **Scroll down slowly** - Watch images load in Network tab as you scroll
5. **Check**: Images load ~50px before entering viewport

---

## 📋 Step-by-Step Testing

### Loading States Test

#### Method 1: Network Throttling (Recommended)
```
1. DevTools (F12) → Network tab
2. Click throttling dropdown (top toolbar)
3. Select "Slow 3G" or "Fast 3G"
4. Reload page (Cmd+R / Ctrl+R)
5. Observe loading spinner
```

#### Method 2: Add Temporary Delay
Edit `src/pages/Home.tsx` temporarily:
```typescript
useEffect(() => {
    // Add 2 second delay for testing
    setTimeout(() => {
        fetchPostList()
            .then((posts) => {
                setAllPosts(posts);
                setFilteredPosts(posts);
            })
            .finally(() => setLoading(false));
    }, 2000);
}, []);
```

### Lazy Images Test

#### Method 1: Visual Test
```
1. Go to any post with images
2. Scroll slowly down the page
3. Watch for:
   - Placeholder icon appears first
   - Image fades in when near viewport
   - Smooth transition
```

#### Method 2: Network Tab Test
```
1. DevTools → Network tab
2. Filter by "Img" (images only)
3. Reload page
4. Scroll down
5. Watch images load one by one in Network tab
```

#### Method 3: Console Monitor
Paste in browser console:
```javascript
// Monitor lazy image loading
document.addEventListener('load', (e) => {
    if (e.target.classList?.contains('lazy-image')) {
        console.log('🖼️ Image loaded:', e.target.src);
    }
}, true);
```

---

## 🧪 Using Test Components

### Add Test Components (Development Only)

Temporarily add to `src/pages/Home.tsx`:

```typescript
import { LoadingStateTest, LazyImageTest } from '../components/TestUtils';

// In your component:
{process.env.NODE_ENV === 'development' && (
    <>
        <LoadingStateTest />
        <LazyImageTest />
    </>
)}
```

### Test Components Available

- **`LoadingStateTest`** - Button to simulate loading
- **`LazyImageTest`** - Multiple test images to scroll through

---

## ✅ What to Verify

### Loading States ✓
- [ ] Spinner appears on page load
- [ ] Spinner shows message ("Loading posts...")
- [ ] Smooth animation (3 bouncing circles)
- [ ] Disappears when content loads
- [ ] Works on Home page
- [ ] Works on PostDetail page

### Lazy Images ✓
- [ ] Images don't load until scrolled into view
- [ ] Placeholder shows before image loads
- [ ] Image fades in smoothly (opacity transition)
- [ ] Error message shows if image fails
- [ ] Multiple images load independently
- [ ] Works on mobile (touch scrolling)

---

## 🔍 Debugging Tips

### Loading Spinner Not Showing?
- Check if `loading` state is `true`
- Verify `LoadingSpinner` component is imported
- Check browser console for errors

### Images Loading Immediately?
- Check Network tab - images should load on scroll
- Verify `LazyImage` component is used (not regular `<img>`)
- Check Intersection Observer is working (console logs)

### Images Not Loading?
- Check image URLs are valid
- Verify CORS if using external images
- Check browser console for errors
- Verify `isInView` state becomes `true`

---

## 📊 Performance Testing

### Lighthouse Audit
```
1. DevTools → Lighthouse tab
2. Select "Performance"
3. Click "Analyze page load"
4. Check "Defer offscreen images" passes
```

### Network Waterfall
```
1. Network tab → View as "Waterfall"
2. Reload page
3. Verify images load as you scroll (not all at once)
```

---

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# Build and preview
npm run build && npm run preview

# Test with slow network (Chrome)
# DevTools → Network → Throttling → Slow 3G
```

---

## 💡 Pro Tips

1. **Use "Disable cache"** in Network tab for consistent testing
2. **Mobile view** - Test lazy loading on mobile devices (touch scrolling)
3. **Multiple tabs** - Open Network tab and Elements tab side-by-side
4. **Console logs** - Add temporary `console.log` to track state changes
5. **Slow scroll** - Scroll very slowly to see images load one by one

---

## 🐛 Common Issues

### Issue: Images load all at once
**Fix**: Check that `LazyImage` component is used, not regular `<img>` tags

### Issue: Loading spinner flashes too quickly
**Fix**: Use Network throttling to slow down requests

### Issue: Placeholder doesn't show
**Fix**: Check CSS for `.lazy-image-placeholder` is loaded

### Issue: Images don't fade in
**Fix**: Verify `.lazy-image.loaded` class is applied and CSS transition works

