export default function ProgressBar({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
  }) {
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };
  
    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutesText}:${secondsText}`;
      }
      return "00:00";
    };
  
    return (
      <>
        <div className="w-2/6 flex items-center gap-[16px] audio__progress--wrapper">
          <span className="text-white text-[14px]">
            {formatTime(timeProgress)}
          </span>
          <input
            className="rounded-[4px] h-[4px] max-w-[300px] w-full cursor-pointer outline-none appearance-none"
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleProgressChange}
          />
          <span className="text-white text-[14px]">{formatTime(duration)}</span>
        </div>
      </>
    );
  }