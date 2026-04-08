import { ArrowLeft, CheckIcon, Edit2Icon, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';



function Profile(props) {
    const navigate = useNavigate();
    // const { userData, updateName, updateStatus, updatePhoto, isUploading, error } = useAuth();
    const { userData, updateName, updateStatus, error } = useAuth();
    const [name, setName] = useState(userData?.name || "");
    const [status, setStatus] = useState(userData?.status || "");

    const handleLogout = () => {
        signOut(auth);
        navigate("/login")
    }

    return (
        <div className='bg-[#eff2f5] w-[30vw]'> 
            <div className="bg-green-400 text-white py-4 text-lg px-4 flex items-center gap-6">
                <button onClick={props.onBack}>
                    <ArrowLeft />
                </button>
                <div> Profile</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 mt-8">
                
                <img src={userData.profile_pic} className="w-[160px] h-[160px]  object-cover rounded-full"
                        alt="profile picture"
                />


                <div className="flex flex-col bg-white w-full py-4 px-8">
                    <label className="text-sm text-[#008069] mb-2">Your name</label>
                    <div className="flex items-center w-full">
                        <input
                            value={name}
                            className="w-full bg-transparent"
                            placeholder="Update your name..."
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <button onClick={() => updateName(name)} >
                            <CheckIcon className="w-5 h-5" />
                        </button>
                    </div>

                </div>

                <div className="flex flex-col bg-white w-full py-4 px-8">
                    <label className="text-sm text-[#008069] mb-2">Your name</label>
                    <div className="flex items-center w-full">
                        <input
                            value={status}
                            className="w-full bg-transparent"
                            placeholder="Update your status..."
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                        />
                        <button onClick={() => updateStatus(status)}>
                            <CheckIcon className="w-5 h-5" />
                        </button>
                    </div>

                </div>

                <button onClick={handleLogout}
                    className='text-white px-4 py-3 rounded bg-[#04a784] hover:bg-[#008069] '
                >Logout</button>

            </div>

        </div>

    )
}
export default Profile