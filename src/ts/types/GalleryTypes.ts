export interface IGalleryData {
    id: number;
    description: string;
    file: string;
    title: string;
    type: GalleryItemType[];
}

export enum GalleryItemType {
    All = 'all',
    Design = 'design',
    Web = 'webdesign',
    Paint = 'painting',
    Photo = 'photography',
    Deco = 'decoration'
}