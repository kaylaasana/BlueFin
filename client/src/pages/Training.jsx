import { useState } from "react";
import audioStream from "../utils/audioStream";

const Training = () => {
  const [note, setNote] = useState([])
  return(
  <>
    <button onClick={() => audioStream()}>Test</button>
    <canvas>{note}</canvas>
  </>
  )
}

export default Training