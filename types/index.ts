export interface ContentItem {
  id: string;
  title?: string;
  posterUrl: any;
  type: 'movie' | 'show';
  isFavorited?: boolean;
  genre: 'Action' | 'Thriller' | 'Romance' | 'Sci-Fi' | 'ChildrenAndFamily' | 'Anime' | 'Comedy' | 'Horror';
  font: string;
}

export interface ListConfig {
  id: string;
  title: string;
  type: 'category' | 'custom';
  items: ContentItem[];
  order: number;
  visibleOnHome: boolean;
  font: string;
}