import { useRef, useState } from "react";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";

export default function AudioPlayer({ data }) {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <>
      <div className="w-full h-[80px] mt-auto flex items-center justify-between bg-[#042330] px-[40px] fixed bottom-0 left-0 z-[9998] audio__wrapper">
        <DisplayTrack
          data={data}
          audioRef={audioRef}
          setDuration={setDuration}
          progressBarRef={progressBarRef}
        />
        <Controls
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          setTimeProgress={setTimeProgress}
        />
        <ProgressBar
          progressBarRef={progressBarRef}
          audioRef={audioRef}
          timeProgress={timeProgress}
          duration={duration}
        />
      </div>
    </>
  );
}