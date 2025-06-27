import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DisplayRow from '../../components/data/DisplayRow';
import Dialog from '../../components/overlay/Dialog';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils/crypto';
import useGlobalStore from '@/store/useGlobalStore';

export default function Header() {
  const route = useRouter();
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false)
  const userProfile = useGlobalStore(state => state.userProfile)
  const setUserProfile = useGlobalStore(state => state.setUserProfile)

  const toggleOpenUserProfile = () => {
    setIsOpenUserProfile(!isOpenUserProfile)
  }
  const handleLogout = () => {
    sessionStorage.clear();
    route.push('/')
  }
  const handleSwitchApp = ()=>{
    route.push('/landing_page')
  }
  useEffect(() => {
    return () => {
      saveToLocalStorage('userProfile', userProfile)
    };
  }, []);
  useEffect(() => {
    const decryptedData = getFromLocalStorage('userProfile');
    setUserProfile(decryptedData)
  }, []);
  return (
    <header className="w-full bg-blue-600 text-white p-4">
      <div className='w-full  shadow text-end space-x-3.5 '>
        <span className='bg-gray-500 hover:bg-gray-600 p-2 rounded-full  cursor-pointer' onClick={() => handleSwitchApp()}>
          Switch App
        </span>
        <span className='bg-gray-500 hover:bg-gray-600 p-2 rounded-full  cursor-pointer' onClick={() => handleLogout()}>
          Logout
        </span>
        <span className='bg-gray-500  p-2 rounded-full  cursor-pointer' onClick={() => toggleOpenUserProfile()}>
          Profile
        </span>
      </div>
      <Dialog isOpen={isOpenUserProfile} toggleModal={toggleOpenUserProfile}>
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="mb-4 p-3 rounded-lg  flex items-center  justify-between w-full bg-slate-100">
            <h2 className=" font-semibold text-gray-600">
              User  Information
            </h2>
          </div>
          <div className="text-gray-600 space-y-2 px-4">
            <DisplayRow label={'User Name '} value={userProfile.username} />
            <DisplayRow label={'First Name'} value={userProfile.firstName} />

            <DisplayRow label={'Last Name'} value={userProfile.lastName} />
            <DisplayRow label={'Gender'} value={userProfile.gender} />
            <DisplayRow label={'Email'} value={userProfile.email} />
            {/* <DisplayRow label={'Description'}  value={data.description} /> */}
          </div>

        </div>
      </Dialog>
    </header>
  );
}
