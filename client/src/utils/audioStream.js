
function audioStream() {
  const context = new AudioContext();
  
  const analyser = new AnalyserNode(
    context, {
    minDecibels : -100,
    maxDecibels : -10,
    smoothingTimeConstant : 0.85 
  })
  
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  }).then((stream) => {
    const source = context.createMediaStreamSource(stream);
    source.connect(analyser)
    console.log(analyser)

  }).catch((err) => {
    console.log(err)
  })
}

export default audioStream