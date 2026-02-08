export interface Movie {
  id: number;
  title: string;
  year: number;
  era: 'Maguire' | 'Garfield' | 'Holland' | 'Animated';
  rating: string;
  synopsis: string;
  boxOffice: string;
  image: string;
}

export interface Villain {
  id: number;
  name: string;
  alias: string;
  description: string;
  powers: string[];
  image: string;
  dangerLevel: number; // 1-10
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Apparel' | 'Collectibles' | 'Comics';
  image: string;
  rating: number;
}

export interface NFTItem {
  id: string;
  title: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Unique';
  priceEth: number;
  creator: string;
  image: string;
}

export interface NewsItem {
  headline: string;
  snippet: string;
  date: string;
}