import { useEffect, useState } from 'react';
import { Sparkles, Music2 } from 'lucide-react';

import img50cent from '../image/imageStar/50cent.jpeg';
import imgBeyonce from '../image/imageStar/beyonce.jpeg';
import imgDavido from '../image/imageStar/Davido.jpeg';
import imgDidi from '../image/imageStar/Didi.jpeg';
import imgDnd from '../image/imageStar/DND.jpeg';
import imgFally from '../image/imageStar/Fally Ipupa.jpeg';
import imgHimra from '../image/imageStar/HIMRA.jpeg';
import imgOmah from '../image/imageStar/Omah Lay.jpeg';
import imgRihanna from '../image/imageStar/rihanna.jpeg';

interface ArtistsInterludeProps {
  onContinue: () => void;
}

const ARTISTS = [
  { name: '50 Cent', image: img50cent },
  { name: 'Beyoncé', image: imgBeyonce },
  { name: 'Davido', image: imgDavido },
  { name: 'Didi', image: imgDidi },
  { name: 'DND', image: imgDnd },
  { name: 'Fally Ipupa', image: imgFally },
  { name: 'Himra', image: imgHimra },
  { name: 'Omah Lay', image: imgOmah },
  { name: 'Rihanna', image: imgRihanna },
];

export default function ArtistsInterlude({ onContinue }: ArtistsInterludeProps) {
  const [autoScrollDone, setAutoScrollDone] = useState(false);

  useEffect(() => {
    // Scroll automatique doux vers le bas puis le haut pour l'effet "défilement"
    const container = document.getElementById('artists-interlude-scroll');
    if (!container) return;

    const totalScroll = container.scrollHeight - container.clientHeight;
    if (totalScroll <= 0) {
      setAutoScrollDone(true);
      return;
    }

    const duration = 8000; // 8s
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      container.scrollTop = totalScroll * eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAutoScrollDone(true);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-black via-slate-900 to-black text-white flex flex-col">
      <div className="px-4 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">
            Inspiration Karaoké
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
          <Music2 className="w-4 h-4" />
          <span>Prépare ta chanson...</span>
        </div>
      </div>

      <div
        id="artists-interlude-scroll"
        className="flex-1 overflow-y-auto px-4 pb-24 space-y-6 snap-y snap-mandatory"
      >
        {ARTISTS.map((artist, index) => (
          <div
            key={artist.name}
            className="relative rounded-3xl overflow-hidden shadow-2xl snap-center min-h-[260px] sm:min-h-[320px] border border-white/5"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-1">
                  Star vibes
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold font-display drop-shadow-lg">
                  {artist.name}
                </h2>
              </div>
              <div className="hidden sm:flex flex-col items-end text-xs text-white/70">
                <span>Inspire-toi,</span>
                <span>mais reste toi-même.</span>
              </div>
            </div>
          </div>
        ))}

        <div className="h-10" />
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-6 pt-4 px-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full bg-white/10 border border-white/40 backdrop-blur-md text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <span>{autoScrollDone ? 'Continuer vers le choix musical' : 'Passer'}</span>
        </button>
      </div>
    </div>
  );
}


