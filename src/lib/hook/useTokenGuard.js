import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useTokenGuard = (token) => {
  const [tokenVerify, setTokenVerify] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setTokenVerify(true);
    } else {
      setTokenVerify(false);
      router.push('/');
    }
  }, [token, router]);

  return tokenVerify;
};

export default useTokenGuard;
