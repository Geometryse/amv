<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ScrollHandler from './ScrollHandler.svelte';
	interface WordLyric {
		lyric: string;
	}
	let currentLyric = -1;
	let intervalId: number;
	let scrollingDisabled = false;
	const lyrics: WordLyric[] = [
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Pull up if you really with it' },
		{ lyric: 'Pull up if you really with it' },
		{ lyric: 'Pull up if you really with the shits' },
		{ lyric: 'Pull up if you really with the shits' },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Pull up if you really with it' },
		{ lyric: 'Pull up if you really with it' },
		{ lyric: 'Pull up if you really with the shits' },
		{ lyric: 'Pull up if you really with the shits' },
		{ lyric: 'Uzi, Uzi' },
		{ lyric: 'Wake up' },
		{ lyric: 'Uzi, not again' },
		{ lyric: "You're never gonna change" },
		{ lyric: 'Yeah' },
		{ lyric: 'First of all, I fuck eight bitches a day' },
		{ lyric: 'How could you ever say Lil Uzi gay?' }
	];
	let container: HTMLDivElement;
	function disableScrolling() {
		console.log('SCROLLING OFF.');
		scrollingDisabled = true;
	}
	onMount(() => {
		// intervalId = setInterval(() => {
		// 	currentLyric = currentLyric + 1;
		// 	if (currentLyric > lyrics.length) clearInterval(intervalId);
		// 	else scrollToLyric(currentLyric - 1);
		// }, 1000);
		// if (window) window.addEventListener('scroll', disableScrolling);
	});

	onDestroy(() => {
		clearInterval(intervalId);
		// if (window) window.removeEventListener('scroll', disableScrolling);
	});

	function scrollToLyric(id: number) {
		const lastElement = document.getElementById(`lyric-${id - 1}`);
		const element = document.getElementById(`lyric-${id}`);
		if (!element || !lastElement || scrollingDisabled) return;

		const offsetTop = lastElement.offsetHeight; // 200px offset from the top
		// console.log(offsetTop);
		container.scrollBy({ top: offsetTop, behavior: 'smooth' });
	}
</script>

<div class="flex flex-grow flex-col w-full text-6xl py-5 px-20" bind:this={container}>
	<ScrollHandler>
		<!-- <p class=""> -->
		{#each lyrics as { lyric }, index}
			<h1 id={`lyric-${index}`} class="py-3 {currentLyric === index ? 'active' : ''}">{lyric}</h1>
		{/each}</ScrollHandler
	>
	<!-- </p> -->
</div>

<style>
	.active {
		color: yellow;
	}
</style>
