export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';

export interface GeneratedImage {
  url: string;
  prompt: string;
  ratio: AspectRatio;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
}
