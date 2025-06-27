import React, { useEffect, useState } from 'react';
import { landingPageEnum } from '@/lib/langPageEnums';
import { useRouter } from 'next/router';
import useGlobalStore from '@/store/useGlobalStore';
import { cn } from '@/utils/cn';
import useTokenGuard from '@/lib/hook/useTokenGuard';
import Dialog from '../../../components/npl/components/overlay/Dialog';
import { useField } from '@mui/x-date-pickers/internals';
import DisplayRow from '../../../components/npl/components/data/DisplayRow';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils/crypto';
import jwt from "jsonwebtoken";
const app_list = [
  {
    app_id: "app-one",
    app_name: 'Task Manager',
  },
  {
    app_id: "app-two",
    app_name: 'E-Commerce Dashboard',
  },
  {
    app_id: null,
    app_name: 'Chat Application',
  },
  {
    app_id: null,
    app_name: 'Note Taking App',
  },
  {
    app_id: "npl",
    app_name: 'NPL Taking App',
  }
];

const apps = [
  {
    id: landingPageEnum.APP_ONE,
    title: 'App One',
    name: 'Task Manager',
    description: 'Organize your tasks efficiently with drag-and-drop UI.',
  },
  {
    id: landingPageEnum.APP_TWO,
    title: 'App Two',
    name: 'E-Commerce Dashboard',
    description: 'Monitor sales, orders, and performance in real time.',
  },
  {
    id: landingPageEnum.APP_THREE,
    title: 'App Three',
    name: 'Chat Application',
    description: 'Instant messaging with real-time notifications.',
  },
  {
    id: landingPageEnum.APP_FOUR,
    title: 'App Four',
    name: 'Note Taking App',
    description: 'Capture ideas quickly and organize them in folders.',
  },
  {
    id: landingPageEnum.NPL,
    title: 'NPL Project',
    name: 'Note Taking App',
    description: 'Capture ideas quickly and organize them in folders.',
  }
];

export default function LandingPage() {
  const route = useRouter();
  const token = useGlobalStore(state => state.token)
  const userProfile = useGlobalStore(state => state.userProfile)
  const setUserProfile = useGlobalStore(state => state.setUserProfile)

  const isVerified = useTokenGuard(token)
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false)
  const handleClickHere = (value) => {
    const appMap = {
      [landingPageEnum.APP_ONE]: "/app-one",
      [landingPageEnum.APP_TWO]: "/app-two",
      [landingPageEnum.APP_THREE]: "/app-three",
      [landingPageEnum.APP_FOUR]: "/app-four",
      [landingPageEnum.NPL]: "/npl",
    };
    route.push(appMap[value]);
  };
  // Helper function to check if the app is available
  const isAppEnabled = (appId) => {
    return app_list.some((item) => item.app_id === appId);
  };
  const toggleOpenUserProfile = () => {
    setIsOpenUserProfile(!isOpenUserProfile)
  }
  const handleLogout = () => {
    sessionStorage.clear();
    route.push('/')
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
  useEffect(() => {
    const decoded = jwt.decode(token);
    const exp = decoded.exp;
    const expirationDate = new Date(exp * 1000);
    console.log(expirationDate.toString());

  }, []);
  return (
    <>
      {
        isVerified && <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 " autoComplete="off">
          <div className='w-full bg-white/60 p-5 shadow text-end space-x-3.5'>
            <span className='bg-white p-2 rounded-full  cursor-pointer' onClick={() => handleLogout()}>
              Logout
            </span>
            <span className='bg-white p-2 rounded-full  cursor-pointer' onClick={() => toggleOpenUserProfile()}>
              Profile
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
            Welcome to the App Hub
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {apps.map((app) => {
              const enabled = isAppEnabled(app.id);

              return (
                <div
                  key={app.id}
                  className="bg-white/60 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 hover:scale-[1.03] transition-transform duration-300"
                >
                  <h2 className="text-2xl font-bold text-indigo-800 mb-2">{app.title}</h2>
                  <p className="text-lg font-medium text-gray-700">{app.name}</p>
                  <p className="text-sm text-gray-600 mt-2 mb-4">{app.description}</p>

                  <button
                    type="button"
                    onClick={() => handleClickHere(app.id)}
                    disabled={!enabled}
                    className={cn("px-5 py-2 rounded-full font-medium transition ",
                      enabled
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-indigo-300 text-white cursor-not-allowed'
                    )}

                  >
                    Click Here
                  </button>
                </div>
              );
            })}
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
        </div>

      }


    </>

  );
}
