import { Sparkles, Film, Clock, Popcorn, Megaphone } from 'lucide-react';
import imageCine from '../image/imageCiné.png';
import logo from '../image/logo.png';
import { useEffect, useState } from 'react';

interface EventAnnouncementProps {
  onContinue: () => void;
}

export default function EventAnnouncement({ onContinue }: EventAnnouncementProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-display">
      {/* arrière-plan */}
      <div className="absolute inset-0">
        <img
          src={imageCine}
          alt="Soirée cinéma"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)] opacity-40" />
      </div>

      {/* Particules lumineuses */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, idx) => (
          <div
            key={idx}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <div className="mb-10 animate-scaleIn">
          <div className="inline-flex items-center gap-3 px-8 py-2 bg-white/10 border border-white/20 rounded-full uppercase tracking-[0.3em] text-xs font-semibold shadow-lg shadow-ucao-red-900/50">
            <Sparkles className="w-4 h-4 text-ucao-red-300 animate-pulse" />
            Événement phare
          </div>
        </div>

        {/* Bandeau style cinéma */}
        <div className="w-full max-w-4xl mb-8 animate-slideInUp">
          <div className="relative py-3 px-4 bg-gradient-to-r from-ucao-red-700 via-ucao-red-500 to-ucao-blue-700 rounded-full shadow-2xl border border-white/20">
            <div className="absolute inset-0 rounded-full border border-white/30 opacity-60" />
            <div className="flex items-center justify-center gap-4 text-sm uppercase tracking-[0.4em] text-white font-semibold">
              <span className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" /> Breaking News
              </span>
              <span className="w-10 h-0.5 bg-white/60" />
              <span>Soirée cinéma exclusive</span>
              <span className="w-10 h-0.5 bg-white/60" />
              <span>UCAO</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/10 rounded-[40px] p-6 md:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.6)] animate-fadeIn relative overflow-hidden">
          <div className="absolute -top-24 -left-12 w-40 h-40 bg-ucao-red-500 blur-3xl opacity-40" />
          <div className="absolute -bottom-16 -right-10 w-52 h-52 bg-ucao-blue-600 blur-3xl opacity-40" />
          <div className="flex flex-col items-center gap-6 relative">
            <div className="flex items-center gap-4 text-ucao-red-200 text-sm font-semibold tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-ucao-red-400" />
              Soirée Cinéma
              <span className="w-10 h-px bg-ucao-red-400" />
            </div>

            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <img
                  src={logo}
                  alt="Logo UCAO"
                  className="w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(30,58,95,0.5)]"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight animate-slideInUp drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] relative">
                Explosion de joie samedi 22h00 - 23h45
              </h1>
            </div>

            <p className="text-white/80 text-lg max-w-2xl">
              Popcorn croustillants, jus frais et ambiance cinéma. La présence de tous les
              résidents est exigée (sauf empêchement majeur).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left flex items-start gap-3 shadow-lg shadow-black/20">
                <Clock className="w-6 h-6 text-ucao-red-300" />
                <div>
                  <p className="text-xs uppercase text-white/60 tracking-[0.2em]">Horaire</p>
                  <p className="text-lg font-semibold">Samedi 22h - 23h45</p>
                </div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left flex items-start gap-3 shadow-lg shadow-black/20">
                <Popcorn className="w-6 h-6 text-ucao-red-300" />
                <div>
                  <p className="text-xs uppercase text-white/60 tracking-[0.2em]">Snacks</p>
                  <p className="text-lg font-semibold">Popcorn & Jus offerts</p>
                </div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left flex items-start gap-3 shadow-lg shadow-black/20">
                <Film className="w-6 h-6 text-ucao-red-300" />
                <div>
                  <p className="text-xs uppercase text-white/60 tracking-[0.2em]">Dress code</p>
                  <p className="text-lg font-semibold">Ambiance chic & cosy</p>
                </div>
              </div>
            </div>

            {showDetails && (
              <div className="space-y-4 w-full animate-fadeIn">
                <p className="text-sm text-white/70 uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                  <span className="w-10 h-px bg-white/50" />
                  Préparez-vous à vibrer !
                  <span className="w-10 h-px bg-white/50" />
                </p>
                <button
                  onClick={onContinue}
                  className="px-12 py-4 bg-gradient-to-r from-ucao-blue-600 via-ucao-red-500 to-ucao-blue-600 text-white rounded-full font-semibold text-lg tracking-wide shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Suivant → Formulaire</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

