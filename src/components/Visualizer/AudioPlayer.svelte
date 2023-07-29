<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let demo: boolean;

	const dispatch = createEventDispatcher();

	let mediaElement: HTMLMediaElement;
	let ready = false;
	let hide = false;
	let queue: File[] = [];
	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			queue = [...target.files];
			const url = URL.createObjectURL(queue[0]);
			fetchData(0);
			loadSong(0, url);
		}
	}
	async function fetchData(index: number) {
		// console.log('i would fetch here...');
	}
	async function loadSong(index: number, url: string) {
		let nextURL: string;

		if (mediaElement) URL.revokeObjectURL(mediaElement.src);
		mediaElement = new Audio(url);
		mediaElement.oncanplay = async () => {
			ready = true;
			if (queue[index + 1]) nextURL = URL.createObjectURL(queue[index + 1]);

			dispatch('audioReady', {
				mediaElement,
				file: queue[index]
			});
		};

		mediaElement.onended = () => {
			if (queue[index + 1]) {
				loadSong(index + 1, nextURL);
				toggle(); // play song immediately once loaded
			}
		};
	}
	function toggle() {
		if (mediaElement) {
			if (mediaElement.paused) mediaElement.play();
			else mediaElement.pause();
		}
	}
</script>

{#if !hide && !demo}
	<input
		type="file"
		multiple
		id="upload"
		accept="audio/*"
		class="text-white"
		on:change={handleFileUpload}
	/>
	<br />
	<button class="rounded bg-gray-200 text-black p-2" on:click={() => (hide = true)}>Hide UI</button>
	<!-- <input type="checkbox" name="using-mel" bind:checked={usingMel} /> -->
	<!-- <label for="using-mel" class="text-white">Using Mel?</label> -->
{/if}
