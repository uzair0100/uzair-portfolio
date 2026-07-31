import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    // Handle audio not available locally (404 in dev)
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    audio.addEventListener("error", onError);

    // Try autoplay (many browsers block until user interacts)
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    return () => {
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // Don't render the button at all if audio is unavailable
  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src="/Pharrell Williams - Happy (Official Video).mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause music" : "Play music"}
        className="fixed bottom-6 left-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:hover:scale-100"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        {playing && (
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/10" />
        )}
      </button>
    </>
  );
}
