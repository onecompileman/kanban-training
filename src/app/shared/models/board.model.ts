export interface Board {
    id?: string;
    name: string;
    color: string;
    createdBy: string;
    createdAt?: string;
    sharedToUserIds: string[];
}