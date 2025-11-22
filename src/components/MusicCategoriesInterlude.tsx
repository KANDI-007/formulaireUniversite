import { useEffect, useState } from 'react';
import { Music2, Sparkles, ChevronRight } from 'lucide-react';

import img50cent from '../image/imageStar/50cent.jpeg';
import imgBeyonce from '../image/imageStar/beyonce.jpeg';
import imgDavido from '../image/imageStar/Davido.jpeg';
import imgDidi from '../image/imageStar/Didi.jpeg';
import imgDnd from '../image/imageStar/DND.jpeg';
import imgFally from '../image/imageStar/Fally Ipupa.jpeg';
import imgHimra from '../image/imageStar/HIMRA.jpeg';
import imgOmah from '../image/imageStar/Omah Lay.jpeg';
import imgRihanna from '../image/imageStar/rihanna.jpeg';

interface MusicCategoriesInterludeProps {
  onCategorySelect: (category: string) => void;
  onSkip: () => void;
}

const CATEGORIES = [
  { name: 'Pop', emoji: '🎵', color: 'from-pink-500 to-rose-500', image: imgBeyonce },
  { name: 'R & B', emoji: '🎤', color: 'from-purple-500 to-indigo-500', image: imgRihanna },
  { name: 'K-pop', emoji: '✨', color: 'from-cyan-500 to-blue-500', image: imgDidi },
  { name: 'Rock', emoji: '🎸', color: 'from-red-500 to-orange-500', image: img50cent },
  { name: 'Disco', emoji: '💃', color: 'from-yellow-500 to-orange-500', image: imgHimra },
  { name: 'Afro beats', emoji: '🌍', color: 'from-green-500 to-teal-500', image: imgDavido },
];

export default function MusicCategoriesInterlude({
  onCategorySelect,
  onSkip,
}: MusicCategoriesInterludeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showImageTransition, setShowImageTransition] = useState(false);
  const [transitionImage, setTransitionImage] = useState<string | null>(null);
  const [transitionName, setTransitionName] = useState<string | null>(null);

  const handleCategoryClick = (category: { name: string; image: string }) => {
    setSelectedCategory(category.name);
    setTransitionImage(category.image);
    setTransitionName(category.name);
    setShowImageTransition(true);
    
    // Afficher l'image pendant 2.5 secondes avec animation, puis passer à la page suivante
    setTimeout(() => {
      setShowImageTransition(false);
      setTimeout(() => {
        onCategorySelect(category.name);
      }, 500); // Délai pour la sortie de l'animation
    }, 2500);
  };

  return (
    <>
      {/* Écran de transition avec image */}
      {showImageTransition && transitionImage && transitionName && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-purple-900 to-black text-white flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={transitionImage}
              alt={transitionName}
              className="absolute inset-0 w-full h-full object-cover opacity-60 animate-scaleIn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>
          
          <div className="relative z-10 text-center px-4 animate-fadeInUp">
            <div className="mb-6 animate-pulse-slow">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-yellow-300 mx-auto mb-4" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-4 drop-shadow-2xl animate-slideInUp">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                {transitionName}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium animate-fadeIn delay-300">
              Ta vibe a été choisie !
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 animate-fadeIn delay-500">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Écran principal des catégories */}
      {!showImageTransition && (
        <div
          className={`fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col transition-all duration-700 ${
            selectedCategory ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <div className="px-4 pt-6 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                Choisis ta vibe
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
              <Music2 className="w-4 h-4" />
              <span>Quelle musique t'inspire ?</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 pb-24">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-8 animate-fadeInUp">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-3 drop-shadow-lg">
                  Quelle musique
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                    t'inspire ?
                  </span>
                </h2>
                <p className="text-white/70 text-sm md:text-base">
                  Sélectionne une catégorie pour continuer
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {CATEGORIES.map((category, index) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category)}
                    className={`group relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-br ${category.color} transform transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-fadeInUp border-2 border-white/20 hover:border-white/40 ${
                      selectedCategory === category.name ? 'scale-110 ring-4 ring-yellow-300' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <div className="text-5xl md:text-6xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                        {category.emoji}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold font-display drop-shadow-lg mb-2">
                        {category.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 pb-6 pt-4 px-4 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex justify-center">
            <button
              onClick={onSkip}
              className="px-6 py-2 rounded-full bg-white/10 border border-white/40 backdrop-blur-md text-sm font-semibold flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
            >
              <span>Passer cette étape</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

