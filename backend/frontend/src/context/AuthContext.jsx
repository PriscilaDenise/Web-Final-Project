import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored authentication data
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { isAuthenticated, userRole, user } = JSON.parse(storedAuth);
      setIsAuthenticated(isAuthenticated);
      setUserRole(userRole);
      setUser(user);
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: true,
      userRole: userData.role,
      user: userData
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 