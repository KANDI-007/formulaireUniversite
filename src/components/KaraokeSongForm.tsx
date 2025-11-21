import { Music2, User2 } from 'lucide-react';
import { SongInfo } from '../types/forms';

import img80s from '../image/imageTheme/annee 80.jpeg';
import imgAfro from '../image/imageTheme/Afro vibes.jpeg';
import imgComedie from '../image/imageTheme/comédi musical.jpeg';
import imgGospel from '../image/imageTheme/gospel.jpeg';
import imgHits from '../image/imageTheme/hit du moment.jpeg';
import imgClassique from '../image/imageTheme/classique.jpeg';

interface KaraokeSongFormProps {
  data: SongInfo;
  onChange: (data: SongInfo) => void;
}

export default function KaraokeSongForm({ data, onChange }: KaraokeSongFormProps) {
  const handleChange = (field: keyof SongInfo, value: string | number | null) => {
    onChange({ ...data, [field]: value } as SongInfo);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInRight">
        <h2 className="text-3xl font-bold mb-2 font-display">
          <span className="text-ucao-blue-700">Choix</span>{' '}
          <span className="text-ucao-red-700">musical</span>
        </h2>
        <p className="text-gray-600 font-medium">
          Indique la chanson que tu souhaites interpréter pendant le Karaoké UCAO.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
            <Music2 className="w-4 h-4 mr-2 text-ucao-blue-600" />
            Titre de la chanson <span className="text-ucao-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input-field border-gray-300 focus:border-ucao-blue-500"
            placeholder="Ex: Shape of You"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
            <User2 className="w-4 h-4 mr-2 text-ucao-blue-600" />
            Artiste <span className="text-ucao-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={data.artist}
            onChange={(e) => handleChange('artist', e.target.value)}
            className="input-field border-gray-300 focus:border-ucao-blue-500"
            placeholder="Ex: Ed Sheeran"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Thème musical <span className="text-ucao-red-500 ml-1">*</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 1, label: 'Années 80/90/2000', emoji: '🎸', image: img80s },
              { id: 2, label: 'Afro Vibes', emoji: '🌍', image: imgAfro },
              { id: 3, label: 'Comédie Musicale', emoji: '🎭', image: imgComedie },
              { id: 4, label: 'Gospel/Louange', emoji: '🙏', image: imgGospel },
              { id: 5, label: 'Hits du moment', emoji: '🔥', image: imgHits },
              { id: 6, label: 'Classiques intemporels', emoji: '🎹', image: imgClassique },
            ].map((theme) => {
              const isActive = data.themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleChange('themeId', theme.id)}
                  className={`relative rounded-2xl overflow-hidden text-left group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ucao-blue-500 ${
                    isActive
                      ? 'ring-2 ring-ucao-blue-500 scale-[1.01] shadow-2xl'
                      : 'shadow-md hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={theme.image}
                      alt={theme.label}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="relative p-4 flex flex-col justify-between h-full min-h-[120px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-lg">
                        {theme.emoji}{' '}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase tracking-[0.25em] text-yellow-300">
                          choisi
                        </span>
                      )}
                    </div>
                    <p className="text-white font-semibold text-sm drop-shadow-md">
                      {theme.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">Type de performance</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange('performanceType', 'solo')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
                data.performanceType === 'solo'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              🎤 Solo
            </button>
            <button
              type="button"
              onClick={() => handleChange('performanceType', 'duo')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
                data.performanceType === 'duo'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              👥 Duo
            </button>
          </div>
        </div>

        {data.performanceType === 'duo' && (
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
              <User2 className="w-4 h-4 mr-2 text-ucao-blue-600" />
              Nom du partenaire
            </label>
            <input
              type="text"
              value={data.partnerName}
              onChange={(e) => handleChange('partnerName', e.target.value)}
              className="input-field border-gray-300 focus:border-ucao-blue-500"
              placeholder="Nom et prénom de ton partenaire"
            />
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">Niveau de confiance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'Débutant timide', label: '😰 Débutant timide' },
              { value: 'Amateur motivé', label: '😊 Amateur motivé' },
              { value: 'Confirmé', label: '😎 Confirmé' },
              { value: 'Pro du micro', label: '🌟 Pro du micro' },
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleChange('confidenceLevel', level.value)}
                className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                  data.confidenceLevel === level.value
                    ? 'border-ucao-red-500 bg-ucao-red-50 text-ucao-red-900'
                    : 'border-gray-200 hover:border-ucao-red-300 text-gray-800'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


