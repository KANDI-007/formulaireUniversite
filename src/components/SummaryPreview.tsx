import { FormState } from '../types/forms';
import { CheckCircle } from 'lucide-react';

interface SummaryPreviewProps {
  formData: FormState;
  onEdit: (step: number) => void;
}

export default function SummaryPreview({ formData, onEdit }: SummaryPreviewProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInRight">
        <h2 className="text-3xl font-bold mb-2 font-display">
          <span className="text-ucao-blue-700">Résumé de votre</span>{' '}
          <span className="text-ucao-red-700">candidature</span>
        </h2>
        <p className="text-gray-600 font-medium">Vérifiez vos informations avant de soumettre</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-ucao-blue-50 to-ucao-blue-100 border-l-4 border-ucao-blue-500 p-4 rounded-lg animate-slideInUp shadow-md">
          <h3 className="font-semibold text-ucao-blue-900 mb-3 flex items-center gap-2 font-display">
            <CheckCircle className="w-5 h-5 text-ucao-blue-600" />
            Informations personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Nom:</span> {formData.personalInfo.firstName}{' '}
                {formData.personalInfo.lastName}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Téléphone:</span> {formData.personalInfo.phone}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Email:</span>{' '}
                {formData.personalInfo.email || 'Non renseigné'}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Institut:</span>{' '}
                {formData.personalInfo.institutId || 'Non renseigné'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onEdit(0)}
            className="mt-3 text-ucao-blue-600 hover:text-ucao-blue-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            ✎ Modifier
          </button>
        </div>

        <div className="bg-gradient-to-r from-ucao-blue-50 via-ucao-red-50 to-ucao-blue-50 border-l-4 border-ucao-blue-500 p-4 rounded-lg animate-slideInUp shadow-md" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-ucao-blue-900 mb-3 flex items-center gap-2 font-display">
            <CheckCircle className="w-5 h-5 text-ucao-blue-600" />
            Choix musical
          </h3>
          <div className="space-y-1 text-sm text-ucao-blue-800">
            <p>
              <span className="font-medium">Chanson:</span> {formData.songInfo.title} -{' '}
              {formData.songInfo.artist}
            </p>
            <p>
              <span className="font-medium">Type:</span>{' '}
              {formData.songInfo.performanceType === 'solo' ? '🎤 Solo' : '👥 Duo'}
              {formData.songInfo.performanceType === 'duo' && formData.songInfo.partnerName
                ? ` avec ${formData.songInfo.partnerName}`
                : ''}
            </p>
            <p>
              <span className="font-medium">Confiance:</span>{' '}
              {formData.songInfo.confidenceLevel}
            </p>
          </div>
          <button
            onClick={() => onEdit(1)}
            className="mt-3 text-ucao-blue-600 hover:text-ucao-blue-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            ✎ Modifier
          </button>
        </div>

        <div className="bg-gradient-to-r from-ucao-red-50 to-ucao-red-100 border-l-4 border-ucao-red-500 p-4 rounded-lg animate-slideInUp shadow-md" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold text-ucao-red-900 mb-3 flex items-center gap-2 font-display">
            <CheckCircle className="w-5 h-5 text-ucao-red-600" />
            Préférences & conditions
          </h3>
          <div className="space-y-1 text-sm text-ucao-red-800">
            <p>
              <span className="font-medium">Créneau préféré:</span>{' '}
              {formData.finalInfo.preferredSlot || 'Peu importe'}
            </p>
            <p>
              <span className="font-medium">Message / dédicace:</span>{' '}
              {formData.finalInfo.message || 'Aucune dédicace'}
            </p>
            <p>
              <span className="font-medium">Conditions:</span>{' '}
              {formData.finalInfo.acceptTerms
                ? '✅ Acceptées'
                : '❌ Non acceptées (obligatoire avant de soumettre)'}
            </p>
          </div>
          <button
            onClick={() => onEdit(2)}
            className="mt-3 text-ucao-red-600 hover:text-ucao-red-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            ✎ Modifier
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-ucao-blue-100 via-ucao-red-100 to-ucao-blue-100 border-2 border-ucao-blue-300 p-4 rounded-lg animate-slideInUp shadow-lg">
        <p className="text-sm text-ucao-blue-900 font-medium">
          ✓ Vérifie bien tes informations. Clique sur &quot;Soumettre&quot; pour confirmer ton
          inscription au Karaoké UCAO.
        </p>
      </div>
    </div>
  );
}
