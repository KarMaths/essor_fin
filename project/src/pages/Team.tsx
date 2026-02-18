import React from 'react';
import { Star, Award, BookOpen, Users } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Dr. Mervil Frandlin',
      title: 'Dentiste Généraliste & Directeur',
      statut: 'Directeur Médical',
      specialties: ['Soins généraux', 'Prévention', 'Esthétique dentaire'],
      experience: '6 ans d\'expérience',
      education: 'Université Autonome de P-au-P, DDS',
      languages: ['Français', 'Anglais', 'Espagnol'],
      image: '/docjay.jpg',
      bio: 'Passionnée par la dentisterie préventive et esthétique, Dr. Mervil dirige notre équipe avec bienveillance et expertise. Il se spécialise dans les soins conservateurs et la création de sourires harmonieux.'
    },
    {
      name: 'Dr. Jean Daïna Deborah',
      title: 'Etudiante en odontologie',
      Status: 'Stagiaire',
      specialties: ['Implantologie', 'Chirurgie', 'Parodontologie'],
      experience: '2 ans d\'expérience',
      education: 'Université Autonome de P-au-P',
      languages: ['Français', 'Anglais'],
      image: '/stagiaire.png',
      bio: 'Dr. Daïna apporte son savoir faire technique pour les cas complexes. Elle est reconnu pour sa précision et son approche mini-invasive.'
    },
    /*{
      name: 'Dr. Marie Leroy',
      title: 'Orthodontiste',
      specialties: ['Orthodontie', 'Aligneurs invisibles', 'Orthodontie adulte'],
      experience: '10 ans d\'expérience',
      education: 'Université Bordeaux, Spécialisation Orthodontie',
      languages: ['Français', 'Anglais', 'Allemand'],
      image: 'https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg',
      bio: 'Spécialisée dans l\'orthodontie moderne, Dr. Leroy excelle dans les traitements par aligneurs invisibles et l\'orthodontie esthétique pour adultes.'
    },
    {
      name: 'Dr. Jean Moreau',
      title: 'Endodontiste & Dentiste Pédiatrique',
      specialties: ['Endodontie', 'Dentisterie pédiatrique', 'Soins conservateurs'],
      experience: '8 ans d\'expérience',
      education: 'Université Strasbourg, Double spécialisation',
      languages: ['Français', 'Anglais'],
      image: 'https://images.pexels.com/photos/6812559/pexels-photo-6812559.jpeg',
      bio: 'Expert en soins des racines et dentisterie pour enfants, Dr. Moreau combine technicité et douceur pour offrir les meilleurs soins à tous nos patients.'
    }*/
  ];

  const stats = [
    { icon: Users, value: '2', label: 'Praticiens Experts' },
    { icon: Star, value: '100+', label: 'Patients Satisfaits' },
    { icon: Award, value: '7+', label: 'Années d\'Expérience' },
    { icon: BookOpen, value: '7+', label: 'Formations par An' }
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Notre Équipe d'Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Rencontrez nos dentistes spécialisés, passionnés par l'excellence des soins 
            et dévoués à votre bien-être bucco-dentaire.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {team.map((member, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-96 object-cover rounded-2xl shadow-xl"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-900">4.9/5</span>
                      </div>
                      <p className="text-xs text-gray-600">Avis patients</p>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                    <p className="text-xl text-blue-600 font-semibold mb-4">{member.title}</p>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Spécialités</h3>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, specialtyIndex) => (
                            <span
                              key={specialtyIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Expérience</h4>
                          <p className="text-gray-600 text-sm">{member.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Formation</h4>
                          <p className="text-gray-600 text-sm">{member.education}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Langues parlées</h4>
                        <p className="text-gray-600 text-sm">{member.languages.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui nous guide au quotidien dans nos soins et notre relation avec nos patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Nous nous engageons à fournir des soins de la plus haute qualité 
                en utilisant les technologies les plus avancées.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bienveillance</h3>
              <p className="text-gray-600">
                Chaque patient est unique. Nous prenons le temps de l'écouter 
                et de personnaliser nos traitements selon ses besoins.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Formation Continue</h3>
              <p className="text-gray-600">
                Notre équipe se forme régulièrement aux dernières innovations 
                pour vous offrir les traitements les plus modernes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à Rencontrer Notre Équipe ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous dès aujourd'hui et découvrez pourquoi nos patients 
            nous font confiance pour leurs soins dentaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointments"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Prendre Rendez-vous
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}