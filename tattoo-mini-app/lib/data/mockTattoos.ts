import type { TattooTag, TagCategory } from '@/lib/types/tattoo';

export interface Tattoo {
  id: string;
  title: string;
  owner: string;
  ownerAddress: string;
  imageUrl: string;
  story: string;
  mintedDate: string;
  isSoulBound: boolean;
  tags: TattooTag[];
}

export const mockTattoos: Tattoo[] = [
  {
    id: "1",
    title: "Phoenix Rising",
    owner: "Alex Chen",
    ownerAddress: "0x1234...5678",
    imageUrl: "/assets/tattoo-1.jpg",
    story: "This phoenix represents my journey of overcoming personal struggles and rising from the ashes stronger than before. After a difficult period in my life, I got this tattoo as a permanent reminder that no matter how hard things get, I have the strength to rebuild and transform myself. The detailed linework symbolizes the complexity of transformation, while the upward motion represents constant growth and evolution.",
    mintedDate: "2024-01-15",
    isSoulBound: true,
    tags: [
      { id: '1-1', label: 'Realism', category: 'style' as TagCategory },
      { id: '1-2', label: 'Animal', category: 'theme' as TagCategory },
      { id: '1-3', label: 'Back', category: 'body_part' as TagCategory },
      { id: '1-4', label: 'Colorful', category: 'color' as TagCategory },
      { id: '1-5', label: 'Large', category: 'size' as TagCategory },
      { id: '1-6', label: 'Resilience', category: 'meaning' as TagCategory },
      { id: '1-7', label: 'Strength', category: 'meaning' as TagCategory },
    ],
  },
  {
    id: "2",
    title: "Sacred Geometry",
    owner: "Maya Patel",
    ownerAddress: "0xabcd...efgh",
    imageUrl: "/assets/tattoo-2.jpg",
    story: "A mandala representing the interconnectedness of all things and the pursuit of balance in life. Each geometric pattern holds meaning - the circles represent unity and wholeness, the triangles symbolize strength and progression, and the intricate details mirror the complexity of existence. This tattoo serves as my meditation focus and reminds me to seek harmony in chaos.",
    mintedDate: "2024-02-20",
    isSoulBound: true,
    tags: [
      { id: '2-1', label: 'Geometric', category: 'style' as TagCategory },
      { id: '2-2', label: 'Spiritual', category: 'theme' as TagCategory },
      { id: '2-3', label: 'Forearm', category: 'body_part' as TagCategory },
      { id: '2-4', label: 'Blackwork', category: 'color' as TagCategory },
      { id: '2-5', label: 'Medium', category: 'size' as TagCategory },
      { id: '2-6', label: 'Balance', category: 'meaning' as TagCategory },
    ],
  },
  {
    id: "3",
    title: "Dragon Spirit",
    owner: "Kenji Tanaka",
    ownerAddress: "0x9876...4321",
    imageUrl: "/assets/tattoo-3.jpg",
    story: "Traditional Japanese dragon sleeve honoring my grandfather's heritage and wisdom passed down through generations. In Japanese culture, dragons represent wisdom, strength, and good fortune. This irezumi-style piece took multiple sessions and incorporates traditional colors - red for passion and courage, black for mystery and protection. Each scale was carefully placed to flow with the natural contours of my arm, creating a living piece of art that moves with me.",
    mintedDate: "2024-03-10",
    isSoulBound: true,
    tags: [
      { id: '3-1', label: 'Japanese', category: 'style' as TagCategory },
      { id: '3-2', label: 'Mythology', category: 'theme' as TagCategory },
      { id: '3-3', label: 'Arm', category: 'body_part' as TagCategory },
      { id: '3-4', label: 'Colorful', category: 'color' as TagCategory },
      { id: '3-5', label: 'Full Sleeve', category: 'size' as TagCategory },
      { id: '3-6', label: 'Family', category: 'meaning' as TagCategory },
      { id: '3-7', label: 'Strength', category: 'meaning' as TagCategory },
    ],
  },
  {
    id: "4",
    title: "Mountain Waves",
    owner: "Jordan Rivers",
    ownerAddress: "0xfedc...ba98",
    imageUrl: "/assets/tattoo-4.jpg",
    story: "Minimalist design combining my love for mountains and the ocean - representing the duality of my upbringing between the coast and the highlands. The simple lines remind me that beauty doesn't have to be complex, and that the most profound truths are often the simplest. Mountains represent stability and ambition, while the waves symbolize adaptability and the ever-changing nature of life.",
    mintedDate: "2024-01-30",
    isSoulBound: true,
    tags: [
      { id: '4-1', label: 'Minimalist', category: 'style' as TagCategory },
      { id: '4-2', label: 'Nature', category: 'theme' as TagCategory },
      { id: '4-3', label: 'Forearm', category: 'body_part' as TagCategory },
      { id: '4-4', label: 'Black & Grey', category: 'color' as TagCategory },
      { id: '4-5', label: 'Small', category: 'size' as TagCategory },
      { id: '4-6', label: 'Journey', category: 'meaning' as TagCategory },
    ],
  },
];
