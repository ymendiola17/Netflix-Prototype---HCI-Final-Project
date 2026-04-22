export interface ContentItem {
    id: string;
    title: string;
    posterUrl: any; // Adjust type as needed, e.g., string or ImageSourcePropType
    type: 'movie' | 'show';
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