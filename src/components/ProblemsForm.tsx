import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Problem } from '../types/forms';
import { useState } from 'react';

interface ProblemsFormProps {
  problems: Problem[];
  onChange: (problems: Problem[]) => void;
}

const CATEGORIES = [
  { label: 'Électricité', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Plomberie', color: 'bg-blue-100 text-blue-800' },
  { label: 'Hygiène', color: 'bg-purple-100 text-purple-800' },
  { label: 'Sécurité', color: 'bg-red-100 text-red-800' },
  { label: 'Autre', color: 'bg-gray-100 text-gray-800' },
];

export default function ProblemsForm({ problems, onChange }: ProblemsFormProps) {
  const [currentProblem, setCurrentProblem] = useState<Problem>({
    category: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);

  const addProblem = () => {
    if (currentProblem.category && currentProblem.description.trim()) {
      onChange([...problems, currentProblem]);
      setCurrentProblem({ category: '', description: '' });
      setShowForm(false);
    }
  };

  const removeProblem = (index: number) => {
    onChange(problems.filter((_, i) => i !== index));
  };

  const getCategoryColor = (category: string) => {
    return CATEGORIES.find((c) => c.label === category)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInRight">
        <h2 className="text-3xl font-bold mb-2 font-display">
          <span className="text-ucao-blue-700">Signaler un</span>{' '}
          <span className="text-ucao-red-700">Problème</span>
        </h2>
        <p className="text-gray-600 font-medium">Décrivez les problèmes rencontrés depuis le début de l'année</p>
      </div>

      <div className="bg-gradient-to-r from-ucao-red-50 to-ucao-blue-50 border-l-4 border-ucao-red-500 p-4 rounded-lg animate-slideInUp shadow-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-ucao-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-ucao-red-900">Votre avis compte !</p>
            <p className="text-sm text-ucao-red-800 mt-1">
              Signalez tout problème : eau, électricité, hygiène, sécurité, matériel...
            </p>
          </div>
        </div>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-4 border-2 border-ucao-blue-300 text-ucao-blue-600 rounded-lg font-semibold hover:bg-ucao-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md animate-slideInUp"
        >
          <Plus className="w-5 h-5" />
          Ajouter un problème
        </button>
      ) : (
        <div className="bg-white border-2 border-ucao-blue-300 rounded-lg p-6 space-y-4 animate-scaleIn shadow-lg">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Catégorie <span className="text-ucao-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setCurrentProblem({ ...currentProblem, category: cat.label })}
                  className={`px-4 py-2 rounded-lg font-medium transition border-2 ${
                    currentProblem.category === cat.label
                      ? `${cat.color} border-current`
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description <span className="text-ucao-red-500">*</span>
            </label>
            <textarea
              value={currentProblem.description}
              onChange={(e) =>
                setCurrentProblem({ ...currentProblem, description: e.target.value })
              }
              rows={4}
              maxLength={500}
              className="input-field resize-none"
              placeholder="Décrivez le problème en détail..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {currentProblem.description.length}/500 caractères
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={addProblem}
              disabled={!currentProblem.category || !currentProblem.description.trim()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-ucao-blue-600 to-ucao-blue-700 text-white rounded-lg font-semibold hover:from-ucao-blue-700 hover:to-ucao-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {problems.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">
            Problèmes signalés ({problems.length})
          </h3>
          {problems.map((problem, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4 flex justify-between items-start animate-slideInRight hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(problem.category)} mb-2`}>
                  {problem.category}
                </span>
                <p className="text-gray-700">{problem.description}</p>
              </div>
              <button
                onClick={() => removeProblem(index)}
                className="ml-4 p-2 text-ucao-red-500 hover:bg-ucao-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {problems.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p className="font-medium">Aucun problème signalé</p>
          <p className="text-sm mt-1">Cliquez sur "Ajouter un problème" pour commencer</p>
        </div>
      )}
    </div>
  );
}
