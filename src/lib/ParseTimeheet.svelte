<script lang="ts">
	import DataTable from './DataTable.svelte';
	import Flex from './Flex.svelte';
	import { parseTimesheetEntries, type TimeEntry } from './timesheetParser';

	let value = '';
	let timeEntries: TimeEntry[] = [];

	function parseTimesheet() {
		timeEntries = [];
		timeEntries = parseTimesheetEntries(value);
	}

	// sort by date ascending
	$: entrires = timeEntries.sort((a,b) => 
		// sort by date asc
		new Date(a.date).getTime() - new Date(b.date).getTime()
	).map(entry => ({
		...entry,
		workItems: entry.workItems
			.join('\n')
	}));

	export const reset = () => {
		value = '';
		timeEntries = [];
	}
</script>

<textarea bind:value />
<Flex  alignItems="center"> 
<button on:click={parseTimesheet}>Parse Timesheet Data</button>
<button on:click={reset}>Reset</button>
</Flex>
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
