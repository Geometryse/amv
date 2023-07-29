<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	export let mediaElement: HTMLMediaElement;
	import data from '../../example-data.json';
	export let upperBounds: number[];

	// Each dot's height ranges from [0, 320]
	let interval: NodeJS.Timer;
	$: visible = !!mediaElement;
	$: barCount = 70;
	const heights: number[] = new Array(barCount).fill(0);
	const refreshRate = 144;
	let loop = 0;
	const calcHeights = () => {
		for (let i = 0; i < barCount; i++) {
			heights[i] = data[loop][i];
		}
		loop += 1;
	};
	$: if (visible) {
		interval = setInterval(calcHeights, 1000 / refreshRate);
	}

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

{#if visible}
	<div class="w-full mr-20 h-80 flex items-center justify-center gap-[5px]" transition:fade>
		{#each heights as dot, i (i)}
			<!-- <div class="flex flex-col"> -->
			<!-- <div class="bg-white/90 h-2" /> -->
			<!-- <div class="w-2 flex items-center"> -->
			<div class="bg-white/90 w-3 rounded-xl ease-linear" style="height: {dot}px" />
			<!-- </div> -->
			<!-- </div> -->
		{/each}
	</div>
{/if}

<style>
</style>
