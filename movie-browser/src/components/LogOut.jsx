import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out!");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
