import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc , setDoc } from "firebase/firestore";

// 1. 
const AuthContext = React.createContext();
// hook
export function useAuth() {
    // 3
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if you have logged in before
        // anthing changes -> udate will happen  
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const docRef = doc(db, "users", currentUser?.uid);
                let docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    await setDoc(docRef, {
                    email: currentUser.email,
                    profile_pic: currentUser.photoURL,
                    name: currentUser.displayName,
                    lastSeen: "",
                    status: "online"
                });
                     docSnap = await getDoc(docRef);
                }
                
                    const { profile_pic, name, email, lastSeen, status } = docSnap.data();
                    // save the user data in context
                    await setLastSeen(currentUser);

                    setUserData({
                        id: currentUser.uid,
                        profile_pic,
                        email,
                        name,
                        lastSeen,
                        status: status
                    });

                
            }
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const setLastSeen = async (user) => {
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "2-digit",
            month:"short"
        });
        await updateDoc(doc(db, "users", user.uid), {
            lastSeen: timeStamp,
        });


    }

    const updateName = async (newName) => {
        await updateDoc(doc(db, "users", userData.id), {
            name: newName
        });
    }
    const updateStatus = async (newstatus) => {
        await updateDoc(doc(db, "users", userData.id), {
            status: newstatus
        });
    }

    
    return <AuthContext.Provider value={{ setUserData, userData, loading, updateName, updateStatus }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;