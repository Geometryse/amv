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
export function pseudoMelToHz(pseudoMel: number, midShift: number): number {
	// This exponent value controls the balance between linear and logarithmic scaling
	const exponent = 0.6;
	// Mid-shift adjustment
	const adjustedMel = pseudoMel + midShift * pseudoMel;
	return 700 * (Math.pow(10, Math.pow(adjustedMel / 2595, exponent)) - 1);
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

export function sumTopXInRange(
	dataArray: Uint8Array,
	lowerIndex: number,
	upperIndex: number,
	x: number
): number {
	const topValues = Array(x).fill(0);

	for (let i = lowerIndex; i <= upperIndex; i++) {
		// If the current value is larger than the smallest of the top three values...
		if (dataArray[i] > topValues[0]) {
			// Replace the smallest value and sort the array.
			topValues[0] = dataArray[i];
			topValues.sort((a, b) => a - b);
		}
	}

	// Sum up the top three values.
	const sum = topValues.reduce((a, b) => a + b, 0);

	return sum / topValues.length;
}

export function isEmpty(arr: unknown[]) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]) return false;
	}
	return true;
}
export function scaleExponentially(value: number, power: number): number {
	const normalizedValue = value / 255;
	const rescaledValue = Math.pow(normalizedValue, power) * 255;
	return rescaledValue;
}
