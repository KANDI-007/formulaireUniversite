import { useState, useEffect } from 'react';
import logo from '../image/logo.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animation de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Animation de la porte qui s'ouvre
    const doorTimer = setTimeout(() => {
      setDoorOpen(true);
    }, 1500);

    // Afficher le contenu après l'ouverture de la porte
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // Terminer le chargement
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(doorTimer);
      clearTimeout(contentTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Porte gauche */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ucao-blue-900 to-ucao-blue-800 transition-transform duration-1000 ease-in-out ${
          doorOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: doorOpen ? 'none' : 'inset -10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-ucao-red-900 rounded-l-full opacity-50"></div>
      </div>

      {/* Porte droite */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ucao-red-900 to-ucao-red-800 transition-transform duration-1000 ease-in-out ${
          doorOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: doorOpen ? 'none' : 'inset 10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-ucao-blue-900 rounded-r-full opacity-50"></div>
      </div>

      {/* Contenu central */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-1000 ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 animate-pulse-slow">
          <img
            src={logo}
            alt="UCAO Logo"
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-float"
          />
        </div>

        {/* Titre */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif animate-fadeInUp">
          <span className="text-ucao-blue-300">Université</span>{' '}
          <span className="text-ucao-red-300">Catholique</span>
        </h1>

        {/* Barre de progression */}
        <div className="w-80 md:w-96 h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-ucao-blue-500 via-ucao-red-500 to-ucao-blue-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>

        {/* Texte de chargement */}
        <p className="text-white/80 text-lg font-medium animate-pulse">
          {progress < 50 ? 'Ouverture des portes...' : progress < 80 ? 'Bienvenue...' : 'Presque prêt...'}
        </p>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

