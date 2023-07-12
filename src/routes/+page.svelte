<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Buttons from '../components/Buttons.svelte';
	import Visualizer from '../components/Visualizer/Visualizer-DOM.svelte';
	import AudioPlayer from '../components/Visualizer/AudioPlayer.svelte';
	import { invMel, rapScale } from '../util';
	import { buttons } from '../constants';
	import Details from '../components/Details/Details.svelte';
	import Button from '../components/buttons/Button.svelte';
	import Progress from '../components/Progress.svelte';
	import Lyrics from '../components/Lyrics/Lyrics.svelte';
	import Sound from '../components/Sound.svelte';
	import Cover from '../components/Cover.svelte';
	import Background from '../components/Background.svelte';
	import { fade } from 'svelte/transition';
	let demo = true;

	let mediaElement: HTMLMediaElement;

	let scalingExponent = 4;
	let split = 100;
	let maxMel = 3317;
	// maxFreq = 12583;
	let usingMel = false;
	$: melInterval = maxMel / split;
	let upperBounds: number[] = [];
	$: usingMel, calculateBounds();
	const calculateBounds = () => {
		const newBounds = [0];
		for (let i = 1; i <= split; i++) {
			let freq: number;
			if (usingMel) {
				const mel = melInterval * i;
				freq = invMel(mel);
			} else freq = rapScale(i);
			newBounds.push(Math.floor(freq));
		}
		upperBounds = newBounds;
	};

	let metadata: App.Metadata | null =
		// null;
		{
			title: 'Ontheway!',
			artist: 'Earl Sweatshirt',
			album: '',
			explicit: true,
			// cover: null
			cover:
				'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e7/49/8f/e7498f65-df8f-bead-d6e3-2a8d4d642a79/886447235317.jpg/1200x1200bb.jpg'
		};

	if (demo) {
		metadata = {
			title: 'Frank Lucas (feat. Benny the Butcher)',
			artist: 'Freddie Gibbs & The Alchemist',
			album: '',
			explicit: true,
			// cover: null
			cover:
				'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/11/f5/72/11f572ef-f422-92b5-1a7e-b6cd882ddf85/194690217357_cover.jpg/1200x1200bf-60.jpg'
		};
	}

	onMount(() => {
		// TODO: I shouldn't have to do this...
		let newMediaElement: HTMLMediaElement = new Audio('/demo-song.mp3');
		newMediaElement.oncanplay = async () => {
			mediaElement = newMediaElement;
		};
	});
	let hideUI = false;

	function handleHideUI() {
		hideUI = !hideUI;
	}
	$: mediaElement, (hideUI = !!mediaElement);
	function toggle() {
		if (mediaElement) {
			if (mediaElement.paused) {
				mediaElement.play();
			} else {
				mediaElement.pause();
			}
		}
	}
</script>

<Background src={metadata?.cover} />

<div class="w-full h-screen flex overflow-hidden select-none">
	<!-- Left bar -->
	<div
		class="xl:w-[630px] w-[400px] flex items-center justify-center px-20 flex-col gap-6 overflow-hidden my-6"
	>
		<div class="rounded-lg my-7 w-full">
			<Cover src={metadata?.cover} />
		</div>
		<div class="w-[600px] flex justify-center items-center">
			<Details active={metadata} />
			<!-- More button -->
			<div class="flex-none mr-16 w-8 ml-5">
				<!-- {#if mediaElement} -->
				<div
					transition:fade
					class="rounded-full w-7 h-7 bg-gray-400/40 hover:opacity-70 flex items-center justify-center cursor-pointer"
				>
					<svg viewBox="0 0 256 256" width="20" height="20" class="text-white">
						<path
							d="M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28ZM48 100a28 28 0 1 0 28 28a28 28 0 0 0-28-28Zm160 0a28 28 0 1 0 28 28a28 28 0 0 0-28-28Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<!-- {/if} -->
			</div>
		</div>
		<div class="xl:w-[452px]">
			<Progress {mediaElement} />
			<Buttons {mediaElement} on:toggle={toggle} />
			<Sound {mediaElement} />
		</div>
	</div>
	<!-- Lyrics & Vis -->
	<div class="h-full flex flex-col justify-center items-center font-bold flex-1">
		<!-- <Lyrics /> -->
		<Visualizer {mediaElement} bind:upperBounds {scalingExponent} />
	</div>
	<!-- <div class="absolute top-0 left-0">
		<AudioPlayer
			on:audioReady={(e) => {
				mediaElement = e.detail.mediaElement;
			}}
			on:click={handleHideUI}
		/>
	</div> -->
</div>
