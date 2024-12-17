export interface Task {
    title: string;
    body: string;
    priority: 'low' | 'medium' | 'high';
    status: string;
    estimatedTime: string; 
    timeUnit: 'M' | 'H';
    timeSpent: number;
    date?: Date,
    timeStart?: number;
    anteMeridiem?: 'AM' | 'PM';
}

export interface TaskWithOriginalIndex extends Task {
    originalIndex: number,
}
