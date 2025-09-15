export interface NoteResponse {
    id: number;
    content: string;
    createdAt: string;
    complaintId: number;
    authorId: number;
}

export interface NoteCreate {
    content: string;
    complaintId: number;
    authorId: number;
}
