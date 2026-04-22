export interface ContentItem {
    id: string;
    title: string;
    posterUrl: string;
    type: 'movie' | 'show';
    isFavorited?: boolean;
}

export interface ListConfig {
    id: string;
    title: string;
    type: 'category' | 'custom';
    items: ContentItem[];
    order: number;
    visibleOnHome: boolean;
}