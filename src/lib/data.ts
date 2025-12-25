import type { Category, Product } from '@/lib/types';
import { placeholderImages } from './placeholder-images';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', image: placeholderImages.electronicsCategory.imageUrl },
  { id: 'collectibles', name: 'Collectibles & Art', image: placeholderImages.collectiblesCategory.imageUrl },
  { id: 'fashion', name: 'Fashion', image: placeholderImages.fashionCategory.imageUrl },
  { id: 'home-garden', name: 'Home & Garden', image: placeholderImages.homeCategory.imageUrl },
  { id: 'vehicles', name: 'Vehicles', image: placeholderImages.vehiclesCategory.imageUrl },
  { id: 'other', name: 'Other', image: placeholderImages.otherCategory.imageUrl },
];

export const products: Product[] = [
  {
    id: 'vintage-camera-1',
    name: 'Vintage Leica M3 Camera',
    description: 'A classic 1955 Leica M3 rangefinder camera in excellent working condition. A true collector\'s item.',
    category: 'electronics',
    startBid: 500,
    currentBid: 750,
    bidHistory: [
      { user: 'PhotoFan', amount: 600, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { user: 'Collector', amount: 750, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    images: [placeholderImages.productVintageCamera1.imageUrl, placeholderImages.productVintageCamera2.imageUrl, placeholderImages.productVintageCamera3.imageUrl],
    value: 1200,
  },
  {
    id: 'abstract-painting-2',
    name: 'Original Abstract Painting "Cosmos"',
    description: 'A vibrant, large-scale abstract painting by a renowned contemporary artist. Mixed media on canvas.',
    category: 'collectibles',
    startBid: 1200,
    currentBid: 1500,
    bidHistory: [
        { user: 'ArtLover', amount: 1500, timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days
    images: [placeholderImages.productAbstractPainting1.imageUrl],
    value: 2500,
  },
  {
    id: 'designer-handbag-3',
    name: 'Luxury Designer Handbag',
    description: 'A limited edition leather handbag from a top fashion house. Never used, with original packaging.',
    category: 'fashion',
    startBid: 800,
    currentBid: 800,
    bidHistory: [],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
    images: [placeholderImages.productDesignerHandbag1.imageUrl],
    value: 1500,
  },
  {
    id: 'smart-watch-4',
    name: 'Latest Gen Smart Watch',
    description: 'Brand new, sealed smart watch with all the latest features including health tracking and GPS.',
    category: 'electronics',
    startBid: 250,
    currentBid: 310,
    bidHistory: [
      { user: 'Techie', amount: 280, timestamp: new Date(Date.now() - 1000 * 60 * 20) },
      { user: 'GadgetGuy', amount: 310, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    images: [placeholderImages.productSmartWatch1.imageUrl],
    value: 400,
  },
  {
    id: 'classic-car-5',
    name: '1967 Classic Muscle Car',
    description: 'A fully restored classic muscle car. A beautiful piece of automotive history with a powerful V8 engine.',
    category: 'vehicles',
    startBid: 25000,
    currentBid: 28500,
    bidHistory: [
        { user: 'CarEnthusiast', amount: 26000, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { user: 'SpeedRacer', amount: 28500, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days
    images: [placeholderImages.productClassicCar1.imageUrl],
    value: 45000,
  }
];
