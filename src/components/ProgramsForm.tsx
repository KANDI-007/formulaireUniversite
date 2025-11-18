import { Activity, Lightbulb, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgramChoice } from '../types/forms';
import { useState } from 'react';

// Import des images
import sportImage1 from '../image/imageSport1.jpeg';
import sportImage2 from '../image/imageSport2.jpeg';
import innovationImage1 from '../image/Internal InnovationIMAGE1.jpeg';
import innovationImage2 from '../image/Internal InnovationIMAGE2.jpeg';
import cleanImage1 from '../image/Clean Week-endImage1.jpeg';
import cleanImage2 from '../image/Clean Week-endImage2.jpeg';

interface ProgramsFormProps {
  data: ProgramChoice;
  onChange: (data: ProgramChoice) => void;
}

export default function ProgramsForm({ data, onChange }: ProgramsFormProps) {
  const [sportImageIndex, setSportImageIndex] = useState(0);
  const [innovationImageIndex, setInnovationImageIndex] = useState(0);
  const [cleanImageIndex, setCleanImageIndex] = useState(0);

  const sportImages = [sportImage1, sportImage2];
  const innovationImages = [innovationImage1, innovationImage2];
  const cleanImages = [cleanImage1, cleanImage2];

  const handleFootingChange = (selected: boolean) => {
    onChange({
      ...data,
      footing: { ...data.footing, selected },
    });
  };

  const handleFootingHelp = (canHelp: boolean) => {
    onChange({
      ...data,
      footing: { ...data.footing, canHelp },
    });
  };

  const handleInnovationChange = (selected: boolean) => {
    onChange({
      ...data,
      innovation: { ...data.innovation, selected },
    });
  };

  const handleInnovationLevel = (level: string) => {
    onChange({
      ...data,
      innovation: { ...data.innovation, level },
    });
  };

  const handleHygieneChange = (selected: boolean) => {
    onChange({
      ...data,
      hygiene: { ...data.hygiene, selected },
    });
  };

  const handleTeamLeader = (isTeamLeader: boolean) => {
    onChange({
      ...data,
      hygiene: { ...data.hygiene, isTeamLeader },
    });
  };

  const nextImage = (setter: (val: number) => void, max: number, current: number) => {
    setter((current + 1) % max);
  };

  const prevImage = (setter: (val: number) => void, max: number, current: number) => {
    setter((current - 1 + max) % max);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInRight">
        <h2 className="text-3xl font-bold mb-2 font-display">
          <span className="text-ucao-blue-700">Programmes de la</span>{' '}
          <span className="text-ucao-red-700">Semaine</span>
        </h2>
        <p className="text-gray-600 font-medium">Rejoignez les activités qui vous intéressent</p>
      </div>

      <div className="space-y-6">
        {/* Programme Footing */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp card">
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <img
              src={sportImages[sportImageIndex]}
              alt="Séance de Footing"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ucao-red-900/90 via-ucao-red-800/70 to-transparent"></div>
            
            {/* Navigation des images */}
            {sportImages.length > 1 && (
              <>
                <button
                  onClick={() => prevImage(setSportImageIndex, sportImages.length, sportImageIndex)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => nextImage(setSportImageIndex, sportImages.length, sportImageIndex)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {sportImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSportImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === sportImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Contenu overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <Activity className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold font-display mb-1">Séance de Footing</h3>
                  <p className="text-white/90 text-sm font-medium">Vendredi • 17h45-18h45 • 1h de sport</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Encadrement par un expert</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Eau gratuite fournie</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Rafraîchissements (100 FCFA)</span>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-ucao-red-50 to-ucao-red-100 p-4 rounded-lg hover:from-ucao-red-100 hover:to-ucao-red-200 transition-all duration-300 border-2 border-ucao-red-200">
              <input
                type="checkbox"
                checked={data.footing.selected}
                onChange={(e) => handleFootingChange(e.target.checked)}
                className="w-5 h-5 rounded accent-ucao-red-600"
              />
              <span className="font-semibold text-ucao-red-900">Je veux m'inscrire</span>
            </label>

            {data.footing.selected && (
              <div className="mt-4 space-y-3 animate-slideInUp">
                <label className="flex items-center gap-3 cursor-pointer bg-ucao-red-50 p-4 rounded-lg border-2 border-ucao-red-200 hover:bg-ucao-red-100 transition-all">
                  <input
                    type="checkbox"
                    checked={data.footing.canHelp}
                    onChange={(e) => handleFootingHelp(e.target.checked)}
                    className="w-4 h-4 rounded accent-ucao-red-600"
                  />
                  <span className="text-sm font-medium text-ucao-red-900">
                    Je peux aider à l'organisation (photos, accompagnement...)
                  </span>
                </label>
                <div className="bg-gradient-to-r from-ucao-red-100 to-ucao-red-200 text-ucao-red-900 text-sm p-4 rounded-lg border-l-4 border-ucao-red-500">
                  💰 Contribution de 100 FCFA à prévoir
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Programme Internal Innovation */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp card" style={{ animationDelay: '0.1s' }}>
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <img
              src={innovationImages[innovationImageIndex]}
              alt="Internal Innovation"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ucao-blue-900/90 via-ucao-blue-800/70 to-transparent"></div>
            
            {/* Navigation des images */}
            {innovationImages.length > 1 && (
              <>
                <button
                  onClick={() => prevImage(setInnovationImageIndex, innovationImages.length, innovationImageIndex)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => nextImage(setInnovationImageIndex, innovationImages.length, innovationImageIndex)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {innovationImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInnovationImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === innovationImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Contenu overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <Lightbulb className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold font-display mb-1">Internal Innovation</h3>
                  <p className="text-white/90 text-sm font-medium">Développe l'app de la cité</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-blue-500 flex-shrink-0" />
                <span className="font-medium">Direction d'un développeur expert</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-blue-500 flex-shrink-0" />
                <span className="font-medium">Tous niveaux acceptés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-blue-500 flex-shrink-0" />
                <span className="font-medium">Toutes filières bienvenues</span>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-ucao-blue-50 to-ucao-blue-100 p-4 rounded-lg hover:from-ucao-blue-100 hover:to-ucao-blue-200 transition-all duration-300 border-2 border-ucao-blue-200">
              <input
                type="checkbox"
                checked={data.innovation.selected}
                onChange={(e) => handleInnovationChange(e.target.checked)}
                className="w-5 h-5 rounded accent-ucao-blue-600"
              />
              <span className="font-semibold text-ucao-blue-900">Je veux participer</span>
            </label>

            {data.innovation.selected && (
              <div className="mt-4 space-y-4 animate-slideInUp">
                <div>
                  <label className="block text-sm font-semibold text-ucao-blue-900 mb-2 font-display">
                    Ton niveau en développement
                  </label>
                  <select
                    value={data.innovation.level || ''}
                    onChange={(e) => handleInnovationLevel(e.target.value)}
                    className="input-field border-ucao-blue-300 focus:border-ucao-blue-500"
                  >
                    <option value="">Sélectionne ton niveau</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
                <div className="bg-gradient-to-r from-ucao-blue-100 to-ucao-blue-200 text-ucao-blue-900 text-sm p-4 rounded-lg border-l-4 border-ucao-blue-500">
                  🚀 Tous les niveaux sont les bienvenus - Pas besoin d'être expert !
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Programme Clean Week-end */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp card" style={{ animationDelay: '0.2s' }}>
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <img
              src={cleanImages[cleanImageIndex]}
              alt="Clean Week-end"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ucao-red-900/90 via-ucao-blue-900/70 to-transparent"></div>
            
            {/* Navigation des images */}
            {cleanImages.length > 1 && (
              <>
                <button
                  onClick={() => prevImage(setCleanImageIndex, cleanImages.length, cleanImageIndex)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => nextImage(setCleanImageIndex, cleanImages.length, cleanImageIndex)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {cleanImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCleanImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === cleanImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Contenu overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold font-display mb-1">Clean Week-end</h3>
                  <p className="text-white/90 text-sm font-medium">Équipe Hygiène & Discipline</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Nettoyage et embellissement collectif</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Responsables de l'hygiène et discipline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ucao-red-500 flex-shrink-0" />
                <span className="font-medium">Impact positif sur notre cité</span>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-ucao-red-50 via-ucao-blue-50 to-ucao-red-50 p-4 rounded-lg hover:from-ucao-red-100 hover:via-ucao-blue-100 hover:to-ucao-red-100 transition-all duration-300 border-2 border-ucao-red-200">
              <input
                type="checkbox"
                checked={data.hygiene.selected}
                onChange={(e) => handleHygieneChange(e.target.checked)}
                className="w-5 h-5 rounded accent-ucao-red-600"
              />
              <span className="font-semibold text-ucao-red-900">Je rejoins l'équipe</span>
            </label>

            {data.hygiene.selected && (
              <div className="mt-4 space-y-3 animate-slideInUp">
                <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-ucao-red-50 to-ucao-blue-50 p-4 rounded-lg border-2 border-ucao-red-200 hover:from-ucao-red-100 hover:to-ucao-blue-100 transition-all">
                  <input
                    type="checkbox"
                    checked={data.hygiene.isTeamLeader}
                    onChange={(e) => handleTeamLeader(e.target.checked)}
                    className="w-4 h-4 rounded accent-ucao-red-600"
                  />
                  <span className="text-sm font-semibold text-ucao-red-900">
                    Je veux être responsable d'équipe
                  </span>
                </label>
                <div className="bg-gradient-to-r from-ucao-red-100 via-ucao-blue-100 to-ucao-red-100 text-ucao-red-900 text-sm p-4 rounded-lg border-l-4 border-ucao-red-500">
                  ✨ L'implication communautaire commence ici !
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-ucao-blue-50 to-ucao-red-50 border-l-4 border-ucao-blue-500 p-4 rounded-lg animate-slideInUp">
        <p className="text-sm text-ucao-blue-900 font-medium">
          <CheckCircle className="w-4 h-4 inline mr-2 text-ucao-blue-600" />
          Vous avez sélectionné <strong className="font-display">{Object.values(data).filter(p => p.selected).length} programme(s)</strong>
        </p>
      </div>
    </div>
  );
}
