// Types adaptés pour le formulaire d'inscription au karaoké UCAO

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  institutId: number | '';
}

export type PerformanceType = 'solo' | 'duo';

export interface SongInfo {
  searchQuery: string;
  title: string;
  artist: string;
  themeId: number | null;
  performanceType: PerformanceType;
  partnerName: string;
  confidenceLevel: 'Débutant timide' | 'Amateur motivé' | 'Confirmé' | 'Pro du micro';
}

export interface FinalInfo {
  preferredSlot: 'debut' | 'milieu' | 'fin' | 'peu_importe' | '';
  message: string;
  acceptTerms: boolean;
}

export interface FormState {
  personalInfo: PersonalInfo;
  songInfo: SongInfo;
  finalInfo: FinalInfo;
}

