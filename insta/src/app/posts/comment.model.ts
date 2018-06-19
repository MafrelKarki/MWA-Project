export interface Comment {
    userId: string;
    userFullName: string;
    comment: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}