import React, { useState } from 'react';
import SignUp from '../components/SignUp.jsx';  
import Login from '../components/Login.jsx';    
import Modal from '../components/Modal.jsx';   
import './AccountScreen.css';

function AccountScreen() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <div className="account-screen">
      <div className="auth-buttons">
        <button onClick={openSignUp}>Sign Up</button>
        <button onClick={openLogin}>Login</button>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={closeSignUp}>
        <SignUp closeSignUp={closeSignUp} />
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <Login closeLogin={closeLogin} /> 
      </Modal>
    </div>
  );
}

export default AccountScreen;



  