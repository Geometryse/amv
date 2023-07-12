<script lang="ts">
	import { onMount } from 'svelte';

	let isLyricsScrolling = false;
	let lastScrollTop = 0;
	let div: HTMLDivElement;

	onMount(() => {
		// div.addEventListener('scroll', function () {
		// 	if (!isLyricsScrolling) {
		// 		// User-initiated scroll
		// 		console.log('User has scrolled.');
		// 		stopJsScroll();
		// 	} else {
		// 		// Lyrics-initiated scroll
		// 		console.log('Lyrics have scrolled.');
		// 		if (div.scrollTop !== lastScrollTop) {
		// 			// User has interrupted the Lyrics scroll
		// 			console.log('On second thought, User interupted Lyrics.');
		// 			stopJsScroll();
		// 		}
		// 	}
		// 	lastScrollTop = div.scrollTop;
		// });
	});

	function lyricsScrollTo(target: number) {
		isLyricsScrolling = true;
		let currentScrollTop = div.scrollTop;
		let scrollStep = target > currentScrollTop ? 1 : -1;
		let scrollInterval = setInterval(function () {
			if (!isLyricsScrolling) {
				clearInterval(scrollInterval);
			} else {
				div.scrollTop = div.scrollTop + scrollStep;
				if (div.scrollTop === target) {
					isLyricsScrolling = false;
					clearInterval(scrollInterval);
				}
			}
		}, 1);
	}

	function stopJsScroll() {
		isLyricsScrolling = false;
	}
</script>

<div bind:this={div} class="overflow-y-scroll container">
	<slot />
</div>

<style>
	.container {
		color: white;
		position: relative;
		mix-blend-mode: hard-light;
		height: 575px;
		/* scroll-behavior: smooth; */
	}

	.container::after {
		position: fixed;
		content: '';
		left: 0px;
		top: 0px;
		height: 575px;
		width: 100%;
		background: linear-gradient(gray, transparent 10%, transparent 80%, gray);
		pointer-events: none;
	}
</style>
