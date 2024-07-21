export interface Task {
    id?: string;
    name: string;
    description: string;
    createdAt?: string;
    columnId: string;
    order: number;
    subTasks: SubTask[];
}

export interface SubTask {
    name: string;
    isDone: boolean;
}