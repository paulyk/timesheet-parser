type TimeEntry = {
    date: string;
    start: string;
    end: string;
    description: string[];
};

export function parseTimeSheet(data: string): TimeEntry[] {
    const entries: TimeEntry[] = [];
    const datePattern = /##\s+(\d{4}-\d{2}-\d{2})\s+\((\d+)\s+hours\)/g;
    const descriptionPattern = /\*\s+(.+)/g;

    let match: RegExpExecArray | null;

    while ((match = datePattern.exec(data)) !== null) {
        const date = match[1];
        const hours = parseInt(match[2], 10);
        const start = "10:00"; // Assuming a fixed start time
        const end = addHours(start, hours);

        const endIndex = datePattern.lastIndex;
        const nextDateMatch = datePattern.exec(data);
        const sliceEnd = nextDateMatch ? nextDateMatch.index : undefined;
        const descriptions = [];

        const descriptionSlice = data.slice(endIndex, sliceEnd);
        let descriptionMatch: RegExpExecArray | null;
        while ((descriptionMatch = descriptionPattern.exec(descriptionSlice)) !== null) {
            descriptions.push(descriptionMatch[1]);
        }

        entries.push({
            date,
            start,
            end,
            description: descriptions.filter(desc => desc.trim() !== ""),
        });
    }

    return entries;
}

function addHours(time: string, hoursToAdd: number): string {
    const [hours, minutes] = time.split(":").map(Number);
    const newHours = hours + hoursToAdd;
    return `${newHours}:${minutes}`;
}

// Test
const timeSheetData = `
## 2023-09-30 (6 hours)
* skd-server refactor: rename projects and namespaces for DDD migration
* skd-client: update PCV Detail to group kits by lot.

## 2023-09-29 (6 hours)
* skd-server service to determine parts added / removed from between two lots of the same PCV.

## 2023-09-28 (7 hours)
* prep for refactor of skd-server to DDD
* Meeting: need for a way to detect part diff when new lots arrive.
`;

console.log(parseTimeSheet(timeSheetData));
