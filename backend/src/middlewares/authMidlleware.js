import jwt from 'jsonwebtoken';

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token dans le header Authorization
 */
export function authMiddleware(req, res, next) {
  try {
    // Récupération du header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        message: 'Token d\'authentification manquant' 
      });
    }

    // Vérification du format "Bearer TOKEN"
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Format du token invalide. Utilisez: Bearer <token>' 
      });
    }

    // Extraction du token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Token manquant' 
      });
    }

    // Vérification et décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajout des informations de l'admin à la requête
    req.admin = {
      id: decoded.id,
      username: decoded.username
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expiré. Veuillez vous reconnecter' 
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token invalide' 
      });
    }

    console.error('❌ Erreur middleware auth:', err);
    return res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la vérification du token' 
    });
  }
}