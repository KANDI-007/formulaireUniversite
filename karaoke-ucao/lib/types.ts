export type ParticipantType = 'solo' | 'duo';

export interface Institut {
  id: number;
  nom: string;
  sigle: string;
  couleur: string | null;
}

export interface Theme {
  id: number;
  nom: string;
  emoji: string | null;
  description?: string | null;
  couleur: string | null;
  ordre?: number | null;
}

export interface Participant {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  institut_id: number | null;
  chanson_titre: string;
  chanson_artiste: string;
  chanson_cover_url: string | null;
  theme_id: number | null;
  type_chanson: ParticipantType;
  nom_partenaire: string | null;
  niveau_confiance: string;
  horaire_preference: string | null;
  message: string | null;
  numero_passage: number | null;
  qr_code: string;
  est_present: boolean;
  date_inscription: string;
  user_id: string | null;
}

export interface Database {
  public: {
    Tables: {
      participants: {
        Row: Participant;
        Insert: Omit<
          Participant,
          'id' | 'numero_passage' | 'qr_code' | 'est_present' | 'date_inscription'
        >;
      };
      instituts: {
        Row: Institut;
      };
      themes: {
        Row: Theme;
      };
    };
  };
}


