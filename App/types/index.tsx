export interface ContentItem {
    id: string;
    title: string;
    posterUrl: string;
    type: 'movie' | 'show';
}

export interface ListConfig {
    id: string;
    title: string;
    type: 'category' | 'custom';
    items: ContentItem[];
    order: number;
}