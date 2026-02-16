// Validation du téléphone togolais (+228 ou 8 chiffres)
export const validatePhone = (value: string): boolean => {
  if (!value) return false;
  const trimmed = value.replace(/\s+/g, '');
  const plusFormat = /^\+228\d{8}$/;
  const shortFormat = /^\d{8}$/;
  return plusFormat.test(trimmed) || shortFormat.test(trimmed);
};

export const validateEmail = (value: string): boolean => {
  if (!value) return true; // optionnel
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};


