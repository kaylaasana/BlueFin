import * as Tone from "tone"

async function playNote() {
  const piano = new Tone.Sampler({
  urls: {
       'A1': 'A1.[mp3|ogg]',
       'A2': 'A2.[mp3|ogg]',
       'A3': 'A3.[mp3|ogg]',
       'A4': 'A4.[mp3|ogg]',
       'A5': 'A5.[mp3|ogg]',
       'A6': 'A6.[mp3|ogg]',
       'C1': 'C1.[mp3|ogg]',
       'C2': 'C2.[mp3|ogg]',
       'C3': 'C3.[mp3|ogg]',
       'C4': 'C4.[mp3|ogg]',
       'C5': 'C5.[mp3|ogg]',
       'C6': 'C6.[mp3|ogg]',
       'C7': 'C7.[mp3|ogg]',
       'D#1': 'Ds1.[mp3|ogg]',
       'D#2': 'Ds2.[mp3|ogg]',
       'D#3': 'Ds3.[mp3|ogg]',
       'D#4': 'Ds4.[mp3|ogg]',
       'D#5': 'Ds5.[mp3|ogg]',
       'D#6': 'Ds6.[mp3|ogg]',
       'F#1': 'Fs1.[mp3|ogg]',
       'F#2': 'Fs2.[mp3|ogg]',
       'F#3': 'Fs3.[mp3|ogg]',
       'F#4': 'Fs4.[mp3|ogg]',
       'F#5': 'Fs5.[mp3|ogg]',
       'F#6': 'Fs6.[mp3|ogg]',
    },

    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  const tones = await Tone.loaded()
    let notes = [
    'A1','A2','A3','A4','A5','A6','A#1','A#2','A#3','A#4','A#5','A#6',
    'B1','B2','B3','B4','B5','B6',
    'C1','C2','C3','C4','C5','C6','C#1','C#2','C#3','C#4','C#5','C#6',
    'D1','D2','D3','D4','D5','D6','D#1','D#2','D#3','D#4','D#5','D#6',
    'E1','E2','E3','E4','E5','E6',
    'F1','F2','F3','F4','F5','F6','F#1','F#2','F#3','F#4','F#5','F#6',
    'G1','G2','G3','G4','G5','G6','G#1','G#2','G#3','G#4','G#5','G#6'
  ]
    
    let idx = notes[Math.floor(Math.random() * notes.length)];   

    piano.triggerAttackRelease(idx, 4);
    console.log(idx)
  return idx
  
}

export default playNote