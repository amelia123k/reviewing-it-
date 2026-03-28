import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Customer session
  const [user,     setUser]     = useState(null);
  // Vendor session (business account)
  const [vendor,   setVendor]   = useState(null);
  const [returnTo, setReturnTo] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  // myReviews = [{ id, vendorId, vendorName, vendorColor, stars, text, date }]

  const loginUser = (name, email) => {
    // Switching to a customer account should not keep any previous vendor session.
    setVendor(null);
    setMyReviews([]);
    setUser({ name, email, type: 'user' });
  };

  const loginVendor = (bizName, email) => {
    // Switching to a vendor account should not keep any previous customer session.
    setUser(null);
    setMyReviews([]);
    setVendor({ name: bizName, email, type: 'vendor', bizName });
  };

  const logout = () => {
    setUser(null);
    setVendor(null);
    setMyReviews([]);
  };

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
      user,
      vendor,
      loginUser,
      loginVendor,
      logout,
      returnTo, saveReturnTo, clearReturnTo,
      myReviews, addReview, editReview, deleteReview,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);