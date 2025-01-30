// import React, { useState } from 'react';
// import SignUp from '../components/SignUp.jsx';  
// import Login from '../components/Login.jsx';   
// import Logout from '../components/LogOut.jsx'; 
// import Modal from '../components/Modal.jsx';   
// import './AccountScreen.css';

// function AccountScreen() {
//   const [isSignUpOpen, setSignUpOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const openSignUp = () => setSignUpOpen(true);
//   const closeSignUp = () => setSignUpOpen(false);

//   const openLogin = () => setLoginOpen(true);
//   const closeLogin = () => setLoginOpen(false);

//   return (
//     <div className="account-screen">
//       <div className="auth-buttons">
//         <button onClick={openSignUp}>Sign Up</button>
//         <button onClick={openLogin}>Login</button>
//         <Logout />
        
//       </div>

//       <Modal isOpen={isSignUpOpen} onClose={closeSignUp}>
//         <SignUp closeSignUp={closeSignUp} />
//       </Modal>

//       <Modal isOpen={isLoginOpen} onClose={closeLogin}>
//         <Login closeLogin={closeLogin} /> 
//       </Modal>

      
//     </div>
//   );
// }

// export default AccountScreen;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SignUp from '../components/SignUp.jsx';  
import Login from '../components/Login.jsx';   
import Modal from '../components/Modal.jsx';   
import './AccountScreen.css';

function AccountScreen() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    // Відстежуємо, чи є користувач залогінений
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Очищаємо стан користувача
      navigate('/'); // Після виходу перенаправляємо на головну
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="account-screen">
      <h2>{user ? `Welcome, ${user.displayName || "User"}!` : "Account"}</h2> 
      <div className="auth-buttons">
        {!user ? (
          <>
            <button onClick={() => setSignUpOpen(true)}>Sign Up</button>
            <button onClick={() => setLoginOpen(true)}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Log Out</button> // ❌ Тільки Log Out
        )}
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)}>
        <SignUp closeSignUp={() => setSignUpOpen(false)} />
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <Login closeLogin={() => setLoginOpen(false)} /> 
      </Modal>
    </div>
  );
}

export default AccountScreen;
