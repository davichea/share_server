import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  token: typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null,
  username: '',
  userProfile:{},
  setUserProfile:(user) =>set({userProfile:user}),
  setToken: (newToken) => set({ token: newToken }),
  setUsername: (newUsername) => set({ username: newUsername }),
  clearAll: () => set({ token: null, username: '' }),
}));

export default useGlobalStore;
