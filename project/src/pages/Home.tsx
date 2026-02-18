import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  Users, 
  Award, 
  Star,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react';

export default function Home() {
  const services = [
    {
      title: 'Soins Généraux',
      description: 'Consultations, détartrage, soins des caries',
      icon: Shield,
    },
    {
      title: 'Blanchiment Dentaire',
      description: 'Retrouvez l\'éclat naturel de votre sourire',
      icon: Star,
    },
    {
      title: 'Implants Dentaires',
      description: 'Solutions durables pour remplacer vos dents',
      icon: Award,
    },
    {
      title: 'Orthodontie',
      description: 'Appareils dentaires et alignement',
      icon: Heart,
    },
  ];

  const testimonials = [
    {
      name: 'Mervil Frandlyn, DDS',
      text: 'Excellente prise en charge, équipe très professionnelle. Je recommande vivement !',
      rating: 5,
    },
    {
      name: 'Jean Daïna Deborah',
      text: 'Clinique moderne avec des équipements de pointe. Soins de qualité exceptionnelle.',
      rating: 4.5,
    },
    
  ];

  const features = [
    'Équipements de dernière génération',
    'Équipe de professionnels expérimentés',
    'Prise en charge personnalisée',
    'Urgences dentaires 24h/24',
    'Environnement moderne et stérilisé',
    'Suivi post-traitement inclus'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20" style={{
        backgroundImage: 'url(/essorDesign.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Souri w,<br />
                <span className="text-blue-600">Se afè pa nou</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
    
                Découvrez l'excellence en soins dentaires chez Essor Dental Clinic. 
                Nos spécialistes vous accompagnent pour une santé bucco-dentaire optimale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointments"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 text-center flex items-center justify-center"
                >
                  Prendre Rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 text-center flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Nous Contacter
                </Link>
              </div>
            </div>
            <div className="relative z-10">
              <div className="bg-blue-100 rounded-2xl p-8 transform rotate-3">
                <img
                  src="/pageacc.png"
                  alt="Cabinet derntaire moderne"
                  className="w-full h-96 object-cover rounded-xl transform -rotate-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Services Dentaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de soins dentaires pour toute la famille, 
              réalisés par nos spécialistes expérimentés.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Voir tous nos services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi Choisir Essor Dental ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous nous engageons à vous offrir les meilleurs soins dentaires 
                dans un environnement moderne et bienveillant.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/imag.jpg"
                alt="Équipe dentaire professionnelle"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Patients satisfaits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ce Que Disent Nos Patients
            </h2>
            <p className="text-xl text-gray-600">
              La satisfaction de nos patients est notre plus belle récompense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à Retrouver Votre Plus Beau Sourire ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous dès aujourd'hui et découvrez l'excellence 
            de nos soins dentaires personnalisés.
            Pran randevou pa w la jodi a menm 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointments"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Prendre Rendez-vous Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Appeler Maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}