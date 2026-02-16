import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Send, SaveIcon, CheckCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import StepIndicator from './components/StepIndicator';
import PersonalInfoForm from './components/PersonalInfoForm';
import KaraokeSongForm from './components/KaraokeSongForm';
import KaraokeFinalForm from './components/KaraokeFinalForm';
import SummaryPreview from './components/SummaryPreview';
import MusicCategoriesInterlude from './components/MusicCategoriesInterlude';
import LoadingScreen from './components/LoadingScreen';
import AdminDashboard from './components/AdminDashboard';
import { FormState } from './types/forms';
import { saveDraft, loadDraft, clearDraft, hasDraft } from './utils/localStorage';
import { supabase, isSupabaseConfigured } from './utils/supabaseClient';
import logo from './image/logo.png';
import stepImage1 from './image/Karaokeimage3.jpeg';
import stepImage2 from './image/Karaokeimage1.jpeg';
import stepImage3 from './image/Karaokeimage5.jpeg';
import stepImage4 from './image/Karaokeimage8.jpeg';
import bgLocal from './chansons/BabyDaiz_-_ALLONSY__Official_Video_(256k).mp3';

const initialState: FormState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    institutId: '',
  },
  songInfo: {
    searchQuery: '',
    title: '',
    artist: '',
    themeId: null,
    performanceType: 'solo',
    partnerName: '',
    confidenceLevel: 'Amateur motivé',
  },
  finalInfo: {
    preferredSlot: '',
    message: '',
    acceptTerms: false,
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDraftNotif, setShowDraftNotif] = useState(false);
  const [showArtistsInterlude, setShowArtistsInterlude] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  // Background music (use env var if set, otherwise fallback to local asset)
  const musicUrlEnv = import.meta.env.VITE_BACKGROUND_MUSIC_URL as string | undefined;
  const musicUrl = musicUrlEnv || bgLocal;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMutedMusic, setIsMutedMusic] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bg_music_muted');
      // default to false (try to play with sound). If blocked, we'll show prompt.
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  useEffect(() => {
    if (!musicUrl || !audioRef.current) return;
    audioRef.current.loop = true;
    // Try to play with sound enabled. Browsers may still block autoplay with audio.
    try {
      audioRef.current.muted = false;
    } catch {}
    audioRef.current.autoplay = true as any;
    try {
      (audioRef.current as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    } catch {}
    const p = audioRef.current.play();
    if (p && typeof p.then === 'function') {
      p
        .then(() => {
          setIsPlayingMusic(true);
          setShowPlayPrompt(false);
        })
        .catch(() => {
          // Autoplay with sound blocked by browser; show prompt for user gesture
          setIsPlayingMusic(false);
          setShowPlayPrompt(true);
        });
    }
  }, [musicUrl, isMutedMusic]);

  const toggleMusicPlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        await audioRef.current.play();
        setIsPlayingMusic(true);
      }
    } catch (e) {
      setIsPlayingMusic(false);
    }
  };

  const toggleMusicMute = () => {
    if (!audioRef.current) return;
    const next = !isMutedMusic;
    audioRef.current.muted = next;
    setIsMutedMusic(next);
    try {
      localStorage.setItem('bg_music_muted', JSON.stringify(next));
    } catch {}
  };

  const handlePlayPrompt = async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.muted = false;
      setIsMutedMusic(false);
      await audioRef.current.play();
      setIsPlayingMusic(true);
      setShowPlayPrompt(false);
      try {
        localStorage.setItem('bg_music_muted', JSON.stringify(false));
      } catch {}
    } catch {
      // still blocked, keep prompt visible
      setShowPlayPrompt(true);
    }
  };

  const steps = ['Infos perso', 'Choix musical', 'Finalisation', 'Résumé'];

  const getStepImage = () => {
    switch (currentStep) {
      case 0:
        return stepImage1;
      case 1:
        return stepImage2;
      case 2:
        return stepImage3;
      case 3:
      default:
        return stepImage4;
    }
  };

  useEffect(() => {
    if (hasDraft()) {
      setShowDraftNotif(true);
    }
  }, []);

  const handleLoadDraft = () => {
    const draft = loadDraft();
    if (draft) {
      setFormData(draft);
      setShowDraftNotif(false);
    }
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setShowDraftNotif(false);
  };

  const handleSaveDraft = () => {
    saveDraft(formData);
    alert('Brouillon sauvegardé avec succès !');
  };

  const handleNext = () => {
    if (currentStep === 0) {
      // Après les infos perso, on affiche d'abord l'interlude artistique
      setShowArtistsInterlude(true);
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        const errorMsg = "Supabase n'est pas configuré. Vérifiez vos variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans les paramètres Netlify.";
        console.error('❌ Supabase not configured:', {
          isSupabaseConfigured,
          hasSupabase: !!supabase,
          env: {
            VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET',
            VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
          },
        });
        throw new Error(errorMsg);
      }

      console.log('📤 Submitting form data to Supabase...');
      const { data, error: supabaseError } = await supabase
        .from('participants')
        .insert([
          {
            nom: formData.personalInfo.lastName,
            prenom: formData.personalInfo.firstName,
            telephone: formData.personalInfo.phone,
            email: formData.personalInfo.email || null,
            institut_id: formData.personalInfo.institutId
              ? Number(formData.personalInfo.institutId)
              : null,
            chanson_titre: formData.songInfo.title,
            chanson_artiste: formData.songInfo.artist,
            theme_id: formData.songInfo.themeId,
            type_chanson: formData.songInfo.performanceType,
            nom_partenaire:
              formData.songInfo.performanceType === 'duo'
                ? formData.songInfo.partnerName || null
                : null,
            niveau_confiance: formData.songInfo.confidenceLevel,
            horaire_preference: formData.finalInfo.preferredSlot || null,
            message: formData.finalInfo.message || null,
            date_inscription: new Date().toISOString(),
          },
        ])
        .select();

      if (supabaseError) {
        console.error('❌ Supabase insertion error:', {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code,
        });
        
        // Messages d'erreur plus spécifiques
        let errorMessage = 'Une erreur est survenue lors de l\'envoi.';
        if (supabaseError.code === 'PGRST116') {
          errorMessage = 'Erreur : La table "resident_forms" n\'existe pas ou vous n\'avez pas les permissions. Vérifiez votre configuration Supabase.';
        } else if (supabaseError.code === '23505') {
          errorMessage = 'Cette soumission existe déjà.';
        } else if (supabaseError.message) {
          errorMessage = `Erreur Supabase: ${supabaseError.message}`;
        }
        
        throw new Error(errorMessage);
      }

      console.log('✅ Form submitted successfully:', data);
      clearDraft();
      setIsSuccess(true);
    } catch (err) {
      console.error('❌ Submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    if (adminEmail === 'Aime' && adminPassword === 'Aime127@') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminEmail('');
      setAdminPassword('');
    } else {
      setAdminError('Identifiants incorrects');
    }
  };

  // Validation des informations personnelles
  const isPersonalInfoValid = () => {
    const { firstName, lastName, phone, institutId } = formData.personalInfo;
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      phone.trim() !== '' &&
      `${institutId}`.trim() !== ''
    );
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (showArtistsInterlude) {
    return (
      <MusicCategoriesInterlude
        onCategorySelect={() => {
          setShowArtistsInterlude(false);
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSkip={() => {
          setShowArtistsInterlude(false);
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  if (isAdmin) {
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdmin(false);
        }}
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ucao-blue-50 via-white to-ucao-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-scaleIn">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-ucao-blue-500 to-ucao-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3 font-display">Succès !</h1>
            <p className="text-gray-600 leading-relaxed">
              Votre formulaire a été soumis avec succès. Merci de votre participation !
            </p>
          </div>

          <div className="bg-gradient-to-r from-ucao-blue-50 to-ucao-red-50 border-l-4 border-ucao-blue-500 p-4 rounded-lg mb-6">
            <p className="text-sm text-ucao-blue-900 font-medium">
              Le bureau de la cité vous contactera si nécessaire.
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                setFormData(initialState);
                setCurrentStep(0);
                setIsSuccess(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-ucao-blue-600 via-ucao-red-500 to-ucao-blue-600 text-white rounded-lg hover:from-ucao-blue-700 hover:via-ucao-red-600 hover:to-ucao-blue-700 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Soumettre un autre formulaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ucao-blue-50 via-white to-ucao-red-50 py-8 px-4">
      {/* Background audio element + controls */}
      {musicUrl && (
        <>
          <audio ref={audioRef} src={musicUrl} preload="auto" />

          {/* Play prompt overlay shown when browser blocks autoplay with sound */}
          {showPlayPrompt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg max-w-sm mx-4">
                <p className="mb-4 font-semibold">Activer le son</p>
                <p className="text-sm text-gray-600 mb-4">Cliquez pour autoriser la lecture audio avec le son.</p>
                <div className="flex justify-center">
                  <button
                    onClick={handlePlayPrompt}
                    className="px-5 py-2 bg-ucao-blue-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Activer le son
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <button
              onClick={toggleMusicPlay}
              aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isPlayingMusic ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMusicMute}
              aria-label={isMutedMusic ? 'Unmute music' : 'Mute music'}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isMutedMusic ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          {/* Animated finger pointer to draw attention to the play button when audio is not playing */}
          {!isPlayingMusic && (
            <div className="finger-pointer fixed bottom-20 right-6 z-50 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ucao-blue-600">
                <path d="M13 3v6a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0v1z" fill="currentColor" />
                <path d="M6 9v6a6 6 0 0 0 12 0v-1a3 3 0 0 0-6 0v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="UCAO Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-display">
            <span className="text-ucao-blue-700">Semaine de l'étudiant</span>{' '}
            <span className="text-ucao-red-700">2026</span>
          </h1>
          <p className="text-gray-700 text-lg font-medium">
            Inscription pour le karaoké 2026
          </p>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-ucao-blue-500 to-ucao-red-500 mx-auto rounded-full"></div>

          <button
            onClick={() => setShowAdminLogin(true)}
            className="mt-4 text-xs text-ucao-blue-700 hover:text-ucao-red-600 underline underline-offset-2"
          >
            Espace administrateur
          </button>
        </div>

        {showAdminLogin && (
          <div className="mb-6 max-w-md mx-auto bg-white border border-ucao-blue-200 rounded-2xl p-4 shadow-lg animate-fadeIn">
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <p className="text-sm font-semibold text-ucao-blue-900">
                Connexion administrateur
              </p>
              <input
                type="text"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Identifiant"
                className="w-full input-field border-ucao-blue-200"
              />
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full input-field border-ucao-blue-200"
              />
              {adminError && (
                <p className="text-xs text-red-600">{adminError}</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminError(null);
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs rounded-lg bg-ucao-blue-600 text-white hover:bg-ucao-blue-700"
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        )}

        {showDraftNotif && (
          <div className="mb-6 bg-gradient-to-r from-ucao-blue-50 to-ucao-red-50 border-2 border-ucao-blue-300 rounded-lg p-4 flex items-start gap-4 animate-slideInDown shadow-lg">
            <SaveIcon className="w-6 h-6 text-ucao-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-ucao-blue-900">Vous avez un brouillon sauvegardé</p>
              <p className="text-sm text-ucao-blue-800 mt-1">
                Voulez-vous continuer où vous avez arrêté ?
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleLoadDraft}
                  className="px-4 py-2 bg-gradient-to-r from-ucao-blue-600 to-ucao-blue-700 text-white rounded-lg hover:from-ucao-blue-700 hover:to-ucao-blue-800 font-medium transition-all duration-300 transform hover:scale-105 text-sm shadow-md"
                >
                  Charger le brouillon
                </button>
                <button
                  onClick={handleDiscardDraft}
                  className="px-4 py-2 text-ucao-blue-600 border-2 border-ucao-blue-300 rounded-lg hover:bg-ucao-blue-50 font-medium transition-all duration-300 text-sm"
                >
                  Commencer nouveau
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Carte principale avec arrière-plan illustré responsive */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden card animate-fadeIn">
          {/* Image d'arrière-plan globale (mobile + desktop) */}
          <div className="absolute inset-0">
            <img
              src={stepImage2}
              alt="Ambiance Karaoké UCAO"
              className="w-full h-full object-cover opacity-20 md:opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/95" />
          </div>

          <div className="relative p-6 md:p-10">
          <StepIndicator steps={steps} currentStep={currentStep} />

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slideInRight">
              <p className="text-red-800 font-medium">⚠ {error}</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-start">
            <div>
              {currentStep === 0 && (
                <PersonalInfoForm
                  data={formData.personalInfo}
                  onChange={(data) =>
                    setFormData({ ...formData, personalInfo: data })
                  }
                />
              )}

              {currentStep === 1 && (
                <KaraokeSongForm
                  data={formData.songInfo}
                  onChange={(songInfo) =>
                    setFormData({ ...formData, songInfo })
                  }
                />
              )}

              {currentStep === 2 && (
                <KaraokeFinalForm
                  data={formData.finalInfo}
                  onChange={(finalInfo) =>
                    setFormData({ ...formData, finalInfo })
                  }
                />
              )}

              {currentStep === 3 && (
                <SummaryPreview
                  formData={formData}
                  onEdit={handleEdit}
                />
              )}
            </div>

            <div className="hidden md:block">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-full min-h-[260px] bg-gradient-to-br from-ucao-blue-900 via-slate-900 to-ucao-red-900">
                <img
                  src={getStepImage()}
                  alt="Ambiance karaoké"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-2">
                      Étape {currentStep + 1} / {steps.length}
                    </p>
                    <h2 className="text-2xl font-bold text-white font-display mb-2">
                      {steps[currentStep]}
                    </h2>
                    <p className="text-sm text-white/80">
                      Une ambiance néon, de la musique et tout le campus UCAO qui se prépare pour
                      une soirée inoubliable.
                    </p>
                  </div>
                  <div className="mt-6 text-xs text-white/60">
                    <p>Semaine de l'étudiant 2026 • Université Catholique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200 gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>

            <button
              onClick={handleSaveDraft}
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-ucao-blue-400 text-ucao-blue-700 hover:bg-ucao-blue-50 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <SaveIcon className="w-5 h-5" />
              Brouillon
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={currentStep === 0 && !isPersonalInfoValid()}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-ucao-blue-600 to-ucao-blue-700 text-white hover:from-ucao-blue-700 hover:to-ucao-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-ucao-blue-600 via-ucao-red-600 to-ucao-blue-600 text-white hover:from-ucao-blue-700 hover:via-ucao-red-700 hover:to-ucao-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Soumettre
                  </>
                )}
              </button>
            )}
          </div>

          <div className="text-center mt-6 text-xs text-gray-500">
            🔒 Vos données sont sécurisées et confidentielles
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
