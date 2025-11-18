export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[0-9+\-\s()]{8,}$/.test(phone);
};

export const validateForm = (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  roomNumber: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!firstName.trim()) errors.firstName = 'Le prénom est requis';
  if (!lastName.trim()) errors.lastName = 'Le nom est requis';
  if (!phone.trim()) errors.phone = 'Le téléphone est requis';
  else if (!validatePhone(phone)) errors.phone = 'Numéro invalide';
  if (email.trim() && !validateEmail(email)) {
    errors.email = 'Email invalide';
  }
  if (!roomNumber.trim()) errors.roomNumber = 'Le numéro de chambre est requis';

  return errors;
};
