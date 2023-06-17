<script lang="ts">
	import DataTable from './DataTable.svelte';
	import { parseTimesheetEntries, type TimeEntry } from './timesheetParser';

	let value = '';
	let timeEntries: TimeEntry[] = [];

	function parseTimesheet() {
		debugger;
		timeEntries = [];
		timeEntries = parseTimesheetEntries(value);
	}

	$: entrires = timeEntries.map(entry => ({
		...entry,
		workItems: entry.workItems.join('\n')
	}));
</script>

<textarea bind:value />
<button on:click={parseTimesheet}>Parse Timesheet Data</button>
{#if timeEntries.length > 0}
	<DataTable
		data={entrires}
		columns={[
			{
				value: 'date',
				heading: 'Date',
				type: 'string'
			},
			{
				value: 'startTime',
				heading: 'Start'
			},
			{
				value: 'endTime',
				heading: 'End'
			},
			{
				value: 'totalTime',
				heading: 'Hours',
			},
			{
				value: 'workItems',
				type: 'lines',
				heading: 'Description'
			}
		]}
	/>
{/if}

<style>
	textarea {
		width: 100%;
		height: 300px;
	}
	/* pre {
		border: 1px solid #666;
		padding: 1rem;
		margin: 0;
	} */
</style>
