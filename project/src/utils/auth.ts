// Gestion de l'authentification

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  window.location.href = '/login';
};

// Vérifier si le token est valide (optionnel)
export const verifyToken = async (): Promise<boolean> => {
  const token = getToken();
  
  if (!token) return false;

  try {
    const response = await fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};
