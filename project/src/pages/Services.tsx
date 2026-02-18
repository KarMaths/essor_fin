import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Star, 
  Award, 
  Heart, 
  Zap,
  Eye,
  Baby,
  AlertCircle,
  ArrowRight 
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Soins Généraux',
      description: 'Consultations de routine, nettoyages professionnels, soins des caries et traitements préventifs.',
      icon: Shield,
      
      details: [
        'Consultation et diagnostic',
        'Détartrage et polissage',
        'Soins des caries',
        'Traitement des gingivites',
        'Radiographies dentaires'
      ],
      image: '/imageweb.jpg'
    },
    {
      title: 'Blanchiment Dentaire',
      description: 'Traitements professionnels pour retrouver l\'éclat naturel de vos dents en toute sécurité.',
      icon: Star,
    
      details: [
        'Blanchiment au cabinet (1 séance)',
        'Kit de blanchiment à domicile',
        'Blanchiment combiné cabinet + maison',
        'Suivi post-traitement',
        'Conseils de maintenance'
      ],
      image: '/image.jpg'
    },
    {
      title: 'Implants Dentaires',
      description: 'Solutions permanentes et durables pour remplacer une ou plusieurs dents manquantes.',
      icon: Award,
      
      details: [
        'Consultation et planification 3D',
        'Pose d\'implants titane',
        'Couronnes sur implants',
        'Bridges sur implants',
        'Suivi post-opératoire complet'
      ],
      image: '/imagwebp.png'
    },
    {
      title: 'Orthodontie',
      description: 'Correction de l\'alignement dentaire avec des solutions modernes et discrètes.',
      icon: Heart,
     
      details: [
        'Bagues métalliques traditionnelles',
        'Bagues céramiques discrètes',
        'Aligneurs invisibles (type Invisalign)',
        'Appareils amovibles',
        'Suivi orthodontique complet'
      ],
      image: '/image.jpg'
    },
    {
      title: 'Chirurgie Dentaire',
      description: 'Interventions chirurgicales spécialisées pour traiter les problèmes complexes.',
      icon: Zap,
     
      details: [
        'Extractions dentaires simples',
        'Extractions de dents de sagesse',
        'Chirurgie parodontale',
        'Greffe osseuse',
        'Anesthésie locale ou générale'
      ],
      image: '/imageweb.jpg'
    },
    {
      title: 'Esthétique Dentaire',
      description: 'Améliorez l\'apparence de votre sourire avec nos traitements esthétiques.',
      icon: Eye,
     
      details: [
        'Facettes dentaires en céramique',
        'Composite esthétique',
        'Reconstitution esthétique',
        'Gingivoplastie',
        'Smile design personnalisé'
      ],
      image: '/image.jpg'
    },
    {
      title: 'Dentisterie Pédiatrique',
      description: 'Soins dentaires spécialisés pour les enfants dans un environnement adapté.',
      icon: Baby,
    
      details: [
        'Soins adaptés aux enfants',
        'Prévention et éducation',
        'Scellements de sillons',
        'Orthodontie interceptive'
      ],
      image: '/stagiaire.png'
    },
    {
      title: 'Urgences Dentaires',
      description: 'Prise en charge rapide des urgences dentaires. ',
      icon: AlertCircle,
     
      details: [
        'Consultation d\'urgence',
        'Soulagement immédiat de la douleur',
        'Réparations temporaires',
        'Prescription d\'antibiotiques',
        'Orientation vers spécialiste si nécessaire'
      ],
      image: '/imageweb.jpg'
    }
  ];

  return (
    <div className="py-16">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos Services Dentaires
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de soins dentaires personnalisés, 
            réalisés par nos spécialistes avec les technologies les plus avancées.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-blue-600 font-semibold">{service.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/appointments"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Prendre Rendez-vous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Vous Avez Des Questions Sur Nos Services ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous conseiller et vous orienter 
            vers les traitements les mieux adaptés à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Nous Contacter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/appointments"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 inline-flex items-center justify-center"
            >
              Consultation Gratuite
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}