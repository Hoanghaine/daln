export interface ITag {
    id: number;
    tagName: string;
}

export interface ITagsResponse {
    data: {
        elements: ITag[];
        totalPages: number;
        totalElements: number;
    };
    message: string | null;
}