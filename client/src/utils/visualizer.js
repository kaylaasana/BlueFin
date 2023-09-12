import * as THREE from 'three';
import sexymusic from '/music/sexy-music.mp3';

export default function visualizer() {
  let camera = new THREE.Camera();

  const listener = new THREE.AudioListener();
  camera.add(listener);

  // create an Audio source
  const sound = new THREE.Audio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(sexymusic, function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });

  // create an AudioAnalyser, passing in the sound and desired fftSize

  requestAnimationFrame();
  const analyser = new THREE.AudioAnalyser(sound, 32);
  // get the average frequency of the sound

  const data = analyser.getFrequencyData();

  console.log(data);
}
