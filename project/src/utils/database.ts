// Simulation d'une base de données avec localStorage
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: string;
  updatedAt: string;
  status: 'Actif' | 'Inactif';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmé' | 'En cours' | 'Terminé' | 'Annulé' | 'Urgent';
  message?: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  paid?: boolean;
}

// Fonctions pour gérer les patients
export const getPatients = (): Patient[] => {
  const patients = localStorage.getItem('essor_patients');
  return patients ? JSON.parse(patients) : [];
};

export const savePatients = (patients: Patient[]): void => {
  localStorage.setItem('essor_patients', JSON.stringify(patients));
};

export const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Patient => {
  const patients = getPatients();
  const newPatient: Patient = {
    ...patientData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  patients.push(newPatient);
  savePatients(patients);
  return newPatient;
};

export const updatePatient = (id: string, patientData: Partial<Patient>): Patient | null => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  patients[index] = {
    ...patients[index],
    ...patientData,
    updatedAt: new Date().toISOString(),
  };
  savePatients(patients);
  return patients[index];
};

export const deletePatient = (id: string): boolean => {
  const patients = getPatients();
  const filteredPatients = patients.filter(p => p.id !== id);
  if (filteredPatients.length === patients.length) return false;
  
  savePatients(filteredPatients);
  // Supprimer aussi les rendez-vous associés
  const appointments = getAppointments();
  const filteredAppointments = appointments.filter(a => a.patientId !== id);
  saveAppointments(filteredAppointments);
  return true;
};

export const getPatientById = (id: string): Patient | null => {
  const patients = getPatients();
  return patients.find(p => p.id === id) || null;
};

// Fonctions pour gérer les rendez-vous
export const getAppointments = (): Appointment[] => {
  const appointments = localStorage.getItem('essor_appointments');
  return appointments ? JSON.parse(appointments) : [];
};

export const saveAppointments = (appointments: Appointment[]): void => {
  localStorage.setItem('essor_appointments', JSON.stringify(appointments));
};

export const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Appointment => {
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...appointmentData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  saveAppointments(appointments);
  return newAppointment;
};

export const updateAppointment = (id: string, appointmentData: Partial<Appointment>): Appointment | null => {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  appointments[index] = {
    ...appointments[index],
    ...appointmentData,
    updatedAt: new Date().toISOString(),
  };
  saveAppointments(appointments);
  return appointments[index];
};

export const deleteAppointment = (id: string): boolean => {
  const appointments = getAppointments();
  const filteredAppointments = appointments.filter(a => a.id !== id);
  if (filteredAppointments.length === appointments.length) return false;
  
  saveAppointments(filteredAppointments);
  return true;
};

export const getAppointmentsByPatient = (patientId: string): Appointment[] => {
  const appointments = getAppointments();
  return appointments.filter(a => a.patientId === patientId);
};

export const getTodayAppointments = (): Appointment[] => {
  const appointments = getAppointments();
  const today = new Date().toISOString().split('T')[0];
  return appointments.filter(a => a.date === today);
};

// Initialiser avec des données de démonstration
export const initializeDemoData = (): void => {
  const existingPatients = getPatients();
  const existingAppointments = getAppointments();
  
  // Initialisation avec des données vides - système propre
  if (existingPatients.length === 0) {
    savePatients([]);
  }
  
  if (existingAppointments.length === 0) {
    saveAppointments([]);
  }
};