# Schema Markup Implementation Guide

This document provides instructions for implementing the structured data schema markup on the North Georgia Jet Clean website. Proper implementation of schema markup will enhance search engine visibility and potentially lead to rich snippets in search results.

## Overview of Schema Files

1. **schema-localbusiness.json** - Contains comprehensive business information including services, location, and business details
2. **schema-faq.json** - Contains structured FAQ content for rich snippets in search results

## Implementation Instructions

### Step 1: Add Schema to Home Page

The LocalBusiness schema should be added to the homepage of the website. Add the following code to the `<head>` section of the home page:

```html
<script type="application/ld+json">
<!-- Insert the entire contents of schema-localbusiness.json here -->
</script>
```

### Step 2: Add FAQ Schema to FAQ Page

The FAQ schema should be added to the FAQ page of the website. Add the following code to the `<head>` section of the FAQ page:

```html
<script type="application/ld+json">
<!-- Insert the entire contents of schema-faq.json here -->
</script>
```

### Step 3: Validate Schema Implementation

After implementing the schema, validate that it's working properly using the following tools:

1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

### Step 4: Monitor Rich Results in Google Search Console

Once implemented, monitor the performance in Google Search Console's "Enhancements" section to ensure:

1. There are no errors in the schema implementation
2. The rich results are appearing in search results
3. Track click-through rate improvements

## Schema Customization Notes

### LocalBusiness Schema

- **Update NAP Information**: Ensure all Name, Address, Phone information is accurate and consistent throughout the website
- **Service Pricing**: Update the pricing information to match current service rates
- **Business Hours**: Verify operating hours are correct
- **Reviews**: Keep the reviews section updated with the latest customer testimonials

### FAQ Schema

- **Keep FAQ Content Updated**: When new questions are added to the website's FAQ section, update the schema accordingly
- **Prioritize Important FAQs**: Place the most common or important questions first in the schema list
- **Match Website Content**: Ensure the FAQ schema content exactly matches the visible content on the website

## Technical Implementation Recommendations

### Option 1: Direct HTML Insertion

For static sites, directly inserting the JSON-LD script into the HTML is the simplest approach.

### Option 2: Tag Manager Implementation

If using Google Tag Manager or similar system:

1. Create a new Custom HTML tag
2. Insert the schema JSON-LD code
3. Set the trigger to fire on the appropriate pages (home page for LocalBusiness, FAQ page for FAQ schema)

### Option 3: Dynamic Generation

For sites with a content management system:

1. Create a template for schema generation
2. Dynamically populate the schema fields from the CMS data
3. Implement automatic updating when site content changes

## Best Practices

1. **Keep Schema Updated**: When business information changes, update the schema markup accordingly
2. **Regular Validation**: Re-validate the schema periodically to ensure no errors have been introduced
3. **Monitor Performance**: Track the impact of schema implementation on search visibility and click-through rates
4. **Expand Coverage**: Consider implementing additional schema types for other aspects of the business (e.g., BreadcrumbList, WebSite, etc.)

## Additional Resources

- [Schema.org Documentation](https://schema.org/docs/schemas.html)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)
- [Bing Webmaster Structured Data Guidelines](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731) 