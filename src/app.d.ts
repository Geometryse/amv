// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// type Bitrate = '256' | 'lossless' | 'hi-res';

enum AudioVairant {
	dolbyAtmos,
	dolbyAudio,
	highResolutionLossless,
	lossless,
	lossyStereo
}

// interface Queue {

// }
// type Artowrk
enum PlaybackStatus {
	/** The music player is in a paused state. */
	paused,
	/** The music player is playing. */
	playing,
	/** The music player is in a stopped state. */
	stopped
}
enum RepeatMode {
	/** The music player is repeating the currently playing collection, such as an album or a playlist. */
	all,
	/** The repeat mode is in a disabled state. */
	none,
	/** The music player is repeating the currently playing entry. */
	one
}
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
			video?: string;
		}
		type MovementState = -1 | 0 | 1; // -1: Too small to move, 0: Actively moving, 1: Finished moving
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace MusicPlayer {
		// class State {
		// 	/** The active variant that indicates the quality of audio for the current entry. */
		// 	audioVariant: AudioVairant;
		// 	/** The current playback status of the music player. */
		// 	playbackStatus: MusicPlayer.PlaybackStatus;
		// 	/** The current repeat mode of the music player. */
		// 	repeatMode: MusicPlayer.RepeatMode;
		// 	/** A boolean indicating whether shuffling is enabled */
		// 	shuffle: boolean;
		// }

		// /** A Boolean value that indicates whether a music player is ready to play. */
		// isPreparedToPlay: boolean;
		// /** The current playback time, in seconds, of the current entry. */
		// playbackTime: number;
		// /** An object that exposes the observable properties of the music player. */
		// readonly state: MusicPlayer.State;
		// shuffleM

		/** A representation of the playback queue for a music player. */
		interface Queue {
			/** An entry for the playback queue of the music player. */
			Struct: {
				artwork: string;
			};
		}
		interface Config {
			bitrate: '256' | 'lossless' | 'hi-res';
			developerToken: string;
		}
		interface App extends Config {
			isAuthorized: boolean;
			musicUserToken: string;
			playbackState: boolean;
			playbackTargetAvailable: boolean;
		}
		interface Player {
			queue: Queue;
		}
	}
}
declare module '*.wasm' {
	const content: string;
	export default content;
}
export {};
