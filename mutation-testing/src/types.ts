export interface Comment {
    id: number;
    content: string;
    parent_id: number | null;
    created_at: Date;
}

export interface CreateCommentDto {
    content: string;
    parent_id?: number | null;
}
