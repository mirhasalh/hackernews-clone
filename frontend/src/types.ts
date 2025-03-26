export interface Post {
    id: number;
    title: string;
    url?: string;
    text?: string;
    score: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    username: string;
}