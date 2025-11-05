import { groq } from 'next-sanity'

// Get all products
export const allProductsQuery = groq`
  *[_type == "product"] | order(createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    stock,
    category->{
      _id,
      name,
      slug
    },
    badges,
    featured,
    createdAt
  }
`

// Get featured products
export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(createdAt desc) [0...8] {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    stock,
    category->{
      _id,
      name,
      slug
    },
    badges,
    createdAt
  }
`

// Get single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    stock,
    category->{
      _id,
      name,
      slug,
      description
    },
    badges,
    featured,
    createdAt
  }
`

// Get all categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image
  }
`

// Get products by category
export const productsByCategoryQuery = groq`
  *[_type == "product" && category._ref == $categoryId] | order(createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    stock,
    category->{
      _id,
      name,
      slug
    },
    badges,
    createdAt
  }
`
