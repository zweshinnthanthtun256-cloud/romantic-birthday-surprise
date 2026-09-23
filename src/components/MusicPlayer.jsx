import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const audio = useRef(null),
    fade = useRef(null),
    generation = useRef(0),
    targetVolume = useRef(0.25);
  const [playing, setPlaying] = useState(false),
    [volume, setVolume] = useState(0.25),
    [unavailable, setUnavailable] = useState(false),
    [expanded, setExpanded] = useState(false);
  function stopFade() {
    clearInterval(fade.current);
    fade.current = null;
  }
  async function play() {
    if (!audio.current || unavailable) return;
    const id = ++generation.current;
    stopFade();
    audio.current.volume = 0;
    try {
      await audio.current.play();
      if (id !== generation.current) return;
      setPlaying(true);
      fade.current = setInterval(() => {
        if (!audio.current) return stopFade();
        audio.current.volume = Math.min(targetVolume.current, audio.current.volume + 0.015);
        if (audio.current.volume >= targetVolume.current) stopFade();
      }, 80);
    } catch {
      if (id === generation.current) {
        setPlaying(false);
        if (audio.current.error) setUnavailable(true);
      }
    }
  }
  function pause() {
    generation.current++;
    stopFade();
    audio.current?.pause();
    setPlaying(false);
  }
  useImperativeHandle(ref, () => ({ start: play }));
  useEffect(
    () => () => {
      stopFade();
      generation.current++;
    },
    [],
  );
  function changeVolume(e) {
    const next = Number(e.target.value);
    targetVolume.current = next;
    setVolume(next);
    stopFade();
    if (audio.current) audio.current.volume = next;
  }
  return (
    <>
      <audio
        ref={audio}
        src={siteConfig.music || undefined}
        preload="none"
        loop
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
          stopFade();
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      {visible && (
        <div className="music-control">
          <button
            className="icon-button music-toggle"
            onClick={() => setExpanded((o) => !o)}
            aria-label="Music controls"
            aria-expanded={expanded}
          >
            <Music2 size={18} />
            <span className={playing ? 'music-status playing' : 'music-status'} />
          </button>
          {expanded && (
            <div className="music-panel">
              <span className="eyebrow">OUR SOUNDTRACK · {siteConfig.songTitle}</span>
              {unavailable ? (
                <p>Enjoy this little moment in quiet.</p>
              ) : (
                <>
                  <button className="music-play" onClick={playing ? pause : play}>
                    {playing ? <Pause size={18} /> : <Play size={18} />}{' '}
                    {playing ? 'Pause music' : 'Play music'}
                  </button>
                  <label className="volume-label">
                    {volume ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    <span className="sr-only">Music volume</span>
                    <input
                      aria-label="Music volume"
                      type="range"
                      min="0"
                      max="1"
                      step=".01"
                      value={volume}
                      onChange={changeVolume}
                    />
                  </label>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
});
export default MusicPlayer;
