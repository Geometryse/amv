// interface MusicInterface {
// 	active: null | ActiveSong;
// 	queue: Song[];
// }
// interface Song {
// 	title: string;
// 	artist: string;
// 	album: string;
// }
// interface ActiveSong extends Song {
// 	playing: boolean;
// }

// const mockData: MusicInterface = {
// 	active: {
// 		title: 'Aye (feat. Travis Scott',
// 		artist: 'Lil Uzi Vert',
// 		album: 'Pink Tape',
// 		playing: false
// 	},
// 	queue: []
// };
// export let musicInterface: MusicInterface = mockData;

// export const togglePlay = () => {
// 	console.log('i changed');
// 	if (musicInterface.active) musicInterface.active.playing = !musicInterface.active.playing;
// 	// eslint-disable-next-line no-self-assign
// 	musicInterface = musicInterface;
// };
