export interface TimeEntry {
    date: string;
    startTime: string;
    endTime: string;
    totalTime: string;
    workItems: string[];
}

export function parseTimesheetEntries(rawString: string): TimeEntry[] {
    const entries: TimeEntry[] = [];
    const lines = rawString.split('\n');

    let currentDate = '';
    let currentWorkItems: string[] = [];
    let currentTime = '';

    const parseTime = (time: string) => {
        const parts = time.split(':');
        return Number(parts[0]) + Number(parts[1]) / 60;
    };

    const toHHMM = (time: number) => {
        const hours = Math.floor(time);
        const minutes = Math.floor((time - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    for (const line of lines) {
        // Check if the line starts with a date

        const dateMatch = line.match(/^[# ]+(\d{4}-\d{2}-\d{2})\s+\((\d+(.\d+)?)\s+hr/);
        if (dateMatch) {
            // If we have a date and work items from previous lines, push them to the array
            if (currentDate && currentTime && currentWorkItems.length > 0) {
                const totalTime = parseTime(currentTime);
                const endTime = toHHMM(parseTime('10:00') + totalTime);
                entries.push({ date: currentDate, startTime: '10:00', endTime, totalTime: currentTime, workItems: currentWorkItems });
            }
            // Start a new date
            currentDate = dateMatch[1];
            currentTime = toHHMM(parseFloat(dateMatch[2]));
            currentWorkItems = [];
        } else {
            // Check if the line starts with a bullet point
            const workItemMatch = line.match(/^\s*\*\s*(.+)$/);
            if (workItemMatch) {
                currentWorkItems.push(workItemMatch[1]);
            }
        }
    }
    // Don't forget to push the last date
    if (currentDate && currentTime && currentWorkItems.length > 0) {
        const totalTime = parseTime(currentTime);
        const endTime = toHHMM(parseTime('10:00') + totalTime);
        entries.push({ date: currentDate, startTime: '10:00', endTime, totalTime: currentTime, workItems: currentWorkItems });
    }

    return entries;
}
