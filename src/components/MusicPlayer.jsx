import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ExternalLink, Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const player = useRef(null);
  const wantsToPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [unavailable, setUnavailable] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sendCommand = (func, args = []) => {
    player.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      'https://www.youtube-nocookie.com',
    );
  };

  function play() {
    wantsToPlay.current = true;
    sendCommand('setVolume', [Math.round(volume * 100)]);
    sendCommand(volume ? 'unMute' : 'mute');
    sendCommand('playVideo');
    setPlaying(true);
    setUnavailable(false);
  }

  function pause() {
    wantsToPlay.current = false;
    sendCommand('pauseVideo');
    setPlaying(false);
  }

  useImperativeHandle(ref, () => ({ start: play }));

  function changeVolume(event) {
    const next = Number(event.target.value);
    setVolume(next);
    sendCommand('setVolume', [Math.round(next * 100)]);
    sendCommand(next ? 'unMute' : 'mute');
  }

  const playerOrigin = window.location.origin;
  const playerUrl = `https://www.youtube-nocookie.com/embed/${siteConfig.musicYouTubeId}?enablejsapi=1&playsinline=1&rel=0&loop=1&playlist=${siteConfig.musicYouTubeId}&controls=1&origin=${encodeURIComponent(playerOrigin)}`;

  return (
    <div
      className={`music-control ${visible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden={!visible}
    >
      <button
        className="icon-button music-toggle"
        onClick={() => setExpanded((open) => !open)}
        aria-label="Music controls"
        aria-expanded={expanded}
        tabIndex={visible ? 0 : -1}
      >
        <Music2 size={18} />
        <span className={playing ? 'music-status playing' : 'music-status'} />
      </button>

      <div className={`music-panel ${expanded ? 'expanded' : 'collapsed'}`} aria-hidden={!expanded}>
        <span className="eyebrow">OUR SOUNDTRACK</span>
        <strong className="music-title">{siteConfig.songTitle}</strong>
        <span className="music-artist">{siteConfig.songArtist}</span>

        {unavailable ? (
          <p>The player could not load. Open the official song below.</p>
        ) : (
          <>
            <div className="music-embed">
              <iframe
                ref={player}
                src={playerUrl}
                title={`${siteConfig.songTitle} by ${siteConfig.songArtist}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => {
                  sendCommand('setVolume', [Math.round(volume * 100)]);
                  if (wantsToPlay.current) sendCommand('playVideo');
                }}
                onError={() => {
                  setUnavailable(true);
                  setPlaying(false);
                }}
                tabIndex={expanded ? 0 : -1}
              />
            </div>
            <button className="music-play" onClick={playing ? pause : play} tabIndex={expanded ? 0 : -1}>
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
                tabIndex={expanded ? 0 : -1}
              />
            </label>
          </>
        )}

        <a
          className="music-source-link"
          href={siteConfig.songSourceUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={expanded ? 0 : -1}
        >
          Official song <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
});

export default MusicPlayer;
