import { Movie, Villain, Product, NFTItem } from './types';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Spider-Man",
    year: 2002,
    era: "Maguire",
    rating: "PG-13",
    synopsis: "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
    boxOffice: "$825M",
    image: "https://picsum.photos/300/450?random=1"
  },
  {
    id: 2,
    title: "The Amazing Spider-Man",
    year: 2012,
    era: "Garfield",
    rating: "PG-13",
    synopsis: "After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe.",
    boxOffice: "$757M",
    image: "https://picsum.photos/300/450?random=2"
  },
  {
    id: 3,
    title: "Spider-Man: Homecoming",
    year: 2017,
    era: "Holland",
    rating: "PG-13",
    synopsis: "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
    boxOffice: "$880M",
    image: "https://picsum.photos/300/450?random=3"
  },
  {
    id: 4,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    era: "Animated",
    rating: "PG",
    synopsis: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    boxOffice: "$384M",
    image: "https://picsum.photos/300/450?random=4"
  }
];

export const VILLAINS: Villain[] = [
  {
    id: 1,
    name: "Green Goblin",
    alias: "Norman Osborn",
    description: "A brilliant scientist and CEO of Oscorp who was driven insane by an experimental performance-enhancing formula.",
    powers: ["Super strength", "Regenerative healing", "Glider flight", "Pumpkin bombs"],
    image: "https://picsum.photos/400/400?random=5",
    dangerLevel: 10
  },
  {
    id: 2,
    name: "Doctor Octopus",
    alias: "Otto Octavius",
    description: "A highly intelligent mad scientist with four mechanical appendages fused to his body.",
    powers: ["Genius intellect", "Mechanical arms", "Telepathic control of arms"],
    image: "https://picsum.photos/400/400?random=6",
    dangerLevel: 9
  },
  {
    id: 3,
    name: "Venom",
    alias: "Eddie Brock / Symbiote",
    description: "A sentient alien symbiote with an amorphous, liquid-like form, who survives by bonding with a host.",
    powers: ["Shape-shifting", "Web generation", "Undetectable by Spider-Sense"],
    image: "https://picsum.photos/400/400?random=7",
    dangerLevel: 9
  }
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Web Shooter Replica", price: 149.99, category: "Collectibles", image: "https://picsum.photos/300/300?random=8", rating: 4.8 },
  { id: 2, name: "Classic Spidey Hoodie", price: 59.99, category: "Apparel", image: "https://picsum.photos/300/300?random=9", rating: 4.5 },
  { id: 3, name: "Amazing Fantasy #15 Facsimile", price: 3.99, category: "Comics", image: "https://picsum.photos/300/300?random=10", rating: 5.0 },
  { id: 4, name: "Miles Morales Action Figure", price: 29.99, category: "Collectibles", image: "https://picsum.photos/300/300?random=11", rating: 4.7 },
];

export const NFTS: NFTItem[] = [
  { id: "nft1", title: "Symbiote Takeover #001", rarity: "Legendary", priceEth: 4.5, creator: "StanL", image: "https://picsum.photos/300/300?random=12" },
  { id: "nft2", title: "Web Swing Animation", rarity: "Unique", priceEth: 12.0, creator: "DitkoX", image: "https://picsum.photos/300/300?random=13" },
  { id: "nft3", title: "Daily Bugle Exclusive", rarity: "Common", priceEth: 0.2, creator: "JJJ", image: "https://picsum.photos/300/300?random=14" },
];