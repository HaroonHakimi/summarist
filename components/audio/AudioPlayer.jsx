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
      <div className=" w-full h-[80px] mt-auto flex flex-col md:flex-row items-center  md:justify-between space-y-2 bg-[#042330] px-[40px] fixed md:bottom-0 md:left-0 z-[9998] audio__wrapper">
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
