<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DataTable from './DataTable.svelte';
	import Flex from './Flex.svelte';
	import { parseTimesheetEntries } from './timesheetParser';
	import type { TimeEntry, Timesheet } from './types';

	let value = '';
	let timeSheet: Timesheet = {
		year: 0,
		month: 0,
		timeEntries: []
	};

	const dispatch = createEventDispatcher();

	function parseTimesheet() {
		timeSheet = parseTimesheetEntries(value);
		dispatch('parsed', timeSheet);
	}

	export const reset = () => {
		value = '';
		timeSheet = {
			year: 0,
			month: 0,
			timeEntries: []
		};
	};

</script>

<div>
	<textarea bind:value />
	<Flex alignItems="center">
		<button on:click={parseTimesheet}>Parse Timesheet Data</button>
		<button on:click={reset}>Reset</button>
	</Flex>
</div>

<style>
	textarea {
		width: 100%;
		height: 300px;
	}
</style>
