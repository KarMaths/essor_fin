import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/ESSOR LOGO-33.png" 
                alt="Essor Dental Clinic" 
                className="h-10 w-auto mr-3"
              />
              <div>
                <h3 className="text-xl font-bold">Essor Dental</h3>
                <p className="text-gray-400 text-sm">Clinique Bucco-Dentaire</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Offrez à votre bouche une sensation naturelle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Soins généraux</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Blanchiment dentaire</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Implants dentaires</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Orthodontie</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Urgences dentaires</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Notre équipe</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/appointments" className="text-gray-400 hover:text-white transition-colors">Prendre RDV</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">19, Complexe seven stars<br />Delmas 33, Haïti</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">+509 46 08 25 45</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">frandlynmervil@gmail.com</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <p>Lun-Ven: 8AM-4PM</p>
                  <p>Sam: 8AM-4PM</p>
                  <p>Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Essor Dental Clinic. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                CGU
              </a>
              <Link to="/admin/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}