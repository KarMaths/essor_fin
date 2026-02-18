import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Award, TrendingUp, Settings, LogOut, Search, Plus, CreditCard as Edit, Trash2, Eye, Clock, DollarSign, Lock } from 'lucide-react';
import { 
  getPatients, 
  getAppointments, 
  getTodayAppointments, 
  deletePatient, 
  deleteAppointment,
  initializeDemoData,
  Patient,
  Appointment
} from '../utils/database';
import PatientModal from '../components/PatientModal';
import AppointmentModal from '../components/AppointmentModal';
import SuperUserModal from '../components/SuperUserModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSuperUserModalOpen, setIsSuperUserModalOpen] = useState(false);
  const [isSuperUserAuthenticated, setIsSuperUserAuthenticated] = useState(false);
  const [statsUpdateCounter, setStatsUpdateCounter] = useState(0);
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: 'Essor Dental Clinic',
    address: '123 Rue de la Santé, Delmas 33',
    phone: '+509 46 08 25 45',
    email: 'frandlynmervil@gmail.com',
    emergencyPhone: '+509 46 08 25 45',
    openingHours: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '13:00', closed: false },
      sunday: { open: '09:00', close: '13:00', closed: true }
    },
    appointmentDuration: 30,
    reminderSettings: {
      emailReminder: true,
      smsReminder: false,
      reminderTime: 24
    }
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated');
    if (!isAuth) {
      navigate('/admin/login');
    } else {
      initializeDemoData();
      loadData();
    }
  }, [navigate]);

  // Update stats whenever data changes
  useEffect(() => {
    // This effect will run whenever patients, appointments, or todayAppointments change
    // The statsUpdateCounter ensures stats are recalculated
  }, [patients, appointments, todayAppointments, statsUpdateCounter]);

  const loadData = () => {
    setPatients(getPatients());
    setAppointments(getAppointments());
    setTodayAppointments(getTodayAppointments());
    // Force re-render of stats by updating a counter
    setStatsUpdateCounter(prev => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleDeletePatient = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?  Tous ses rendez-vous seront également supprimés.')) {
      deletePatient(id);
      loadData();
    }
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      deleteAppointment(id);
      loadData();
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsPatientModalOpen(true);
  };

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setIsAppointmentModalOpen(true);
  };

  const handleModalSave = () => {
    loadData();
  };

  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonctions de calcul dynamiques des statistiques
  const calculateTotalPatients = () => {
    return patients.length;
  };

  const calculateTodayAppointments = () => {
    return todayAppointments.length;
  };

  const calculateMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return appointments
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.getMonth() === currentMonth &&
               appointmentDate.getFullYear() === currentYear &&
               appointment.paid === true;
      })
      .reduce((sum, appointment) => sum + (appointment.price || 0), 0);
  };

  const calculatePendingAppointments = () => {
    return appointments.filter(appointment => 
      appointment.status === 'Confirmé' || appointment.status === 'En cours'
    ).length;
  };

  const calculateGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const growth = ((current - previous) / previous) * 100;
    return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  };

  // Statistiques avec calculs dynamiques
  const stats = [
    { 
      title: 'Patients Total', 
      value: calculateTotalPatients().toString(), 
      change: calculateGrowthPercentage(calculateTotalPatients(), 0), 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'RDV Aujourd\'hui', 
      value: calculateTodayAppointments().toString(), 
      change: calculateGrowthPercentage(calculateTodayAppointments(), 0), 
      icon: Calendar, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Revenus Mois', 
      value: `${calculateMonthlyRevenue().toLocaleString()} HTG`, 
      change: calculateGrowthPercentage(calculateMonthlyRevenue(), 0), 
      icon: DollarSign, 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'RDV En Attente', 
      value: calculatePendingAppointments().toString(), 
      change: calculateGrowthPercentage(calculatePendingAppointments(), 0), 
      icon: TrendingUp, 
      color: 'bg-purple-500' 
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-green-600 text-sm font-medium mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Rendez-vous du Jour</h3>
          <button
            onClick={handleAddAppointment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Heure</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.service}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'Urgent' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Voir/Modifier"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Patients</h2>
          <button 
            onClick={handleAddPatient}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Patient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Téléphone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Dernière visite</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{patient.firstName} {patient.lastName}</td>
                  <td className="py-3 px-4">{patient.email}</td>
                  <td className="py-3 px-4">{patient.phone}</td>
                  <td className="py-3 px-4">{new Date(patient.updatedAt).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditPatient(patient)}
                        className="text-green-600 hover:text-green-800"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeletePatient(patient.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Rendez-vous</h2>
        <button 
          onClick={handleAddAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Rendez-vous
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Heure</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Prix</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.service}</td>
                  <td className="py-3 px-4">{new Date(appointment.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'Terminé' ? 'bg-gray-100 text-gray-800' :
                      appointment.status === 'Urgent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">{appointment.price ? `€${appointment.price}` : '-'}</span>
                      {appointment.paid && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Payé</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Voir/Modifier"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-green-600 hover:text-green-800"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Informations de la Clinique */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Settings className="h-6 w-6 mr-2 text-blue-600" />
          Informations de la Clinique
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la clinique</label>
            <input
              type="text"
              value={clinicSettings.clinicName}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, clinicName: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={clinicSettings.email}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, email: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={clinicSettings.phone}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone d'urgence</label>
            <input
              type="tel"
              value={clinicSettings.emergencyPhone}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, emergencyPhone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <textarea
              value={clinicSettings.address}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Horaires d'ouverture */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-blue-600" />
          Horaires d'Ouverture
        </h3>
        <div className="space-y-4">
          {Object.entries(clinicSettings.openingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-24">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {day === 'monday' ? 'Lundi' :
                   day === 'tuesday' ? 'Mardi' :
                   day === 'wednesday' ? 'Mercredi' :
                   day === 'thursday' ? 'Jeudi' :
                   day === 'friday' ? 'Vendredi' :
                   day === 'saturday' ? 'Samedi' : 'Dimanche'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!hours.closed}
                  onChange={(e) => setClinicSettings(prev => ({
                    ...prev,
                    openingHours: {
                      ...prev.openingHours,
                      [day]: { ...hours, closed: !e.target.checked }
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Ouvert</span>
              </div>
              {!hours.closed && (
                <>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => setClinicSettings(prev => ({
                      ...prev,
                      openingHours: {
                        ...prev.openingHours,
                        [day]: { ...hours, open: e.target.value }
                      }
                    }))}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                  <span className="text-gray-500">à</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => setClinicSettings(prev => ({
                      ...prev,
                      openingHours: {
                        ...prev.openingHours,
                        [day]: { ...hours, close: e.target.value }
                      }
                    }))}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Paramètres des Rendez-vous */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-blue-600" />
          Paramètres des Rendez-vous
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée par défaut (minutes)
            </label>
            <select
              value={clinicSettings.appointmentDuration}
              onChange={(e) => setClinicSettings(prev => ({ ...prev, appointmentDuration: parseInt(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 heure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rappel avant RDV (heures)
            </label>
            <select
              value={clinicSettings.reminderSettings.reminderTime}
              onChange={(e) => setClinicSettings(prev => ({
                ...prev,
                reminderSettings: { ...prev.reminderSettings, reminderTime: parseInt(e.target.value) }
              }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>1 heure</option>
              <option value={2}>2 heures</option>
              <option value={24}>24 heures</option>
              <option value={48}>48 heures</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={clinicSettings.reminderSettings.emailReminder}
                onChange={(e) => setClinicSettings(prev => ({
                  ...prev,
                  reminderSettings: { ...prev.reminderSettings, emailReminder: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Rappels par email</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={clinicSettings.reminderSettings.smsReminder}
                onChange={(e) => setClinicSettings(prev => ({
                  ...prev,
                  reminderSettings: { ...prev.reminderSettings, smsReminder: e.target.checked }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Rappels par SMS</label>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            localStorage.setItem('clinicSettings', JSON.stringify(clinicSettings));
            alert('Paramètres sauvegardés avec succès !');
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sauvegarder les Paramètres
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return renderPatients();
      case 'appointments':
        return renderAppointments();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    //<div className="min-h-screen bg-gray-50">
    <div
    className="min-h-screen relative"
    style={{
      backgroundImage: 'url(/essorDesign.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >

  
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src="/ESSOR LOGO-33.png" 
              alt="Essor Dental Clinic" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Tableau de Bord', icon: TrendingUp },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'appointments', label: 'Rendez-vous', icon: Calendar },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeTab === 'dashboard' && 'Tableau de Bord'}
            {activeTab === 'patients' && 'Gestion des Patients'}
            {activeTab === 'appointments' && 'Gestion des Rendez-vous'}
            {activeTab === 'settings' && 'Paramètres'}
          </h1>
          <p className="text-gray-600 mt-2">
            {activeTab === 'dashboard' && 'Vue d\'ensemble de votre clinique dentaire'}
            {activeTab === 'patients' && 'Gérez les informations de vos patients'}
            {activeTab === 'appointments' && 'Planifiez et organisez vos rendez-vous'}
            {activeTab === 'settings' && 'Configurez les paramètres de votre clinique'}
          </p>
        </div>

        {renderContent()}
      </div>

      {/* Modals */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        patient={selectedPatient}
        onSave={handleModalSave}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        appointment={selectedAppointment}
        onSave={handleModalSave}
      />
    </div>
  );
}