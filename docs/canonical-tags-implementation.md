# Canonical Tags Implementation Guide

## Overview
Canonical tags help prevent duplicate content issues by specifying the preferred version of a webpage. This guide outlines the implementation of canonical tags across the North Georgia Jet Clean website.

## Implementation Rules
1. Every page should have exactly one canonical tag
2. Use absolute URLs (including https:// and domain)
3. Place canonical tags in the `<head>` section
4. Self-reference canonical URLs on unique pages
5. Point duplicate/similar content to the main version

## Canonical Tag Structure
```html
<link rel="canonical" href="https://nga-jetclean.onrender.com/[page-path]" />
```

## Page-Specific Implementation

### Homepage
```html
<link rel="canonical" href="https://nga-jetclean.onrender.com/" />
```

### Service Pages
```html
<!-- Home Exterior Washing -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/services/home-exterior-washing" />

<!-- Driveway & Concrete Cleaning -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/services/driveway-concrete-cleaning" />

<!-- Roof Soft Washing -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/services/roof-soft-washing" />

<!-- Commercial Services -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/services/commercial" />
```

### Resource Pages
```html
<!-- FAQ Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/resources/faq" />

<!-- Surface Guide -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/resources/surface-guide" />

<!-- Process Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/resources/our-process" />

<!-- Maintenance Tips -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/resources/maintenance-tips" />
```

### Core Pages
```html
<!-- About Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/about" />

<!-- Contact/Quote Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/quote" />

<!-- Testimonials Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/testimonials" />
```

### Seasonal Pages
```html
<!-- Spring Cleaning -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/seasonal/spring" />

<!-- Summer Maintenance -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/seasonal/summer" />

<!-- Fall Preparation -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/seasonal/fall" />

<!-- Winter Services -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/seasonal/winter" />
```

## Special Cases

### Pagination
For paginated content, use:
```html
<!-- First Page -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/blog" />

<!-- Subsequent Pages -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/blog" />
<link rel="prev" href="https://nga-jetclean.onrender.com/blog?page=1" />
<link rel="next" href="https://nga-jetclean.onrender.com/blog?page=3" />
```

### Filter/Sort Parameters
When URLs contain filter or sort parameters, canonical should point to the clean URL:
```html
<!-- URL with parameters -->
<!-- https://nga-jetclean.onrender.com/services?sort=price -->
<link rel="canonical" href="https://nga-jetclean.onrender.com/services" />
```

## Implementation Checklist
1. [ ] Add canonical tags to all existing pages
2. [ ] Verify canonical URLs match sitemap URLs
3. [ ] Test canonical tags using validation tools
4. [ ] Monitor Search Console for canonical issues
5. [ ] Document any special canonical cases

## Best Practices
1. Always use absolute URLs
2. Keep URLs consistent (prefer https over http)
3. Avoid canonical chains
4. Match canonical URLs with sitemap entries
5. Use lowercase URLs consistently
6. Include trailing slashes consistently

## Validation
Test canonical implementation using:
1. View page source to verify tag presence
2. Use Google Search Console URL Inspector
3. Run crawler tools to check implementation
4. Monitor Search Console for canonical warnings

## Maintenance
1. Check canonical tags when adding new pages
2. Review Search Console for canonical issues
3. Update canonicals when changing URL structure
4. Maintain documentation of canonical strategy 