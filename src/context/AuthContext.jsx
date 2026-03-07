import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // user = { name, email, phone, type: 'user' | 'vendor', bizName }

  const loginUser = (name, email) => {
    setUser({ name, email, type: 'user' });
  };

  const loginVendor = (bizName, email) => {
    setUser({ name: bizName, email, type: 'vendor', bizName });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, loginVendor, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);