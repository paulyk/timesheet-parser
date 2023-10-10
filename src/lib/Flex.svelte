<script context="module" lang="ts">
    export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
    export type AlignItems = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
</script>

<script lang="ts">
    
    export let justifyContent: JustifyContent = 'flex-start';
    export let alignItems: AlignItems = 'stretch';
    export let gap = '1rem'
    let style = `justify-content: ${justifyContent};align-items: ${alignItems}; gap: ${gap}`;
</script>

<div class="flex" {style}>
    <slot />
</div>

<style>
    .flex {
        display: flex;
    }
</style>