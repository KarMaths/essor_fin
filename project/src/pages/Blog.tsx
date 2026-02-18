import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: '5 Conseils pour une Hygiène Dentaire Parfaite',
      excerpt: 'Découvrez les meilleures pratiques pour maintenir une santé bucco-dentaire optimale au quotidien.',
      content: 'Une bonne hygiène dentaire commence par des gestes simples mais essentiels. Voici nos 5 conseils d\'expert pour garder un sourire éclatant et des dents en parfaite santé...',
      author: 'Dr. Mervil',
      date: '2024-01-15',
      readTime: '5 min',
      image: '/imageweb.jpg',
      tags: ['Hygiène', 'Prévention', 'Conseils']
    },
    {
      id: 2,
      title: 'Blanchiment Dentaire: Naturel vs Professionnel',
      excerpt: 'Comparaison entre les méthodes de blanchiment naturelles et les traitements professionnels en cabinet.',
      content: 'Le blanchiment dentaire est l\'une des demandes les plus fréquentes en dentisterie esthétique. Mais quelle méthode choisir entre les solutions naturelles et les traitements professionnels ?',
      author: 'Dr. Mervil',
      date: '2024-01-10',
      readTime: '7 min',
      image: '/imag.jpg',
      tags: ['Blanchiment', 'Esthétique', 'Comparaison']
    },
    {
      id: 3,
      title: 'Implants Dentaires: Ce que Vous Devez Savoir',
      excerpt: 'Guide complet sur les implants dentaires, leurs avantages et le processus de pose.',
      content: 'Les implants dentaires représentent la solution la plus durable pour remplacer une dent manquante. Découvrez tout ce qu\'il faut savoir sur cette technique révolutionnaire...',
      author: 'Dr. Deborah',
      date: '2024-01-08',
      readTime: '10 min',
      image: '/imagwebp.png',
      tags: ['Implants', 'Chirurgie', 'Innovation']
    },
    {
      id: 4,
      title: 'Orthodontie Invisible: L\'Alternative Moderne',
      excerpt: 'Tout savoir sur les aligneurs invisibles et leurs avantages par rapport aux appareils traditionnels.',
      content: 'L\'orthodontie invisible révolutionne le traitement des malpositions dentaires. Ces aligneurs transparents offrent une alternative discrète aux bagues traditionnelles...',
      author: 'Dr. Mervil',
      date: '2024-01-05',
      readTime: '6 min',
      image: '/pageacc.png',
      tags: ['Orthodontie', 'Innovation', 'Esthétique']
    },
    {
      id: 5,
      title: 'Dentisterie Pédiatrique: Prendre Soin des Dents de Lait',
      excerpt: 'L\'importance des soins dentaires chez l\'enfant et comment créer de bonnes habitudes dès le plus jeune âge.',
      content: 'Les dents de lait jouent un rôle crucial dans le développement de l\'enfant. Voici pourquoi il est essentiel d\'en prendre soin et comment inculquer de bonnes habitudes...',
      author: 'Dr. Mervil',
      date: '2024-01-03',
      readTime: '8 min',
      image: '/stagiaire.png',
      tags: ['Pédiatrie', 'Prévention', 'Enfants']
    },
    {
      id: 6,
      title: 'Urgences Dentaires: Que Faire en Cas de Douleur',
      excerpt: 'Guide pratique pour gérer les urgences dentaires en attendant de consulter votre dentiste.',
      content: 'Les urgences dentaires peuvent survenir à tout moment. Voici comment réagir rapidement et efficacement pour soulager la douleur en attendant un rendez-vous...',
      author: 'Dr. Deborah',
      date: '2024-01-01',
      readTime: '4 min',
      image: '/imageweb.jpg',
      tags: ['Urgences', 'Premiers secours', 'Douleur']
    }
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Blog & Conseils Dentaires
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos conseils d'experts, les dernières innovations en dentisterie 
            et tout ce qu'il faut savoir pour maintenir une santé bucco-dentaire optimale.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <div className="mb-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    Article à la une
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {articles[0].title}
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 mr-2" />
                  <span className="mr-4">{articles[0].author}</span>
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="mr-4">{new Date(articles[0].date).toLocaleDateString('fr-FR')}</span>
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{articles[0].readTime}</span>
                </div>
                <Link
                  to={`/blog/${articles[0].id}`}
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Lire l'article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="aspect-w-16 aspect-h-9 lg:aspect-h-full">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Derniers Articles</h2>
            <p className="text-gray-600">
              Restez informés des dernières actualités et conseils en santé dentaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{article.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                  
                  <Link
                    to={`/blog/${article.id}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Restez Informés de Nos Conseils
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir nos derniers articles 
            et conseils directement dans votre boîte mail.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}