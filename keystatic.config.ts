import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'My Blog',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The title of the blog post',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief summary for SEO and previews (150-160 characters ideal)',
          validation: { isRequired: true },
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Published Date',
          description: 'When the post was published',
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: 'Updated Date',
          description: 'When the post was last updated (optional)',
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          description: 'Featured image for the post',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        heroImageAlt: fields.text({
          label: 'Hero Image Alt Text',
          description: 'Describe the image for accessibility and SEO',
        }),
        category: fields.relationship({
          label: 'Category',
          description: 'Select a category for this post',
          collection: 'categories',
          validation: { isRequired: true },
        }),
        tags: fields.multiRelationship({
          label: 'Tags',
          description: 'Select one or more tags',
          collection: 'tags',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft posts are not published on the site',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          description: 'The main content of your blog post',
        }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Category Name',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief description of this category',
          multiline: true,
        }),
        color: fields.select({
          label: 'Color',
          description: 'Color for the category badge',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Purple', value: 'purple' },
            { label: 'Orange', value: 'orange' },
            { label: 'Red', value: 'red' },
            { label: 'Gray', value: 'gray' },
          ],
          defaultValue: 'blue',
        }),
      },
    }),
    tags: collection({
      label: 'Tags',
      slugField: 'name',
      path: 'src/content/tags/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Tag Name',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief description of what this tag covers',
          multiline: true,
        }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Page Title',
            description: 'The title of the page',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief summary for SEO (150-160 characters ideal)',
          validation: { isRequired: true },
          multiline: true,
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          description: 'Optional banner image for the page',
          directory: 'public/images/pages',
          publicPath: '/images/pages/',
        }),
        heroImageAlt: fields.text({
          label: 'Hero Image Alt Text',
          description: 'Describe the image for accessibility',
        }),
        isHomepage: fields.checkbox({
          label: 'Set as Homepage',
          description: 'Use this page as the site homepage (only one page should have this enabled)',
          defaultValue: false,
        }),
        showInNav: fields.checkbox({
          label: 'Show in Navigation',
          description: 'Display this page in the main navigation menu',
          defaultValue: false,
        }),
        navOrder: fields.integer({
          label: 'Navigation Order',
          description: 'Order in navigation (lower numbers appear first)',
          defaultValue: 100,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft pages are not published',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          description: 'The main content of the page',
        }),
      },
    }),
  },
});
