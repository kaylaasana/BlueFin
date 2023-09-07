import * as Tone from 'tone';

const player = () => {
  const player = new Tone.Player(
    'https://tonejs.github.io/audio/berklee/gong_1.mp3'
  ).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
};

export default player;
