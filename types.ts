export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface ProgramData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice: string;
  features: string[];
  painPoints: { title: string; description: string }[];
  curriculum: { title: string; desc: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  heroImage: string;
  isAvailable: boolean;
}