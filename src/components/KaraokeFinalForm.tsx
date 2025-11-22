import { MessageSquare, Clock3, Info } from 'lucide-react';
import { FinalInfo } from '../types/forms';

interface KaraokeFinalFormProps {
  data: FinalInfo;
  onChange: (data: FinalInfo) => void;
}

export default function KaraokeFinalForm({ data, onChange }: KaraokeFinalFormProps) {
  const handleChange = (field: keyof FinalInfo, value: string | boolean) => {
    onChange({ ...data, [field]: value } as FinalInfo);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInRight">
        <h2 className="text-3xl font-bold mb-2 font-display">
          <span className="text-ucao-blue-700">Finalise</span>{' '}
          <span className="text-ucao-red-700">ton inscription</span>
        </h2>
        <p className="text-gray-600 font-medium">
          Choisis ton créneau préféré et ajoute une dédicace si tu le souhaites.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="flex items-center text-sm font-semibold text-gray-800 mb-2">
            <Clock3 className="w-4 h-4 mr-2 text-ucao-blue-600" />
            Horaire préféré (optionnel)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => handleChange('preferredSlot', 'debut')}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                data.preferredSlot === 'debut'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              🌅 Début de soirée
              <br />
              <span className="text-[10px] text-gray-600">18h-20h</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange('preferredSlot', 'milieu')}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                data.preferredSlot === 'milieu'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              🌃 Milieu
              <br />
              <span className="text-[10px] text-gray-600">20h-22h</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange('preferredSlot', 'fin')}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                data.preferredSlot === 'fin'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              🌙 Fin de soirée
              <br />
              <span className="text-[10px] text-gray-600">22h-minuit</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange('preferredSlot', 'peu_importe')}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                data.preferredSlot === 'peu_importe'
                  ? 'border-ucao-blue-500 bg-ucao-blue-50 text-ucao-blue-900'
                  : 'border-gray-200 hover:border-ucao-blue-300 text-gray-800'
              }`}
            >
              🤷 Peu importe
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
            <MessageSquare className="w-4 h-4 mr-2 text-ucao-blue-600" />
            Message / Dédicace (optionnel)
          </label>
          <textarea
            value={data.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            className="input-field resize-none border-gray-300 focus:border-ucao-blue-500"
            placeholder="Dédicace, occasion spéciale, message au public..."
          />
        </div>

        <div className="flex items-start gap-3 bg-ucao-blue-50 border-2 border-ucao-blue-200 rounded-lg p-4">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={data.acceptTerms}
            onChange={(e) => handleChange('acceptTerms', e.target.checked)}
            className="mt-1 w-4 h-4 rounded accent-ucao-blue-600"
          />
          <div>
            <label htmlFor="acceptTerms" className="text-sm font-semibold text-ucao-blue-900 flex items-center gap-1">
              <Info className="w-4 h-4 text-ucao-blue-600" />
              J'accepte les conditions de participation
            </label>
            <p className="text-xs text-ucao-blue-800 mt-1">
              Respect du temps de passage, du matériel et des autres participants. La programmation
              finale des passages reste à la discrétion de l&apos;organisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


