import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// useParams
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

function ChatWindow() {
  const params = useParams();
  const [msg, setMsg] = useState("");
  const [secondUser , setSecondUser] = useState("");

  const receiverId=params.chatid;
  const handleSendMsg = async () => {
    console.log(msg);
    setMsg("");
  }
  useEffect(()=>{
    const getUser = async () => {
      const docRef = doc(db, "users", receiverId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setSecondUser(docSnap.data());
      }
    };
    getUser();
  },[receiverId])
   // default screen if there is no user is selected
  if (!receiverId)
    return (
      <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-sm text-center text-gray-400">
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );
      // start chat with user 
    
  //chat screen code 
  return <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
    <div className="h-full w-full bg-[#F2EFE9] flex flex-col">
      {/* topbar */}
      <div className="bg-[#eff2f5] py-2 px-4 flex items-center gap-2 shadow-sm">
        <img  src="{secondUser?.profile_pic}||/vite.svg"
        alt="profile image"
        className ="h-9 w-9 rounded-full object-cover"
         />
         <h3>{secondUser?.name}</h3>
      </div>


      {/* message list */}
      <div className="flex-grow flex flex-col gap-12 p-6  overflow-y-scroll ">
      </div>


      
      {/* chat input */}
      <div className="bg-[#eff2f5] py-3 px-6 shadow flex items-center gap-6">
        <PlusIcon/>
        <input className='w-full py-2 px-4 rounded focus:outline-none'
        placeholder='Type a message....'
        value={msg}
        onChange={(e)=>{setMsg(e.target.value);}}
        onKeyDown={(e)=>{
          if(e.key==="Enter"){
            handleSendMsg();
          }
        }}
        />
        <button onClick={handleSendMsg} >
          <SendIcon/>
        </button>
        
      </div>
    </div>
  </section>
}

export default ChatWindow