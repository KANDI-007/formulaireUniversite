import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Search, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import logo from '../image/logo.png';

interface ParticipantRow {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  institut_id: number | null;
  chanson_titre: string;
  chanson_artiste: string;
  theme_id: number | null;
  type_chanson: 'solo' | 'duo';
  nom_partenaire: string | null;
  niveau_confiance: string;
  horaire_preference: string | null;
  message: string | null;
  numero_passage: number | null;
  est_present: boolean | null;
  date_inscription: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = async () => {
    if (!supabase) {
      setError("Supabase n'est pas configuré");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('participants')
        .select('*')
        .order('date_inscription', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setParticipants(data || []);
    } catch (err: any) {
      setError(err.message ?? 'Erreur lors du chargement des participants');
    } finally {
      setLoading(false);
    }
  };

  const togglePresence = async (id: number, current: boolean | null) => {
    if (!supabase) return;
    try {
      const { error: supabaseError } = await supabase
        .from('participants')
        .update({ est_present: !current })
        .eq('id', id);
      if (supabaseError) throw supabaseError;
      setParticipants((prev) =>
        prev.map((p) => (p.id === id ? { ...p, est_present: !current } : p)),
      );
    } catch {
      // on ignore en UI pour rester simple
    }
  };

  useEffect(() => {
    void fetchParticipants();
  }, []);

  const filtered = participants.filter((p) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      p.nom.toLowerCase().includes(q) ||
      p.prenom.toLowerCase().includes(q) ||
      p.telephone.toLowerCase().includes(q) ||
      p.chanson_titre.toLowerCase().includes(q) ||
      p.chanson_artiste.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-ucao-blue-50 via-white to-ucao-red-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo UCAO"
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display text-ucao-blue-800">
                Dashboard Karaoké UCAO
              </h1>
              <p className="text-sm text-gray-600">
                Vue administrateur – inscriptions des étudiants.
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => void fetchParticipants()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-sm font-medium border border-ucao-blue-200 text-ucao-blue-800 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ucao-red-600 hover:bg-ucao-red-700 text-sm font-medium text-white shadow-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher (nom, téléphone, chanson...)"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ucao-blue-500"
            />
          </div>
          <span className="text-xs text-gray-500">
            {filtered.length} participant(s)
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-300 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Vue cartes mobile */}
        <div className="space-y-3 md:hidden">
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500 shadow-sm">
              Chargement des participants...
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500 shadow-sm">
              Aucun participant trouvé.
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-md"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ucao-blue-500">
                      #{p.numero_passage ?? '—'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {p.prenom} {p.nom}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {p.telephone}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      void togglePresence(p.id, p.est_present ?? false)
                    }
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] ${
                      p.est_present
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {p.est_present ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Présent
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Absent
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 text-xs">
                  <div className="text-gray-900">
                    {p.chanson_titre}
                  </div>
                  <div className="text-gray-500">
                    {p.chanson_artiste}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                  <span>
                    {p.type_chanson === 'solo' ? '🎤 Solo' : '👥 Duo'}
                    {p.nom_partenaire ? ` • ${p.nom_partenaire}` : ''}
                  </span>
                  <span>{p.niveau_confiance}</span>
                </div>

                <div className="mt-2 text-[10px] text-gray-400">
                  Inscrit le {new Date(p.date_inscription).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Vue tableau desktop */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-ucao-blue-50">
              <tr className="text-left text-ucao-blue-900">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Nom</th>
                <th className="px-3 py-2">Téléphone</th>
                <th className="px-3 py-2">Chanson</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Confiance</th>
                <th className="px-3 py-2">Présent</th>
                <th className="px-3 py-2">Inscription</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-10 text-center text-gray-500"
                  >
                    Chargement des participants...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-10 text-center text-gray-500"
                  >
                    Aucun participant trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-100 hover:bg-ucao-blue-50/40"
                  >
                    <td className="px-3 py-2 text-gray-500 text-xs">
                      {p.numero_passage ?? '—'}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-semibold text-gray-900">
                        {p.prenom} {p.nom}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.email || 'Pas d’email'}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      {p.telephone}
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-gray-900 text-sm">
                        {p.chanson_titre}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.chanson_artiste}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      {p.type_chanson === 'solo' ? '🎤 Solo' : '👥 Duo'}
                      {p.nom_partenaire
                        ? ` (${p.nom_partenaire})`
                        : null}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      {p.niveau_confiance}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() =>
                          void togglePresence(p.id, p.est_present ?? false)
                        }
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          p.est_present
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {p.est_present ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            Présent
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Absent
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-gray-500">
                      {new Date(p.date_inscription).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


