import { FormState } from '../types/forms';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface SummaryPreviewProps {
  formData: FormState;
  onEdit: (step: number) => void;
}

export default function SummaryPreview({ formData, onEdit }: SummaryPreviewProps) {
  const selectedPrograms = Object.entries(formData.programChoices)
    .filter(([_, value]) => (value as any).selected)
    .map(([key]) => key);

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
            Informations Personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Nom:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Téléphone:</span> {formData.personalInfo.phone}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Email:</span> {formData.personalInfo.email}
              </p>
            </div>
            <div>
              <p className="text-ucao-blue-800">
                <span className="font-medium">Chambre:</span> {formData.personalInfo.roomNumber}
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

        <div className="bg-gradient-to-r from-ucao-red-50 to-ucao-red-100 border-l-4 border-ucao-red-500 p-4 rounded-lg animate-slideInUp shadow-md" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-ucao-red-900 mb-3 flex items-center gap-2 font-display">
            <AlertCircle className="w-5 h-5 text-ucao-red-600" />
            Problèmes Signalés
          </h3>
          {formData.problems.length > 0 ? (
            <div className="space-y-2">
              {formData.problems.map((problem, index) => (
                <div key={index} className="text-sm">
                  <span className="inline-block px-2 py-1 bg-ucao-red-200 text-ucao-red-800 rounded text-xs font-semibold mr-2">
                    {problem.category}
                  </span>
                  <p className="text-ucao-red-800 mt-1">{problem.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ucao-red-700 text-sm italic">Aucun problème signalé</p>
          )}
          <button
            onClick={() => onEdit(1)}
            className="mt-3 text-ucao-red-600 hover:text-ucao-red-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            ✎ Modifier
          </button>
        </div>

        <div className="bg-gradient-to-r from-ucao-blue-50 via-ucao-red-50 to-ucao-blue-50 border-l-4 border-ucao-blue-500 p-4 rounded-lg animate-slideInUp shadow-md" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-ucao-blue-900 mb-3 flex items-center gap-2 font-display">
            <CheckCircle className="w-5 h-5 text-ucao-blue-600" />
            Programmes Sélectionnés
          </h3>
          {selectedPrograms.length > 0 ? (
            <div className="space-y-2">
              {selectedPrograms.includes('footing') && (
                  <p className="text-ucao-blue-800 text-sm">
                  ✓ <span className="font-medium">Footing</span> {formData.programChoices.footing.canHelp && '(Aide à l\'organisation)'}
                </p>
              )}
              {selectedPrograms.includes('innovation') && (
                  <p className="text-ucao-blue-800 text-sm">
                  ✓ <span className="font-medium">Internal Innovation</span> {formData.programChoices.innovation.level && `(${formData.programChoices.innovation.level})`}
                </p>
              )}
              {selectedPrograms.includes('hygiene') && (
                  <p className="text-ucao-blue-800 text-sm">
                  ✓ <span className="font-medium">Clean Week-end</span> {formData.programChoices.hygiene.isTeamLeader && '(Responsable d\'équipe)'}
                </p>
              )}
            </div>
          ) : (
            <p className="text-ucao-blue-700 text-sm italic">Aucun programme sélectionné</p>
          )}
          <button
            onClick={() => onEdit(2)}
            className="mt-3 text-ucao-blue-600 hover:text-ucao-blue-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            ✎ Modifier
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-ucao-blue-100 via-ucao-red-100 to-ucao-blue-100 border-2 border-ucao-blue-300 p-4 rounded-lg animate-slideInUp shadow-lg">
        <p className="text-sm text-ucao-blue-900 font-medium">
          ✓ Tous vos informations sont correctes. Cliquez sur "Soumettre" pour envoyer votre candidature.
        </p>
      </div>
    </div>
  );
}
