// Sanity schema for a rentable property.
// Copy this into your Sanity Studio `schemas` folder when you set up the CMS.
// Each translatable field is an object with en / nl / ar strings so content
// can be localized the same way the front-end expects.

const localizedString = (title: string, rows?: number) => ({
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: rows ? 'text' : 'string', rows },
    { name: 'nl', title: 'Nederlands', type: rows ? 'text' : 'string', rows },
    { name: 'ar', title: 'العربية', type: rows ? 'text' : 'string', rows },
  ],
})

export const property = {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { ...localizedString('Title'), name: 'title' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    { ...localizedString('Description', 6), name: 'description' },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'House', value: 'house' },
          { title: 'Studio', value: 'studio' },
          { title: 'Villa', value: 'villa' },
        ],
        layout: 'radio',
      },
    },
    { name: 'price', title: 'Price (per month)', type: 'number' },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'EUR',
    },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
    { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
    { name: 'area', title: 'Area (m²)', type: 'number' },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'availableFrom', title: 'Available from', type: 'date' },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'city', media: 'images.0' },
  },
}

export default property
