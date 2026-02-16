export const theme = {
  colors: {
    primary: '#003D82',
    secondary: '#FFD700',
    accent: '#E63946',
    success: '#06D6A0',
    warning: '#FFB703',
    error: '#EF476F',

    issj: '#003D82',
    dgi: '#E63946',
    iseg: '#06D6A0',
    autre: '#FFB703',

    theme80s: '#667eea',
    themeAfro: '#f5576c',
    themeMusical: '#00f2fe',
    themeGospel: '#fee140',
    themeHits: '#ff6b6b',
    themeClassic: '#4ecdc4',

    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212529',
    textSecondary: '#6C757D',
    border: '#DEE2E6',
    disabled: '#ADB5BD'
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8
    }
  }
} as const;

export type AppTheme = typeof theme;


