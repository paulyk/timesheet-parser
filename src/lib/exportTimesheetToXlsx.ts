import * as XLSX from 'xlsx';
import type { Timesheet } from './types';


export function exportTimeSheetToXlsx(timesheet: Timesheet, filename: string) {
    const wb = XLSX.utils.book_new();

    const wsData: any[][] = [];
    wsData.push(['Month', timesheet.month]);
    wsData.push(['Year', timesheet.year]);
    wsData.push([]); // Empty row for separation
    wsData.push(['Date', 'Start', 'End', 'Hours', 'Description']);

    let totalHours = 0;

    for (const entry of timesheet.timeEntries) {
        const description = entry.workItems.join('\n');
        wsData.push([entry.date, entry.startTime, entry.endTime, entry.totalTime, description]);
        totalHours += entry.totalTime;
    }

    wsData.push([]); // Empty row for separation
    wsData.push(['Total Hours', totalHours]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');

    // Trigger download in the browser
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    saveAs(blob, filename);
}

// Helper function to convert string to ArrayBuffer
function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

// Helper function to trigger download
function saveAs(blob: Blob, filename: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
}
