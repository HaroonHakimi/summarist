export default function DisplayTrack({
    data,
    audioRef,
    setDuration,
    progressBarRef,
  }) {
    const onLoadedMetadata = () => {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
    };
  
    return (
      <>
        <div className="w-2/6 flex gap-[12px] audio__track--wrapper">
          <audio
            src={data?.audioLink}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div className="flex max-w-[48px]">
            <figure className="w-[48px] h-[48px] min-w-[48px]">
              {data.imageLink ? (
                <img
                  className="block w-full h-full"
                  src={data.imageLink}
                  alt="audio avatar"
                />
              ) : (
                <div className="w-[48px] h-[48px] bg-[#f0efef]"></div>
              )}
            </figure>
          </div>
          <div className="text-white text-[14px] flex flex-col gap-[4px] justify-center">
            {data.title ? (
              <div>{data.title}</div>
            ) : (
              <div className="w-[100%] h-[25px] bg-[#f0efef]"></div>
            )}
            {data.author ? (
              <div className="text-[#bac8ce]">{data.author}</div>
            ) : (
              <div className="w-[30%] h-[25px] bg-[#f0efef]"></div>
            )}
          </div>
        </div>
      </>
    );
  }