export interface Timesheet {
    year: number;
    month: number;
    timeEntries: TimeEntry[];
}

export interface TimeEntry {
    date: string;
    startTime: string;
    endTime: string;
    totalTime: number;
    workItems: string[];
}