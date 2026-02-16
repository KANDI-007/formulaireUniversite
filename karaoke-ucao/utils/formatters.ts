import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 8) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(
      4,
      6
    )} ${digits.slice(6)}`;
  }
  return value;
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
};


