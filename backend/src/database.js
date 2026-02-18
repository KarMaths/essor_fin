import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Configuration du pool de connexion PostgreSQL
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
  // Configuration optimale pour la production
  max: 20, // nombre maximum de clients dans le pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion au démarrage
pool.on('connect', () => {
  console.log('✅ Nouvelle connexion PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('❌ Erreur inattendue sur le client PostgreSQL:', err);
  process.exit(-1);
});

// Fonction pour tester la connexion
export async function testConnection() {
  try {
    const result = await pool.query('SELECT current_user, current_database(), NOW()');
    console.log('✅ Connecté à PostgreSQL avec succès!');
    console.log('   Utilisateur:', result.rows[0].current_user);
    console.log('   Base de données:', result.rows[0].current_database);
    console.log('   Heure serveur:', result.rows[0].now);
    return true;
  } catch (err) {
    console.error('❌ Erreur de connexion PostgreSQL:', err.message);
    return false;
  }
}

export default pool;
