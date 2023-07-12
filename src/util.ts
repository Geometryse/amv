export const invMel = (m: number): number => 700 * (Math.exp(m / 1127) - 1);
export const rapScale = (x: number): number => (x <= 83 ? (1000 / 35) * x : Math.pow(1.099, x));
export function fillRoundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number
) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.arcTo(x + width, y, x + width, y + radius, radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
	ctx.lineTo(x + radius, y + height);
	ctx.arcTo(x, y + height, x, y + height - radius, radius);
	ctx.lineTo(x, y + radius);
	ctx.arcTo(x, y, x + radius, y, radius);
	ctx.closePath();
	ctx.fill();
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatTime = (seconds: number): string => {
	const flooredSeconds = Math.floor(seconds);
	const mins = Math.floor(flooredSeconds / 60);
	const secs = flooredSeconds % 60;
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
export function getMaxInRange(
	dataArray: Uint8Array,
	lowerIndex: number,
	upperIndex: number
): number {
	let maxValue = 0;
	for (let i = lowerIndex; i <= upperIndex; i++) {
		if (dataArray[i] > maxValue) {
			maxValue = dataArray[i];
		}
	}
	return maxValue;
}
