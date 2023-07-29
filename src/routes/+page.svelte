<script lang="ts">
	import { onMount } from 'svelte';
	import Buttons from '../components/Buttons.svelte';
	import Visualizer from '../components/Visualizer/Visualizer-DOM.svelte';
	import Details from '../components/Details/Details.svelte';
	import Progress from '../components/Progress.svelte';
	import Sound from '../components/Sound.svelte';
	import Cover from '../components/Cover.svelte';
	import Background from '../components/Background.svelte';
	import { fade } from 'svelte/transition';
	import AudioPlayer from '../components/Visualizer/AudioPlayer.svelte';
	let demo = true;

	let mediaElement: HTMLMediaElement;
	onMount(() => {
		// mediaElement = new Audio('demo-song.mp3');
	});
	// magical three:
	let sumTotal = 1;
	let scalingExponent = 3;

	let upperBounds: number[] = Array.from(
		{ length: 52 },
		(_, i) => 700 * (Math.pow(10, i / 51) - 1)
	);

	let metadata: App.Metadata | null =
		// null;
		{
			title: 'SKITZO',
			artist: 'Travis Scott',
			album: 'UTOPIA',
			explicit: true,
			// cover: null
			cover:
				'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg/1200x1200bb.jpg'
		};
	// UTOPIA: https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg/1200x1200bb.jpg
	// ASTROWORLD: https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e7/49/8f/e7498f65-df8f-bead-d6e3-2a8d4d642a79/886447235317.jpg/1200x1200bb.jpg
	// UN VERANO SIN TI: https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/1200x1200bb.jpg
	// FUTURE HNDRXX: https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d7/20/e2/d720e257-a6e7-fec1-4546-b83f73dc071f/886447486191.jpg/1200x1200bf-60.jpg

	if (demo) {
		metadata = {
			title: 'MELTDOWN',
			artist: 'Travis Scott',
			album: 'UTOPIA',
			explicit: true,
			cover:
				'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg/1200x1200bb.jpg',
			video:
				'https://mvod.itunes.apple.com/itunes-assets/HLSMusic126/v4/b5/14/91/b5149103-467c-996b-cf7e-2a7b18458169/P606895970_Anull_video_gr290_sdr_1080x1080-.mp4'
		};
	}

	// onMount(() => {
	// 	// TODO: I shouldn't have to do this...
	// 	setTimeout(() => {
	// 		let newMediaElement: HTMLMediaElement = new Audio('/demo-song.mp3');
	// 		newMediaElement.oncanplay = async () => {
	// 			mediaElement = newMediaElement;
	// 			console.log('media el loaded up!');
	// 		};
	// 	}, 1000);
	// });

	function toggle() {
		if (mediaElement) {
			if (mediaElement.paused) {
				mediaElement.play();
			} else {
				mediaElement.pause();
			}
		} else if (demo) {
			mediaElement = new Audio('demo-song.flac');
			mediaElement.play();
		}
	}
</script>

<Background src={metadata?.cover} />

<div class="w-full h-screen flex overflow-hidden select-none">
	<!-- Left bar -->
	<div
		class="xl:w-[630px] w-[400px] flex items-center justify-center px-20 flex-col gap-6 overflow-hidden my-6"
	>
		<div class="rounded-lg my-7 w-full relative">
			<Cover src={metadata?.cover} video={metadata?.video} />
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
			<Progress bind:mediaElement />
			<Buttons bind:mediaElement on:toggle={toggle} />
			<Sound bind:mediaElement />
		</div>
	</div>
	<!-- Lyrics & Vis -->
	<div class="h-full flex flex-col justify-center items-center font-bold flex-1 text-white">
		<!-- <Lyrics /> -->
		<Visualizer {mediaElement} bind:upperBounds {scalingExponent} {sumTotal} />
		<!-- <input type="range" min="-1" max="1" step=".1" bind:value={midShift} />
		Mid Shift: {midShift} -->
		<!-- <input type="range" min="1" max="4" step="1" bind:value={sumTotal} />
		Sum Total: {sumTotal}
		<input type="range" min="1" max="4" step=".25" bind:value={scalingExponent} />
		Scaling Exponent: {scalingExponent} -->
	</div>
	<div class="absolute top-0 left-0">
		<AudioPlayer
			{demo}
			on:audioReady={(e) => {
				mediaElement = e.detail.mediaElement;
			}}
		/>
	</div>
</div>
