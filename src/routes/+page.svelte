<script lang="ts">
	import DataTable from '$lib/DataTable.svelte';
	import type { Timesheet } from '$lib/timesheetParser';
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
</script>

<div class="stack">
	<h1>Timehseet Geneerator</h1>

	<ParseTimeheet on:parsed={handleParsed} />


	{#if timehseet}
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
