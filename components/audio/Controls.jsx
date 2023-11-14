import {
    FaBackward,
    FaForward,
    FaPause,
    FaPlay,
  } from "react-icons/fa";
  import { useCallback, useEffect, useRef, useState } from "react";
  
  export default function Controls({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
  }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const playAnimationRef = useRef();
  
    const repeat = useCallback(() => {
      const currentTime = audioRef.current?.currentTime;
      setTimeProgress(currentTime);
      if (progressBarRef.current) {
        progressBarRef.current.value = currentTime || 0;
        progressBarRef.current.style.setProperty(
          "--range-progress",
          `${(progressBarRef.current.value / duration) * 100}%`
        );
      }
  
      playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);
  
    const togglePlayPause = () => {
      setIsPlaying((prev) => !prev);
    };
  
    const skipForward = () => {
      audioRef.current.currentTime += 10;
    };
  
    const skipBackward = () => {
      audioRef.current.currentTime -= 10;
    };
  
    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);
  
    return (
      <>
        <div className="w-2/6 audio__controls--wrapper">
          <div className="flex items-center justify-center gap-[40px]">
            <button
              className="rounded-full cursor-pointer"
              onClick={skipBackward}
            >
              <FaBackward
                className="w-[28px] h-[28px] text-white"
              />
            </button>
            <button
              className="bg-white w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <FaPause
                  className="text-[#042330] text-[20px] mr-[1px]"
                />
              ) : (
                <FaPlay
                  className="text-[#042330] text-[20px] ml-[2px]"
                />
              )}
            </button>
            <button className="rounded-full cursor-pointer" onClick={skipForward}>
              <FaForward
                className="w-[28px] h-[28px] text-white"
              />
            </button>
          </div>
        </div>
      </>
    );
  }