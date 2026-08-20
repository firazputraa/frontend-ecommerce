import type { Product } from '../types/product'

export const mockProducts: Product[] = [
  {
    id: 1,
    slug: 'essential-oversized-tshirt',
    name: 'Essential Oversized T-Shirt',
    description:
      'Premium oversized cotton t-shirt designed for everyday comfort.',
    basePrice: 349000,
    weightGrams: 250,

    category: {
      id: 1,
      name: 'T-Shirts',
      slug: 't-shirts',
    },

    brand: {
      id: 1,
      name: 'AUVENO',
      slug: 'auveno',
    },

    images: [
      {
        id: 1,
        url: '/images/products/essential-tee-black-front.jpg',
        alt: 'Essential Oversized T-Shirt Black Front',
        isPrimary: true,
        sortOrder: 1,
      },
      {
        id: 2,
        url: '/images/products/essential-tee-black-back.jpg',
        alt: 'Essential Oversized T-Shirt Black Back',
        isPrimary: false,
        sortOrder: 2,
      },
    ],

    variants: [
      {
        id: 1,
        sku: 'AUV-TEE-BLK-S',
        size: 'S',
        color: 'Black',
        colorHex: '#000000',
        price: 349000,
        stock: 10,
      },
      {
        id: 2,
        sku: 'AUV-TEE-BLK-M',
        size: 'M',
        color: 'Black',
        colorHex: '#000000',
        price: 349000,
        stock: 15,
      },
      {
        id: 3,
        sku: 'AUV-TEE-BLK-L',
        size: 'L',
        color: 'Black',
        colorHex: '#000000',
        price: 349000,
        stock: 5,
      },
      {
        id: 4,
        sku: 'AUV-TEE-WHT-M',
        size: 'M',
        color: 'White',
        colorHex: '#FFFFFF',
        price: 349000,
        stock: 8,
      },
    ],
  },

  {
    id: 2,
    slug: 'classic-boxy-hoodie',
    name: 'Classic Boxy Hoodie',
    description:
      'Heavyweight boxy hoodie with a clean silhouette and relaxed fit.',
    basePrice: 699000,
    weightGrams: 650,

    category: {
      id: 2,
      name: 'Hoodies',
      slug: 'hoodies',
    },

    brand: {
      id: 1,
      name: 'AUVENO',
      slug: 'auveno',
    },

    images: [
      {
        id: 3,
        url: '/images/products/boxy-hoodie-grey-front.jpg',
        alt: 'Classic Boxy Hoodie Grey Front',
        isPrimary: true,
        sortOrder: 1,
      },
    ],

    variants: [
      {
        id: 5,
        sku: 'AUV-HOOD-GRY-M',
        size: 'M',
        color: 'Grey',
        colorHex: '#808080',
        price: 699000,
        stock: 8,
      },
      {
        id: 6,
        sku: 'AUV-HOOD-GRY-L',
        size: 'L',
        color: 'Grey',
        colorHex: '#808080',
        price: 699000,
        stock: 6,
      },
      {
        id: 7,
        sku: 'AUV-HOOD-GRY-XL',
        size: 'XL',
        color: 'Grey',
        colorHex: '#808080',
        price: 699000,
        stock: 0,
      },
    ],
  },

  {
    id: 3,
    slug: 'utility-cargo-pants',
    name: 'Utility Cargo Pants',
    description:
      'Relaxed utility cargo pants featuring functional pockets and adjustable details.',
    basePrice: 579000,
    weightGrams: 500,

    category: {
      id: 3,
      name: 'Pants',
      slug: 'pants',
    },

    brand: {
      id: 1,
      name: 'AUVENO',
      slug: 'auveno',
    },

    images: [
      {
        id: 4,
        url: '/images/products/utility-cargo-black-front.jpg',
        alt: 'Utility Cargo Pants Black Front',
        isPrimary: true,
        sortOrder: 1,
      },
    ],

    variants: [
      {
        id: 8,
        sku: 'AUV-CARGO-BLK-M',
        size: 'M',
        color: 'Black',
        colorHex: '#000000',
        price: 579000,
        stock: 12,
      },
      {
        id: 9,
        sku: 'AUV-CARGO-BLK-L',
        size: 'L',
        color: 'Black',
        colorHex: '#000000',
        price: 579000,
        stock: 7,
      },
    ],
  },
]