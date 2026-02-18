import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { testConnection } from './config/database.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// 🔒 Middlewares de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://votre-domaine.com']
    : '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📝 Logging des requêtes en développement
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// 🏥 Routes de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Essor Dental Backend'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API fonctionne correctement ✅',
    version: '1.0.0'
  });
});

// 🔐 Routes d'authentification
app.use('/api/auth', authRoutes);

// 🚫 Gestion des routes non trouvées (compatible Express v5)
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl 
  });
});

// ⚠️ Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Impossible de se connecter à la base de données');
      console.error('⚠️  Assurez-vous que PostgreSQL est démarré et que la configuration est correcte');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Serveur Essor Dental démarré avec succès!`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
}

startServer();
