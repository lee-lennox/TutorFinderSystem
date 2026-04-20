export type TutorApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface TutorApplication {
  username: string;
  email: string;
  specialization: string;
  notes?: string;
  status: TutorApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
}

const TUTOR_APPLICATIONS_KEY = 'tutorApplications';

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const listTutorApplications = (): TutorApplication[] => {
  if (!canUseStorage()) return [];

  try {
    const raw = localStorage.getItem(TUTOR_APPLICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TutorApplication[]) : [];
  } catch {
    return [];
  }
};

const saveTutorApplications = (applications: TutorApplication[]) => {
  if (!canUseStorage()) return;
  localStorage.setItem(TUTOR_APPLICATIONS_KEY, JSON.stringify(applications));
};

export const upsertTutorApplication = (application: TutorApplication) => {
  const current = listTutorApplications();
  const next = current.filter(a => a.email.toLowerCase() !== application.email.toLowerCase());
  next.push(application);
  saveTutorApplications(next);
};

export const getTutorApplicationByEmail = (email: string) =>
  listTutorApplications().find(a => a.email.toLowerCase() === email.toLowerCase());

export const updateTutorApplicationStatus = (email: string, status: TutorApplicationStatus) => {
  const current = listTutorApplications();
  const next = current.map(app =>
    app.email.toLowerCase() === email.toLowerCase()
      ? { ...app, status, reviewedAt: new Date().toISOString() }
      : app,
  );
  saveTutorApplications(next);
  return next;
};
