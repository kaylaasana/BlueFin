import * as THREE from 'three';

// Note class constructor used because it grants us acces to the noteTracker
// that will be used in Training
class Note {
  constructor() {
    this.confirmNote = [];
    this.clock = new THREE.Clock();
    this.playBackNote = '';
    this.noteTracker = 'testing';
    this.context = new AudioContext();
    this.analyser = new AnalyserNode(this.context, {
      minDecibels: -100,
      maxDecibels: -10,
      smoothingTimeConstant: 0.85,
    });
  }

  audioStream() {
    // gains access to the users audio input devices and passes in specfic audio options
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0,
        },
      })

      .then((stream) => {
        // createMediaStreamSource is called on AudioContext and takes the promise from getUserMedia
        // this allows source to watch the microphone as an audio intake
        const source = this.context.createMediaStreamSource(stream);

        // connect source to an audio analyser instatiated from this.analyser
        source.connect(this.analyser);

        this.drawNote();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // drawNote constantly gets data from this.analyser for noteTracker

  drawNote() {
    window.requestAnimationFrame(() => {
      this.drawNote();
    });

    let noteStrings = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    let bufferLength = this.analyser.fftSize;
    let buffer = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(buffer);
    let autoCorrelateValue = this.autoCorrelate(
      buffer,
      this.context.sampleRate,
    );

    let valueToDisplay =
      noteStrings[this.noteFromPitch(autoCorrelateValue) % 12];

    document.getElementById('note').innerText = valueToDisplay;

    this.noteTracker = valueToDisplay;

    if (autoCorrelateValue === -1) {
      document.getElementById('note').innerText = 'Listening......';
    }
  }

  noteFromPitch(frequency) {
    let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  autoCorrelate(buffer, sampleRate) {
    // Perform a quick root-mean-square to see if we have enough signal
    var SIZE = buffer.length;
    var sumOfSquares = 0;
    for (var i = 0; i < SIZE; i++) {
      var val = buffer[i];
      sumOfSquares += val * val;
    }
    var rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);
    if (rootMeanSquare < 0.01) {
      return -1;
    }

    // Find a range in the buffer where the values are below a given threshold.
    var r1 = 0;
    var r2 = SIZE - 1;
    var threshold = 0.2;

    // Walk up for r1
    for (var i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }

    // Walk down for r2
    for (var i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    // Trim the buffer to these ranges and update SIZE.
    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    // Create a new array of the sums of offsets to do the autocorrelation
    var c = new Array(SIZE).fill(0);
    // For each potential offset, calculate the sum of each buffer value times its offset value
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    // Find the last index where that value is greater than the next one (the dip)
    var d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }

    // Iterate from that index through the end and find the maximum sum
    var maxValue = -1;
    var maxIndex = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }

    var T0 = maxIndex;

    // Not as sure about this part, don't @ me
    // From the original author:
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
    // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
    // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
    var x1 = c[T0 - 1];
    var x2 = c[T0];
    var x3 = c[T0 + 1];

    var a = (x1 + x3 - 2 * x2) / 2;
    var b = (x3 - x1) / 2;
    if (a) {
      T0 = T0 - b / (2 * a);
    }

    return sampleRate / T0;
  }
}

export { Note };
