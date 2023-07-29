<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { getMaxInRange, isEmpty } from '../../util';
	export let mediaElement: HTMLMediaElement;
	import data from '../../example-data.json';
	export let upperBounds: number[];
	export let scalingExponent: number;

	let audioContext: AudioContext;
	let analyser: AnalyserNode;
	let bufferLength: number | undefined;
	let dataArray: Uint8Array;
	let animationId: number;
	let source: MediaElementAudioSourceNode;
	let fileSrc: string;
	// Each dot's height ranges from [0, 320]
	const heights: number[] = new Array(100).fill(0);
	// const futureHeights: number[] = [];
	let interval: NodeJS.Timer;
	$: visible = !!mediaElement;
	$: barCount = upperBounds.length - 1;
	const refreshRate = 30;
	// let prevHeights: number[] = [];
	const masterArray: number[][] = [];
	let loop = 0;

	// const blendHeight = (blendFactor: number) => {
	// 	// A number from 0-1 that determines how much to favor current heights over previous heights

	// 	for (let i = 0; i < barCount; i++) {
	// 		heights[i] = futureHeights[i] * blendFactor + prevHeights[i] * (1 - blendFactor);
	// 	}
	// };
	const calcHeights = () => {
		// if (!analyser) return;
		// analyser.getByteFrequencyData(dataArray);
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
			// console.log(dataArray.filter((_, i) => i >= lowerIndex && i <= upperIndex).length);
			// const allBins = dataArray.filter((_, i) => i >= lowerIndex && i <= upperIndex);
			// .sort((a, b) => b - a);
			const topBin = getMaxInRange(dataArray, lowerIndex, upperIndex);
			masterArray[loop][i] = topBin;
			// const countedBins = topBin.length;
			// const totalPower = topBin.reduce((a, b) => a + b, 0);
			// If averagePower resolves to NaN, set to 0
			// const averagePower = topBin;
			//  || 0;

			// Convert the linear amplitude value to decibels.
			const dBValue = 20 * Math.log10(Math.max(topBin, 1) / 255);

			// Convert the dB value back to a linear amplitude value. This will create a perceived
			// volume effect where a larger change is needed at higher volumes to achieve the same
			// perceived difference in volume (as human hearing is logarithmic, not linear).
			const scaledValue = Math.pow(10, dBValue / 20);

			// Increase the apparent difference in volume between bars by raising the
			// normalized value to a power. A common choice is 2 for a quadratic difference,
			// but the scalingExponent can be any positive number.
			const scaledLoudness = Math.pow(scaledValue, scalingExponent);
			const barHeight = scaledLoudness * 320;
			heights[i] = barHeight;
		}
		if (isEmpty(masterArray[loop])) {
			masterArray[loop] = [];
		} else {
			loop += 1;
		}
		console.log(masterArray);
	};

	let audioContextCreated = false;
	$: if (visible) {
		// if (!analyser) {
		// 	audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		// 	analyser = audioContext.createAnalyser();
		// 	analyser.fftSize = 1024 * 2;

		// 	audioContextCreated = true;
		// 	// // Create a MediaElementAudioSourceNode from the provided mediaElement
		// 	// source = audioContext.createMediaElementSource(mediaElement);

		// 	// // Connect the source to the analyser
		// 	// source.connect(analyser);
		// 	// analyser.connect(audioContext.destination);

		// 	bufferLength = analyser.frequencyBinCount;
		// 	dataArray = new Uint8Array(bufferLength);
		// }
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		interval = setInterval(calcHeights, 1000 / refreshRate);
		// calcHeights();
	}

	$: if (mediaElement) {
		if (mediaElement.src !== fileSrc) {
			fileSrc = mediaElement.src;
			// mediaElement.addEventListener('ended', hide);
			if (source) source.disconnect();

			source = audioContext.createMediaElementSource(mediaElement);
			source.connect(analyser);
			analyser.connect(audioContext.destination);
		}
	}
	onDestroy(() => {
		// if (mediaElement) mediaElement.removeEventListener('ended', hide);
		// if (animationId) {
		// 	cancelAnimationFrame(animationId);
		// }
		if (source) {
			source.disconnect();
		}
		if (audioContext) {
			audioContext.close();
		}
	});
</script>

{#if false}
	<div
		class="w-full mr-20 max-w-7xl h-80 flex items-center justify-center gap-[3px]"
		transition:fade
		style="--duration: {1 / refreshRate}s"
	>
		{#each heights as dot, i (i)}
			<div
				class="{dot < 12 ? 'bg-gray-400/50' : 'bg-white/90'} w-2 min-h-[8px] rounded-full dot"
				style="height: {dot}px"
			/>
		{/each}
	</div>
{/if}

<style>
	.dot {
		transition-duration: var(--duration);
	}
</style>
