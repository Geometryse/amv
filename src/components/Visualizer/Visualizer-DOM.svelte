<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { scaleExponentially, sumTopXInRange } from '../../util';
	export let mediaElement: HTMLMediaElement;
	export let upperBounds: number[];
	export let scalingExponent: number;
	export let sumTotal: number;
	let audioContext: AudioContext;
	let analyser: AnalyserNode;
	let bufferLength: number | undefined;
	let dataArray: Uint8Array;
	let animationId: number;
	let source: MediaElementAudioSourceNode;
	let fileSrc: string;
	// Each dot's height ranges from [0, 320]
	// const futureHeights: number[] = [];
	let interval: NodeJS.Timer;
	$: visible = !!mediaElement;
	$: barCount = upperBounds.length - 1;
	let heights: number[] = new Array(barCount).fill(0);
	const refreshRate = 100;

	let loop = 0;

	const calcHeights = () => {
		if (!analyser) return;
		analyser.getByteFrequencyData(dataArray);
		heights = [];
		for (let i = 0; i < barCount; i++) {
			// upperBounds is an array containing upper frequency bounds for each bar.
			const lowerFreq = upperBounds[i];
			const upperFreq = upperBounds[i + 1];

			// Calculate the indices of the frequency bins that correspond to the lower and upper frequencies of this band.
			const lowerIndex = Math.ceil(
				(lowerFreq / (audioContext.sampleRate / 2)) * analyser.frequencyBinCount
			);
			const upperIndex = Math.floor(
				(upperFreq / (audioContext.sampleRate / 2)) * analyser.frequencyBinCount
			);

			const topBinAvg = sumTopXInRange(dataArray, lowerIndex, upperIndex, sumTotal);
			const scaledBin = scaleExponentially(topBinAvg, scalingExponent);

			heights.push(scaledBin);
		}
	};

	let audioContextCreated = false;
	$: if (visible) {
		if (!analyser) {
			audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 1024 * 4;

			audioContextCreated = true;

			bufferLength = analyser.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);
		}
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		interval = setInterval(calcHeights, 1000 / refreshRate);
	}

	$: if (mediaElement) {
		if (mediaElement.src !== fileSrc) {
			fileSrc = mediaElement.src;
			if (source) source.disconnect();

			source = audioContext.createMediaElementSource(mediaElement);
			source.connect(analyser);
			analyser.connect(audioContext.destination);
		}
	}
	onDestroy(() => {
		if (source) {
			source.disconnect();
		}
		if (audioContext) {
			audioContext.close();
		}
		visible = false;
		visible = true;
	});
</script>

{#if visible}
	<div
		class="w-full mr-20 max-w-7xl h-80 flex items-center justify-center gap-[3px]"
		transition:fade
		style="--duration: {1 / refreshRate}s"
	>
		{#each heights as dot, i (i)}
			<div
				class="{dot < 12 ? 'bg-gray-400/50' : 'bg-white/90'} w-3 min-h-[8px] rounded-full dot"
				style="height: {Math.max(dot, 12)}px"
			/>
		{/each}
	</div>
{/if}

<style>
</style>
