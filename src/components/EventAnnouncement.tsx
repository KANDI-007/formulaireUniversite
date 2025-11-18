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
    <div className="min-h-screen bg-gradient-to-br from-ucao-blue-50 via-white to-ucao-red-50 text-gray-900 relative overflow-hidden font-display">
      {/* arrière-plan */}
      <div className="absolute inset-0">
        <img
          src={imageCine}
          alt="Soirée cinéma"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,58,95,0.1),_transparent_55%)]" />
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-6 sm:py-10 text-center">
        <div className="mb-6 sm:mb-10 animate-scaleIn">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 bg-gradient-to-r from-ucao-blue-100 to-ucao-red-100 border-2 border-ucao-blue-300 rounded-full uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs font-semibold shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-ucao-red-500 animate-pulse" />
            <span className="text-xs sm:text-sm">Événement phare</span>
          </div>
        </div>

        {/* Bandeau style cinéma */}
        <div className="w-full max-w-4xl mb-6 sm:mb-8 animate-slideInUp">
          <div className="relative py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-ucao-red-500 via-ucao-red-400 to-ucao-blue-500 rounded-full shadow-2xl border-2 border-ucao-blue-300">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] text-white font-semibold">
              <span className="flex items-center gap-1 sm:gap-2">
                <Megaphone className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Breaking News</span><span className="sm:hidden">News</span>
              </span>
              <span className="hidden sm:block w-10 h-0.5 bg-white/80" />
              <span className="text-xs sm:text-sm">Soirée cinéma</span>
              <span className="hidden sm:block w-10 h-0.5 bg-white/80" />
              <span className="text-xs sm:text-sm">UCAO</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-xl border-2 border-ucao-blue-200 rounded-3xl sm:rounded-[40px] p-4 sm:p-6 md:p-12 shadow-2xl animate-fadeIn relative overflow-hidden">
          <div className="absolute -top-24 -left-12 w-40 h-40 bg-ucao-red-200 blur-3xl opacity-30" />
          <div className="absolute -bottom-16 -right-10 w-52 h-52 bg-ucao-blue-200 blur-3xl opacity-30" />
          <div className="flex flex-col items-center gap-4 sm:gap-6 relative">
            <div className="flex items-center gap-2 sm:gap-4 text-ucao-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <span className="w-6 sm:w-10 h-px bg-ucao-red-400" />
              Soirée Cinéma
              <span className="w-6 sm:w-10 h-px bg-ucao-red-400" />
            </div>

            <div className="relative w-full flex items-center justify-center px-2">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <img
                  src={logo}
                  alt="Logo UCAO"
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-ucao-blue-900 leading-tight animate-slideInUp relative px-2">
                Explosion de joie samedi 22h00 - 23h45
              </h1>
            </div>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl px-2">
              Popcorn croustillants, jus frais et ambiance cinéma. La présence de tous les
              résidents est exigée (sauf empêchement majeur).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              <div className="bg-gradient-to-br from-ucao-blue-50 to-ucao-blue-100 border-2 border-ucao-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 shadow-md">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-ucao-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase text-ucao-blue-700 tracking-[0.2em] font-semibold">Horaire</p>
                  <p className="text-base sm:text-lg font-bold text-ucao-blue-900 mt-1">Samedi 22h - 23h45</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-ucao-red-50 to-ucao-red-100 border-2 border-ucao-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 shadow-md">
                <Popcorn className="w-5 h-5 sm:w-6 sm:h-6 text-ucao-red-600 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase text-ucao-red-700 tracking-[0.2em] font-semibold">Snacks</p>
                  <p className="text-base sm:text-lg font-bold text-ucao-red-900 mt-1">Popcorn & Jus offerts</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-ucao-blue-50 via-ucao-red-50 to-ucao-blue-50 border-2 border-ucao-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 shadow-md">
                <Film className="w-5 h-5 sm:w-6 sm:h-6 text-ucao-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase text-ucao-blue-700 tracking-[0.2em] font-semibold">Dress code</p>
                  <p className="text-base sm:text-lg font-bold text-ucao-blue-900 mt-1">Ambiance chic & cosy</p>
                </div>
              </div>
            </div>

            {showDetails && (
              <div className="space-y-4 w-full animate-fadeIn px-2">
                <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-[0.3em] sm:tracking-[0.4em] flex items-center justify-center gap-2">
                  <span className="w-6 sm:w-10 h-px bg-ucao-blue-300" />
                  Préparez-vous à vibrer !
                  <span className="w-6 sm:w-10 h-px bg-ucao-blue-300" />
                </p>
                <button
                  onClick={onContinue}
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-ucao-blue-600 via-ucao-red-500 to-ucao-blue-600 text-white rounded-full font-semibold text-base sm:text-lg tracking-wide shadow-xl hover:scale-105 transition-all duration-300 border-2 border-ucao-blue-400 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Retour à l'accueil</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

