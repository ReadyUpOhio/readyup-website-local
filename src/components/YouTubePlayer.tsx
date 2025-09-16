import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { VolumeX, Volume2 } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  const handleReady = (event: any) => {
    playerRef.current = event.target;
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        className="absolute top-0 left-0 w-full h-full"
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-10"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </section>
  );
};

export default YouTubePlayer;
