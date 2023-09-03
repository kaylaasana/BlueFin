
function audioStream() {
  const context = new AudioContext();
  
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  }).then((stream) => {
    const source = context.createMediaStreamSource(stream);
    source.connect(context.destination)
    console.log("hello")
  }).catch((err) => {
    console.log(err)
  })
}

export default audioStream