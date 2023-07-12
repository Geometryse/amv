<script lang="ts">
	import Marquee from './Marquee.svelte';
	export let active: App.Metadata | null | undefined;
	import { sleep } from '../../util';
	import { onDestroy, onMount } from 'svelte';
	// const { explicit, title, artist, album } = active;
	const explicit = !!active?.explicit,
		title = active?.title || 'Not Playing',
		artist = active?.artist || '⠀',
		album = active?.album || '';

	let showAlbum = false;
	let movement = 0;
	let mounted = false;
	let interval: NodeJS.Timer;
	let moving = false;
	let state: App.MovementState[] = [-1, -1]; // -1: Too small to move, 0: Actively moving, 1: Finished moving
	let begunMoving: number;
	// If all elements of an array are equal to 1, ignoring the ones that are equal to -1, set all values that are equal to 1 back to 0.
	async function beginMovement() {
		moving = true;
		begunMoving = Date.now();
		interval = setInterval(async () => {
			if (Date.now() - begunMoving >= 3000) movement -= 1;
		}, 28);
	}
	async function checkMovement() {
		// Check if movement should be started
		if (!moving && state.includes(0)) {
			beginMovement();
		}
	}
	async function checkReset() {
		if (state.every((val) => val === 1 || val === -1)) {
			state = state.map((val) => (val === 1 ? 0 : val)); // Set all enabled back to 0
			clearInterval(interval);
			moving = false;
			movement = 0;
		}
		checkMovement();
	}
	onMount(() => {
		mounted = true;
	});
	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
	function updateState(i: number, newValue: App.MovementState) {
		state[i] = newValue;
		state = state;
	}
	const bottomText = artist + (showAlbum ? ` — ${album}` : '');
	$: state, mounted && checkReset();
</script>

<div class="pl-7 xl:w-[472px] w-[272px]">
	<Marquee
		text={title}
		{explicit}
		bold
		bind:movement
		on:updateState={({ detail: newValue }) => updateState(0, newValue)}
	/>
	<Marquee
		text={bottomText}
		bind:movement
		on:updateState={({ detail: newValue }) => updateState(1, newValue)}
	/>
</div>
