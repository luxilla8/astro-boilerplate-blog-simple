import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Blog Admin',
    },
    navigation: {
      'Content': ['blog', 'pages'],
      'Taxonomy': ['categories', 'tags'],
      'People': ['authors'],
      'Settings': ['siteSettings', 'navigation'],
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
        author: fields.relationship({
          label: 'Author',
          description: 'Select the post author',
          collection: 'authors',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft posts are not published on the site',
          defaultValue: false,
        }),
        noindex: fields.checkbox({
          label: 'No Index',
          description: 'Prevent search engines from indexing this post',
          defaultValue: false,
        }),
        canonicalUrl: fields.url({
          label: 'Canonical URL',
          description: 'Override the default canonical URL (leave empty to use the post URL)',
        }),
        ogImage: fields.image({
          label: 'Social Share Image',
          description: 'Custom image for social media (1200x630px recommended). Falls back to hero image.',
          directory: 'public/images/og',
          publicPath: '/images/og/',
        }),
        content: fields.markdoc({
          label: 'Content',
          description: 'The main content of your blog post',
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Author Name',
            validation: { isRequired: true },
          },
        }),
        bio: fields.text({
          label: 'Bio',
          description: 'Short author biography',
          multiline: true,
        }),
        email: fields.text({
          label: 'Email',
        }),
        url: fields.url({
          label: 'Website',
        }),
        avatar: fields.image({
          label: 'Avatar',
          description: 'Author profile photo',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        twitter: fields.text({ label: 'Twitter' }),
        github: fields.text({ label: 'GitHub' }),
        linkedin: fields.text({ label: 'LinkedIn' }),
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
        noindex: fields.checkbox({
          label: 'No Index',
          description: 'Prevent search engines from indexing this page',
          defaultValue: false,
        }),
        canonicalUrl: fields.url({
          label: 'Canonical URL',
          description: 'Override the default canonical URL (leave empty to use the page URL)',
        }),
        ogImage: fields.image({
          label: 'Social Share Image',
          description: 'Custom image for social media (1200x630px recommended). Falls back to hero image.',
          directory: 'public/images/og',
          publicPath: '/images/og/',
        }),
        content: fields.markdoc({
          label: 'Content',
          description: 'The main content of the page',
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/site-settings',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({
          label: 'Site Name',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Tagline',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        url: fields.url({
          label: 'Site URL',
        }),
        logo: fields.text({
          label: 'Logo',
        }),
        ogImage: fields.text({
          label: 'OG Image',
        }),
        authorName: fields.text({
          label: 'Author Name',
        }),
        authorEmail: fields.text({
          label: 'Author Email',
        }),
        authorUrl: fields.url({
          label: 'Author URL',
        }),
        twitter: fields.text({
          label: 'Twitter',
        }),
        github: fields.text({
          label: 'GitHub',
        }),
        linkedin: fields.text({
          label: 'LinkedIn',
        }),
        youtube: fields.text({
          label: 'YouTube',
        }),
        instagram: fields.text({
          label: 'Instagram',
        }),
        newsletterEnabled: fields.checkbox({
          label: 'Newsletter Enabled',
          defaultValue: false,
        }),
        newsletterProvider: fields.text({
          label: 'Newsletter Provider',
        }),
        newsletterAction: fields.text({
          label: 'Newsletter Action URL',
        }),
        analyticsEnabled: fields.checkbox({
          label: 'Analytics Enabled',
          defaultValue: false,
        }),
        analyticsGoogleId: fields.text({
          label: 'Google Analytics ID',
        }),
      },
    }),
    navigation: singleton({
      label: 'Navigation',
      path: 'src/content/navigation',
      format: { data: 'yaml' },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            href: fields.text({
              label: 'URL',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Navigation Links',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
    }),
  },
});
