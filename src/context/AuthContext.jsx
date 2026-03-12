import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,     setUser]     = useState(null);
  const [returnTo, setReturnTo] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  // myReviews = [{ id, vendorId, vendorName, vendorColor, stars, text, date }]

  const loginUser   = (name, email) => setUser({ name, email, type: 'user' });
  const loginVendor = (bizName, email) => setUser({ name: bizName, email, type: 'vendor', bizName });
  const logout      = () => { setUser(null); setMyReviews([]); };

  const saveReturnTo  = (info) => setReturnTo(info);
  const clearReturnTo = ()     => setReturnTo(null);

  // Called from VendorPreview when user posts a review
  const addReview = (review) => {
    setMyReviews(prev => [review, ...prev]);
  };

  // Called from MyReviews when user edits
  const editReview = (id, stars, text) => {
    setMyReviews(prev => prev.map(r => r.id === id ? { ...r, stars, text } : r));
  };

  // Called from MyReviews when user deletes
  const deleteReview = (id) => {
    setMyReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AuthContext.Provider value={{
      user, loginUser, loginVendor, logout,
      returnTo, saveReturnTo, clearReturnTo,
      myReviews, addReview, editReview, deleteReview,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);