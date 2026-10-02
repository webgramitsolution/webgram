# Blog article replica and rich guest editor

## What will change
- Rebuild the blog detail center column to match the supplied reference: breadcrumb, featured image, category label, title, author/date/read-time/views/share row, clean article body, previous/next navigation, then the credit-gated comment form.
- Keep the existing fixed left and right AdSense rails unchanged on desktop and hide them cleanly on smaller screens.
- Replace the guest article textarea with a rich editing toolbar for headings/text, bold, underline, bullet lists, grid layouts, single images, and image galleries.
- Preserve formatted content pasted from ChatGPT, Claude, and similar editors by converting safe clipboard formatting into the article's stored format.
- Render rich articles safely without executing pasted scripts or unsafe HTML; existing plain-text articles remain compatible.

## Verification
- Check the article page against the reference at desktop and phone sizes.
- Test toolbar formatting, formatted paste, image/gallery insertion, submission validation, previous/next links, and the comment credit label.
- Confirm the current build remains clean and the stale `use-mobile.tsx` path is not present.

## Technical details
- Keep article content in the existing text field using a restricted Markdown-style format, avoiding unsafe raw HTML.
- Extend the article renderer for inline bold/underline, headings, lists, images, grids, and galleries.
- Restrict embedded images to safe HTTPS image URLs; ordinary external links remain disallowed for guest posts.
