
import { useEffect, useMemo, useState } from "react";
import { ROUTES } from "../../../components/npl/lib/route";
import Profile from "../../../components/npl/pages/profile";
import Reports from "../../../components/npl/pages/reports";
import Settings from "../../../components/npl/pages/settings";
import LayoutNpl from "../../../components/npl/layout";
import useRouterStore from "../../../components/npl/globalStore/store";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/store/useGlobalStore";
import useTokenGuard from "@/lib/hook/useTokenGuard";
import PRODUCT_LIST from "../../../components/npl/pages/product/routes/list";
import Dashboard from "../../../components/npl/pages/dashboard";
import PRODUCT_INSERT from "../../../components/npl/pages/product/routes/insert";
import PRODUCT_UPDATE from "../../../components/npl/pages/product/routes/update";
import jwt from "jsonwebtoken";
import { useRadioGroup } from "@mui/material";
import { DialogDynamic } from "../../../components/npl/components/ui/DialogDynamic";
import { IoInformationCircleOutline } from "react-icons/io5";
import { refreshToken } from "@/services/apiservices";

const EXPIRE_SOON = 60000;

export default function SocialFeed() {
  const router = useRouter()
  const { route } = useRouterStore()
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [isStay, setIsStay] = useState(false);


  const token = useGlobalStore(state => state.token)
  const setUserProfile = useGlobalStore(state => state.setUserProfile)
  const isVerified = useTokenGuard(token)
  const componentMapping = {
    [ROUTES.PRODUCT_LIST]: <PRODUCT_LIST />,
    [ROUTES.PRODUCT_INSERT]: <PRODUCT_INSERT />,
    [ROUTES.PRODUCT_UPDATE]: <PRODUCT_UPDATE />,
    [ROUTES.DASHBOARD]: <Dashboard />,
    [ROUTES.PROFILE]: <Profile />,
    [ROUTES.REPORTS]: <Reports />,
    [ROUTES.SETTINGS]: <Settings />
  }

  const renderedComponent = useMemo(() => {
    const component = componentMapping[route.link || ROUTES.PRODUCT_LIST];
    if (!component) return
    return component;
  }, [route]);
  useEffect(() => {
    const interval = setInterval(() => {
      const expireAt = sessionStorage.getItem('tokenExpireAt');
      console.log("expiredAt", expireAt);
      console.log("Dated", Date.now());
      if (!expireAt) return;
      if (Date.now() > expireAt) {
        sessionStorage.clear();
        clearInterval(interval);
        router.push('/');
      } else {
        if (!isStay) {
          setIsExpiringSoon(expireAt - Date.now() <= EXPIRE_SOON);
        }

      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router, isStay]);

  const handleSessionAction = async () => {
    try {
      const storedRefreshToken = sessionStorage.getItem('accessToken');
      if (!storedRefreshToken) throw new Error('No refresh token found');
      const res = await refreshToken.post({
        refreshToken: storedRefreshToken,
      });
      if (!res?.refreshToken) throw new Error('Failed to refresh token');
      sessionStorage.setItem('accessToken', res.refreshToken);
      const expireAt = Date.now() + 2 * 60 * 1000;
      sessionStorage.setItem('tokenExpireAt', expireAt.toString());
      setIsExpiringSoon(false);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };


  return (
    <>
      {
        isVerified &&
        <LayoutNpl>
           <DialogDynamic
            isOpen={isExpiringSoon}
            icon={<IoInformationCircleOutline className="text-blue-500 h-[120px] w-[120px]" />}
            title="Session Information"
            question="Your session will expired in 1 minutes. Do you want to continue?"
            buttonCancelText="No, Thank"
            buttonOkText="Yes, Continue"
            onClose={() => {
              // setIsLoggedOut(true)
              setIsExpiringSoon(false);
            }}
            onButtonCancelClick={() => {
              setIsStay(true)
              setIsExpiringSoon(false);
            }}
            // onButtonCancelClick={() => handleSessionAction('logOut')}
            onButtonOkClick={handleSessionAction}
          /> 

          {renderedComponent}
        </LayoutNpl>
      }

    </>

  );
}