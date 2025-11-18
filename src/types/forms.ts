export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roomNumber: string;
}

export interface Problem {
  category: string;
  description: string;
  customCategory?: string;
}

export interface ProgramChoice {
  footing: {
    selected: boolean;
    canHelp: boolean;
  };
  innovation: {
    selected: boolean;
    level?: string;
  };
  hygiene: {
    selected: boolean;
    isTeamLeader: boolean;
  };
}

export interface FormState {
  personalInfo: PersonalInfo;
  problems: Problem[];
  programChoices: ProgramChoice;
}
