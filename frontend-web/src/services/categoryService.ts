import { ICategory, IApiResponse } from '../interfaces';
import { apiClient } from './apiClient';

export const MOCK_CATEGORIES: ICategory[] = [
  {
    id: 'cat_1',
    name: 'Pooja Essentials',
    slug: 'pooja-essentials',
    image: '/images/puja_samagri.jpg',
    itemCount: 820,
  },
  {
    id: 'cat_2',
    name: 'God Idols & Statues',
    slug: 'god-idols-statues',
    image: '/images/ganesha_idol.jpg',
    itemCount: 450,
  },
  {
    id: 'cat_3',
    name: 'Rudraksha & Spiritual Malas',
    slug: 'rudraksha-spiritual-malas',
    image: '/images/rudraksha_mala.jpg',
    itemCount: 140,
  },
  {
    id: 'cat_4',
    name: 'Temple & Pooja Accessories',
    slug: 'temple-pooja-accessories',
    image: '/images/temple_bg.jpg',
    itemCount: 260,
  },
  {
    id: 'cat_5',
    name: 'Incense Sticks & Dhoop',
    slug: 'incense-sticks-dhoop',
    image: '/images/incense_dhoop.jpg',
    itemCount: 280,
  },
  {
    id: 'cat_6',
    name: 'Diyas & Lamps',
    slug: 'diyas-lamps',
    image: '/images/diyas_lamps.jpg',
    itemCount: 195,
  },
  {
    id: 'cat_7',
    name: 'Spiritual Books & Scriptures',
    slug: 'spiritual-books-scriptures',
    image: '/images/books.jpg',
    itemCount: 310,
  },
  {
    id: 'cat_8',
    name: 'Yantra, Kavach & Protection',
    slug: 'yantra-kavach-protection',
    image: '/images/yantra.jpg',
    itemCount: 95,
  },
  {
    id: 'cat_9',
    name: 'Ayurvedic & Pooja Herbs',
    slug: 'ayurvedic-pooja-herbs',
    image: '/images/ayurveda.jpg',
    itemCount: 190,
  },
  {
    id: 'cat_10',
    name: 'Spiritual Gift Sets',
    slug: 'spiritual-gift-sets',
    image: '/images/return_gifts.jpg',
    itemCount: 340,
  },
];

export const categoryService = {
  getCategories: async (): Promise<IApiResponse<ICategory[]>> => {
    try {
      const response = await apiClient.get<IApiResponse<ICategory[]>>('/categories');
      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data;
      }
    } catch {
      // API fallback to mock
    }
    return {
      success: true,
      message: 'DivineKart categories loaded',
      data: MOCK_CATEGORIES,
    };
  },
};
