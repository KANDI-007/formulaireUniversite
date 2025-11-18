import { FormState } from '../types/forms';

const DRAFT_KEY = 'residence_form_draft';

export const saveDraft = (formData: FormState): void => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving draft:', error);
  }
};

export const loadDraft = (): FormState | null => {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error loading draft:', error);
    return null;
  }
};

export const clearDraft = (): void => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.error('Error clearing draft:', error);
  }
};

export const hasDraft = (): boolean => {
  try {
    return localStorage.getItem(DRAFT_KEY) !== null;
  } catch (error) {
    console.error('Error checking draft:', error);
    return false;
  }
};
