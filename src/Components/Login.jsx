// rfce
import React from 'react'
import whatsappLogo from '../assets/whatsapp.svg';
import { Fingerprint, LogIn as LoginIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// auth-step-3
import { signInWithPopup } from "firebase/auth";
import { auth, db } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from "./AuthContext";

async function createUser(authData , setUserData) {
    const userObject = authData.user;
    const { uid, photoURL, displayName, email } = userObject;
    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const data = await setDoc(doc(db, "users", uid), {
        email,
        profile_pic: photoURL,
        name: displayName,
        lastSeen: timeStamp,
    })
    setUserData(data);
    
}


function Login() {
    const { setUserData} = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        const userData = await signInWithPopup(auth, new GoogleAuthProvider());
        await createUser(userData , setUserData);
        navigate("/");
    }
    return (
      <>
  {/* Top Header */}
  <div className="h-[220px] bg-[#04a784] flex items-start">
    <div className="flex items-center gap-3 px-10 pt-10">
      <img src={whatsappLogo} alt="" className="h-6" />
      <span className="text-white font-semibold tracking-wide text-sm">
        WHATSAPP
      </span>
    </div>
  </div>

  {/* Background */}
  <div className="bg-[#eff2f5] h-[calc(100vh-220px)] flex justify-center items-start">

    {/* Card */}
    <div className="bg-white w-[50%] h-[75%] -mt-28 rounded-md shadow-xl flex flex-col justify-center items-center gap-5">

      <Fingerprint className="h-16 w-16 text-[#04a784]" strokeWidth={1} />

      <h2 className="text-lg font-semibold text-gray-700">
        Sign In
      </h2>

      <p className="text-gray-500 text-sm text-center">
        Sign in with your google account <br /> to get started.
      </p>

      <button className="mt-3 flex items-center gap-2 bg-[#008069] hover:bg-[#04a784] transition text-white text-sm px-5 py-2 rounded shadow"
      onClick={handleLogin}>
        <span>Sign in with Google</span>
        <LoginIcon size={18} />
      </button>

    </div>
  </div>
</>
    )
}

export default Login;