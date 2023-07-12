<script lang="ts">
	import Bar from './Bar.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { formatTime } from '../util';
	export let mediaElement: HTMLMediaElement | undefined;
	// Progress of the song, in seconds
	let progress = 0;
	let fileSrc: string;
	// TODO: Do we need this variable?
	$: duration = mediaElement?.duration || 0.1;
	let barWidth: number;
	let fromLeft: number;
	let interval: NodeJS.Timer;
	let mouseDown = false;
	let progressString = '- - : - -';
	let remainingString = '- - : - -';

	function updateStrings() {
		if (mediaElement) {
			const flooredProgress = Math.floor(progress);
			const roundedRemaining = Math.floor(Math.ceil(duration) - progress);
			progressString = formatTime(flooredProgress);
			remainingString = '-' + formatTime(roundedRemaining);
		}
	}
	$: progress || fileSrc, updateStrings();
	// TODO: This is the same code used in Visualizer.svelte, and it involves a duplicate variable, fileSrc.
	$: if (mediaElement && mediaElement.src !== fileSrc) {
		fileSrc = mediaElement.src;
		progress = 0;
	}
	$: mediaElement, syncDuration();
	function syncDuration() {
		if (mediaElement) duration = mediaElement.duration;
	}
	// TODO: don't run setInterval when music is paused.
	onMount(() => {
		if (!interval)
			interval = setInterval(() => {
				if (!mouseDown && mediaElement) progress = mediaElement.currentTime;
			}, 20);
		if (mediaElement) mediaElement.addEventListener('durationchange', syncDuration);
	});
	function handleMouseDown(e: MouseEvent) {
		if (mediaElement) {
			// If things are selected, weird behaviors can occur.
			document.getSelection()?.empty();

			mouseDown = true;
			fromLeft = e.pageX - e.offsetX;
			progress = (e.offsetX / barWidth) * mediaElement.duration;
			document.addEventListener('mousemove', handleMouseMove);
		}
	}
	function handleMouseMove(e: MouseEvent) {
		if (mediaElement) {
			let progressUpdate = ((e.pageX - fromLeft) / barWidth) * mediaElement.duration;
			const threshold = 0.01; // Only update if change is at least 1% of the full range

			if (Math.abs(progressUpdate - progress) > threshold) {
				// Bound value between 0 and duration
				progressUpdate = Math.max(progressUpdate, 0);
				progressUpdate = Math.min(progressUpdate, mediaElement.duration);

				progress = progressUpdate;
			}
			if (e.buttons !== 1) {
				mouseDown = false;
				if (mediaElement) mediaElement.currentTime = progress;
				document.removeEventListener('mousemove', handleMouseMove);
			}
		}
	}
	onDestroy(() => {
		if (typeof document !== 'undefined') document.removeEventListener('mousemove', handleMouseMove);
		if (mediaElement) mediaElement.removeEventListener('durationchange', syncDuration);
	});
</script>

<div class="w-full h-9">
	<div class="w-full" bind:clientWidth={barWidth}>
		<Bar
			to={mediaElement?.duration || 1}
			current={progress}
			on:mousedown={handleMouseDown}
			active={!!mediaElement}
		/>
	</div>
	<div class="flex justify-between text-white/50 text-sm cursor-default">
		<p>{progressString}</p>
		<p>
			{remainingString}
		</p>
	</div>
</div>
