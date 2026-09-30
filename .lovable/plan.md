# Mobile polish and complete blog taxonomy

## Homepage mobile
- Hide the uploaded device/platform image shown in the “From Storefront to Back Office” area on phones only; keep tablet and desktop unchanged.
- Keep “Built Around Your Industry” and “Work That Speaks for Itself” as touch-swipe carousels on phones, but hide their visible horizontal scrollbar and preserve snap alignment.
- Verify there is no page-level horizontal overflow and that both rows remain usable by touch and keyboard.

## Blog listing
- Remove the “Ideas for digital growth” heading and remove the featured hero/gallery from the blog listing.
- Start the page with the compact journal/category navigation, then the existing ad/search/category content and real article groups.
- Keep the public page grouped by primary category; articles assigned to any child subcategory appear under their parent category.

## Categories, subcategories, and tags
- Add an additive blog taxonomy model: primary categories, child subcategories, post-to-subcategory selection, and reusable post tags.
- Import the 20 primary categories and supplied subcategory list from the uploaded document without replacing existing posts.
- Add secured admin management for creating, editing, activating/deactivating, and deleting unused categories/subcategories, with safe blocking when deletion would orphan assigned posts.
- Extend the admin article editor to select a primary category, subcategory, and tags.
- Make primary category and subcategory required for guest submissions; show only child options belonging to the selected primary category.
- Keep public grouping based on the selected primary category, even when the article is assigned through a subcategory.

## Guest article FAQs and search controls
- Require exactly five completed FAQ question/answer pairs for every new guest article and validate this in the database function, not only in the form.
- Display those FAQs on the published article as accessible expandable items and include FAQ structured data when present.
- Keep guest dashboard/profile pages `noindex`; add `noindex,follow` to any tag-filter/archive view while individual published articles remain indexable.

## Security and compatibility
- Apply additive database changes with explicit grants, row-level access rules, foreign keys, and admin-only taxonomy writes.
- Preserve current posts by mapping their existing category values to the new primary-category structure.
- Update generated database types and all public/admin/guest reads and writes together.
- Confirm the stale `use-mobile.tsx` error is absent, then run type checks and verify phone plus desktop flows, including an authenticated guest submission and admin taxonomy editing when a test session is available.
