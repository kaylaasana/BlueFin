import * as THREE from 'three';

class Note {
  constructor() {
    this.confirmNote = [];
    this.clock = new THREE.Clock();
    this.noteTracker = 'testing';
    this.context = new AudioContext();
    this.analyser = new AnalyserNode(this.context, {
      minDecibels: -100,
      maxDecibels: -10,
      smoothingTimeConstant: 0.85,
    });
  }
  audioStream() {
    // Create an analyser node and attach it to our audio context so that
    // we can see the data that passes through our audio context node

    // The noteStrings array currently only takes a guitar with standard tuning in mind

    // drawNote handles displaying the actual note value on the frontend via valueToDisplay

    // Get access to the user's audio input device and setup additional options
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
        // Once promise is fulfilled we will create a Media stream
        // source on our audio context and pass the stream to it
        const source = this.context.createMediaStreamSource(stream);
        // Connect the newly created source with the analyser node
        source.connect(this.analyser);

        this.drawNote();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  drawNote() {
    // requestAnimationFrame calls drawNote so that the function keeps returning the note
    // from the user's microphone
    window.requestAnimationFrame(() => {
      this.drawNote();
      const time = this.clock.getElapsedTime();

      if (time < 1 && this.noteTracker) {
        this.confirmNote.push(this.noteTracker);
        console.log(this.noteTracker);
      } else if (this.confirmNote.every((val) => val == this.confirmNote[0])) {
        console.log('you played', this.confirmNote[0]);
      } else {
        this.confirmNote = [];
      }
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

    // valueToDisplay will return the index to the user to show them the note they're playing from noteStrings
    let valueToDisplay =
      noteStrings[this.noteFromPitch(autoCorrelateValue) % 12];

    // once audioStream gets imported to Training.jsx, it will render the div's innerText to display the note
    document.getElementById('note').innerText = valueToDisplay;

    // let confirmNote = [];
    // confirmNote.push(this.noteTracker);

    // console.log(confirmNote);

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

function audioStream() {
  const context = new AudioContext();

  // Create an analyser node and attach it to our audio context so that
  // we can see the data that passes through our audio context node
  const analyser = new AnalyserNode(context, {
    minDecibels: -100,
    maxDecibels: -10,
    smoothingTimeConstant: 0.85,
  });

  // The noteStrings array currently only takes a guitar with standard tuning in mind
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
  function noteFromPitch(frequency) {
    let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  // drawNote handles displaying the actual note value on the frontend via valueToDisplay
  function drawNote() {
    // requestAnimationFrame calls drawNote so that the function keeps returning the note
    // from the user's microphone
    requestAnimationFrame(drawNote);
    let bufferLength = analyser.fftSize;
    let buffer = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(buffer);
    let autoCorrelateValue = autoCorrelate(buffer, context.sampleRate);

    // valueToDisplay will return the index to the user to show them the note they're playing from noteStrings
    let valueToDisplay = noteStrings[noteFromPitch(autoCorrelateValue) % 12];

    // once audioStream gets imported to Training.jsx, it will render the div's innerText to display the note
    document.getElementById('note').innerText = valueToDisplay;

    noteTracker = valueToDisplay;

    if (autoCorrelateValue === -1) {
      document.getElementById('note').innerText = 'Listening......';
    }
  }

  // Get access to the user's audio input device and setup additional options
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
      // Once promise is fulfilled we will create a Media stream
      // source on our audio context and pass the stream to it
      const source = context.createMediaStreamSource(stream);
      // Connect the newly created source with the analyser node
      source.connect(analyser);

      drawNote();
    })
    .catch((err) => {
      console.log(err);
    });
}

function autoCorrelate(buffer, sampleRate) {
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

export { Note };
