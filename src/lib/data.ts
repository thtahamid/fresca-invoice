import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Sweet Corn', category: 'Vegetables', packagingType: 'Loose / Bulk' },
  { id: '2', name: 'Red Onions', category: 'Vegetables', packagingType: 'Loose / Bulk' },
  { id: '3', name: 'Long Purple Eggplants', category: 'Vegetables', packagingType: 'Plastic Wrapped' },
  { id: '4', name: 'Romaine Lettuce / Green Leaves', category: 'Vegetables', packagingType: 'Loose / Bunched' },
  { id: '5', name: 'Long Beans (Snake Beans)', category: 'Vegetables', packagingType: 'Bunched with Rubber Band' },
  { id: '6', name: 'White Button Mushrooms', category: 'Vegetables', packagingType: 'Packaged Trays' },
  { id: '7', name: 'Shelled Beans / Peanuts', category: 'Vegetables/Legumes', packagingType: 'Individual Plastic Bags' },
  { id: '8', name: 'Butternut Squash', category: 'Vegetables', packagingType: 'Loose / Bulk' },
  { id: '9', name: 'Durian (Boxed)', category: 'Fruits', packagingType: 'Cardboard Box' },
  { id: '10', name: 'Fresh Tofu / Beancurd Sheets', category: 'Tofu & Soy', packagingType: 'Sealed Plastic Packs (Green Label)' },
  { id: '11', name: 'Pressed / Smoked Tofu', category: 'Tofu & Soy', packagingType: 'Sealed Plastic Packs (Orange Label)' },
  { id: '12', name: 'King Oyster Mushrooms', category: 'Vegetables', packagingType: 'Blue & White Plastic Bags' },
];

export const COMPANY_DEFAULT = {
  name: 'Fresca Grocers Ltd.',
  address: '123 Market St, Fresh Valley, FV 56789',
  phone: '+1 (555) 012-3456',
  email: 'hello@frescagrocers.com',
};
