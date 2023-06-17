<script lang="ts">
	import Enumerable from 'linq'

	type T = $$Generic
	type TKey = keyof T
	type TRender = 'string' | 'link' | 'number' | 'image' | 'boolean' | 'lines'
	type TColumn = {
		/***
		 * property to display in the table cell
		 */
		value: TKey
		/***
		 * property to use as link href
		 */
		href?: TKey
		heading: string
		type?: TRender
	}

	export let data: T[] = []

	export let columns: TColumn[] = []

	export let showHeadings = true

	// sorting
	let sortKey: TKey
	let sortASC = true

	$: sortedData = sortASC
		? Enumerable.from(data)
				.orderBy((x: T) => x[sortKey])
				.toArray()
		: Enumerable.from(data)
				.orderByDescending((x: T) => x[sortKey])
				.toArray()

	function sort(key: TKey) {
		if (sortKey === key) {
			sortASC = !sortASC
		} else {
			sortKey = key
			sortASC = true
		}
	}

	export let style = ''
</script>

<table {style}>
	{#if showHeadings}
		<thead>
			<tr>
				{#each columns as column}
					<th on:click={() => sort(column.value)}>
						{column.heading}
					</th>
				{/each}
			</tr>
		</thead>
	{/if}
	<tbody>
		{#each sortedData as entry}
			<tr>
				{#each columns as column}
					{@const value = entry[column.value]}
					{@const href = column.href ? entry[column.href] : ''}
					{@const lines = value.split('\n')}

					<td class:number={column.type === 'number'}>
						{#if !column.type || column.type === 'string'}
							{value}
						{:else if column.type === 'number'}
							{value}
						{:else if column.type === 'link'}
							<a {href}>{value}</a>
						{:else if column.type === 'boolean'}
							{value ? 'Yes' : 'No'}
						{:else if column.type === 'lines'}
							{#each lines as line}
								<div>{line}</div>
							{/each}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		background: var(--color-background-alt);
		box-shadow: var(--elevation-1);
	}

	tr {
		border-bottom: var(--line);
	}

	th {
		cursor: pointer;
		background: var(--color-background-alt2);
	}

	th,
	td {
		text-align: left;
		padding: var(--space-inset-squish-m);
	}

	.number {
		text-align: right;
	}
</style>
