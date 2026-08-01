export interface LoveLetter {
  sender: string;
  paragraphs: string[];
}

export interface GalleryItem {
  type: "image" | "video";
  url: string;
  caption: string;
}

export interface ReasonItem {
  title: string;
  description: string;
  emoji: string;
}

export interface LoveCounter {
  stages: number[];
  message: string;
}

export interface RelationshipStat {
  label: string;
  value: number;
  icon: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  wrongResponse: string;
  correctResponse: string;
}

export interface ScrapbookPage {
  image: string;
  title: string;
  date: string;
  caption: string;
  sticker: string;
}

export interface FutureDream {
  title: string;
  description: string;
}

export interface CountdownConfig {
  targetDate: string;
  label: string;
}

export interface ProposalConfig {
  title: string;
  yesResponse: string;
  noResponses: string[];
  noTinyText: string;
}

export interface FinaleConfig {
  celebrationSoundUrl: string;
  message: string;
}

export interface AppConfig {
  girlfriendName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  loveLetter: LoveLetter;
  gallery: GalleryItem[];
  reasons: ReasonItem[];
  loveCounter: LoveCounter;
  relationshipStats: RelationshipStat[];
  floatingMemories: string[];
  musicUrl: string;
  quiz: QuizQuestion[];
  scrapbook: ScrapbookPage[];
  futureDreams: FutureDream[];
  secretMessages: string[];
  countdown: CountdownConfig;
  promises: string[];
  proposal: ProposalConfig;
  finale: FinaleConfig;
}
