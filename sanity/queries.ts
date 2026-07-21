// Fields shared by list + detail views.
const propertyFields = `
  _id,
  "slug": slug.current,
  title,
  description,
  type,
  price,
  currency,
  city,
  address,
  bedrooms,
  bathrooms,
  area,
  amenities,
  featured,
  availableFrom,
  "images": images[]{
    "url": asset->url,
    "alt": coalesce(alt, "")
  }
`

export const allPropertiesQuery = `
  *[_type == "property"] | order(featured desc, _createdAt desc) {
    ${propertyFields}
  }
`

export const propertyBySlugQuery = `
  *[_type == "property" && slug.current == $slug][0] {
    ${propertyFields}
  }
`
