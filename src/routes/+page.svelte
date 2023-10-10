<script lang="ts">
	import DataTable from '$lib/DataTable.svelte';
	import { exportTimeSheetToXlsx } from '$lib/exportTimesheetToXlsx';
	import type { Timesheet } from '$lib/types';
	
	import ParseTimeheet from '../lib/ParseTimeheet.svelte';

	let timehseet: Timesheet;

	function handleParsed(e: CustomEvent<Timesheet>) {
		timehseet = e.detail;
	}

	$: entries = timehseet?.timeEntries.map((entry) => {
		return {
			...entry
		};
	});

	function handleExport() {
		exportTimeSheetToXlsx(timehseet, `timesheet_${timehseet.year}_${timehseet.month}.xlsx`)
	}
</script>

<div class="stack">
	<h1>Timehseet Geneerator</h1>

	<ParseTimeheet on:parsed={handleParsed} />


	{#if timehseet}
		<button on:click={handleExport}>Export</button>
		<DataTable
			data={entries}
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
					heading: 'Hours'
				},
				{
					value: 'workItems',
					type: 'array',
					heading: 'Description'
				}
			]}
		/>
	{/if}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.stack > * {
		width: 100%;
		border: 1px solid blue;
	}
</style>
