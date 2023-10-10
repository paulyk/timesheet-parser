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

export function parseTimesheetEntries(rawString: string): Timesheet {
    const lines = rawString.split('\n').filter(line => line.trim().length > 0);
    const timeEntries = extractTimeEntries(lines);

    const firstDate = extractFirstDate(lines);
    const year = extractYear(firstDate);
    const month = extractMonth(firstDate);

    return {
        year,
        month,
        timeEntries
    };
}

function extractTimeEntries(lines: string[]): TimeEntry[] {
    const entries: TimeEntry[] = [];
    let currentDate = '';
    let currentWorkItems: string[] = [];
    let time = '';

    for (const line of lines) {
        const dateMatch = line.match(/^[# ]+(\d{4}-\d{2}-\d{2})\s+\((\d+(.\d+)?)\s+(hr|hours)/);
        if (dateMatch) {
            if (currentDate && time && currentWorkItems.length > 0) {
                entries.push(createTimeEntry(currentDate, time, currentWorkItems));
            }
            currentDate = dateMatch[1];
            time = toHHMM(parseFloat(dateMatch[2]));
            currentWorkItems = [];
        } else {
            const workItemMatch = line.match(/^\s*\*\s*(.+)$/);
            if (workItemMatch) {
                currentWorkItems.push(workItemMatch[1]);
            }
        }
    }
    if (currentDate && time && currentWorkItems.length > 0) {
        entries.push(createTimeEntry(currentDate, time, currentWorkItems));
    }
    return entries;
}

function createTimeEntry(date: string, time: string, workItems: string[]): TimeEntry {
    const totalTime = parseTime(time);
    const endTime = toHHMM(parseTime('10:00') + totalTime);
    
    return {
        date,
        startTime: '10:00',
        endTime: endTime,
        totalTime,
        workItems
    };
}

function parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
}

function toHHMM(time: number): string {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function extractFirstDate(lines: string[]): string {
    return lines.find(line => line.match(/^[# ]+(\d{4}-\d{2}-\d{2})\s+\((\d+(.\d+)?)\s+(hr|hours)/)) || '';
}

function extractYear(date: string): number {
    const match = date.match(/^\s*#+\s*(\d{4})/);
    return match ? parseInt(match[1]) : 0;
}

function extractMonth(date: string): number {
    const match = date.match(/^\s*#+\s*\d{4}-(\d{2})/);
    return match ? parseInt(match[1]) : 0;
}
