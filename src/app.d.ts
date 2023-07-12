// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface MusicInterface {
			active: null | ActiveSong;
			queue: Song[];
		}
		interface Metadata {
			title: string;
			artist: string;
			album: string;
			explicit: booolean;
			cover: string | null;
		}
		type MovementState = -1 | 0 | 1; // -1: Too small to move, 0: Actively moving, 1: Finished moving
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
declare module '*.wasm' {
	const content: string;
	export default content;
}
export {};
